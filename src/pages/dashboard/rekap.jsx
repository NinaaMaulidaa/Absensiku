import { EyeIcon } from "@heroicons/react/24/solid";
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { IconButton } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function RekapAbsen() {
  const [open, setOpen] = useState(false);
  const [rekap, setRekap] = useState([]);
  const [detail, setDetail] = useState(null);

  // Handle Dialog open/close
  const handleOpen = () => setOpen(!open);

  // Fetch attendance data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
        const { data } = await axios.get('https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/attendance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRekap(data.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchData();
  }, []);

  // Fetch attendance detail by ID and open the dialog
  const getAttendanceById = async (id) => {
    try {
      const token = Cookies.get('token');
      const { data } = await axios.get(`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/attendance/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDetail(data.data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching attendance detail:", error);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Rekap Absen
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["No", "Tanggal", "Status", "Check-In", "Check-Out", "Keterangan"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className={`text-[13px] font-bold ${el === "Check-In" || el === "Keterangan" || el === "Check-Out" || el === "Tanggal" || el === "Status" ? `text-center` : ''} uppercase text-blue-gray-400`}
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rekap.map((el, key) => {
                const className = `py-3 px-5 ${key === rekap.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                const no = key + 1;

                return (
                  <tr key={el.checkInTime}>
                    <td className={className}>
                      <Typography variant="small" color="blue-gray" className="text-center">
                        {no}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography variant="small" color="blue-gray" className="text-center">
                        {el.checkInTime ? el.checkInTime.split('T')[0].split('.')[0] : el.checkInTime}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography variant="small" className="text-center text-blue-gray-600">
                        {el.status}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography variant="small" className="text-center text-blue-gray-600">
                        {el.status === 'Absent' ? '-' : el.checkInTime ? el.checkInTime.split('T')[1].split('.')[0] : el.checkInTime}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography variant="small" className="text-center text-blue-gray-600">
                        {el.status === 'Absent' ? '-' : el.checkOutTime ? el.checkOutTime.split('T')[1].split('.')[0] : el.checkOutTime}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="flex gap-3 justify-center items-center">
                        <Typography
                          as="a"
                          onClick={() => getAttendanceById(el._id)}
                          className="text-xs cursor-pointer font-semibold text-blue-gray-600"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </Typography>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Dialog size="lg" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Keterangan Absensi
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          {detail && (
            <div>
              <div className="flex gap-4 mb-4 mt-2">
              <div className="w-full">
                <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                  Status
                </Typography>
                <div className="flex gap-10">
                  <Input
                    color="gray"
                    variant="outlined"
                    disabled
                    size="lg"
                    value={detail.status}
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                  />
                </div>
              </div>
              <div className="w-full">
                <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                  Kehadiran
                </Typography>
                <div className="flex gap-10">
                  <Input
                    color="gray"
                    variant="outlined"
                    disabled
                    size="lg"
                    value={detail.status === 'Absent' ? '-' : detail.isLate ? 'Terlambat' : 'Tepat Waktu'}
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                  />
                </div>
              </div>
              </div>
              <div className="flex gap-4 mb-4 mt-2">
              <div className="w-full">
                <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                  CheckIn
                </Typography>
                <div className="flex gap-10">
                  <Input
                    color="gray"
                    variant="outlined"
                    disabled
                    size="lg"
                    value={detail.status === 'Absent' ? '-' : detail.checkInTime.split('T')[1].split('.')[0]}
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                  />
                </div>
              </div>
              <div className="w-full">
                <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                  CheckOut
                </Typography>
                <div className="flex gap-10">
                  <Input
                    color="gray"
                    variant="outlined"
                    disabled
                    size="lg"
                    value={detail.status === 'Absent' ? '-' : detail.checkOutTime ? detail.checkOutTime.split('T')[1].split('.')[0] : detail.checkOutTime}
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                  />
                </div>
              </div>
              </div>
              
              {detail.status === 'Absent' && (
                <>
                  <div className="mt-4 w-full">
                    <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                      Keterangan
                    </Typography>
                    <div className="w-full">
                      <Textarea name="notes" disabled value={detail.notes} />
                    </div>
                  </div>
                  <div className="mt-5 w-full">
                    <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                      Bukti Keterangan
                    </Typography>
                    <a href={`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/files/${detail.fileUrl}`}>
                      Download File
                    </a>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button type="submit" className="ml-auto" onClick={handleOpen}>
            Kembali
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default RekapAbsen;
