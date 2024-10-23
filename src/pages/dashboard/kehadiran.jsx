import {
  Chip,
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
  Select,
  Option,
  Avatar
} from "@material-tailwind/react";
import { authorsTableData } from "@/data";
import { PencilSquareIcon} from "@heroicons/react/24/outline";
import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { IconButton } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

export function Kehadiran() {
  const [open, setOpen] = useState(false);
  const [rekap, setRekap] = useState([]);
  const [detail, setDetail] = useState(null);
  const [status, setStatus] = useState()

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

  const [formData, setFormData] = React.useState({
    userId: '',
    notes: '',
    image: ''
  })

  // The function that handles attendance update
const updateAttendance = (e) => {
  e.preventDefault();
  
  // Prepare the data to be submitted
  const dataToSubmit = new FormData();

  // Set formData for notes and fileUrl from the input fields
  setFormData({
    notes: e.target.notes?.value === undefined ? '' : e.target.notes.value,
    image: e.target.fileUrl?.files ? e.target.fileUrl.files[0] : '',
    userId: detail.userId
  });

  // Append formData keys to the FormData object
  for (const key in formData) {
    dataToSubmit.append(key, formData[key]);
  }

  // Add attendance status to FormData
  const token = Cookies.get('token');
  dataToSubmit.append('status', status === "Absent" ? "Absent" : 'Present');

  // Async function to submit the attendance update
  const submitData = async () => {
    try {
      // Send PUT request to update attendance
      await axios.put(`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/attendance/${detail._id}`, dataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data', // Necessary for file upload
          'Authorization': `Bearer ${token}`,
        },
      });
      setOpen(!open);
      
      // Show success alert
      Swal.fire({
        title: "Berhasil!",
        text: "Melakukan update absensi!",
        icon: "success",
        timer: 2000,
      });
    } catch (error) {
      const { response: { data } } = error;
      setOpen(!open);
      
      // Show error alert
      Swal.fire({
        title: "Gagal!",
        text: data.message,
        icon: "error",
        timer: 2000,
      });
    }
  };

  submitData();
};


  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleStatusChange = (e) => {
    setStatus(e)
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    })
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h5" color="white">
           Daftar Hadir
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nama", "Sekolah", "Jam Masuk", "Jam Keluar", "Status", "Opsi"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className={`text-[13px] font-bold ${el == "Jam Masuk" || el == "Jam Keluar" || el == "Status" || el == "Opsi"  ? `text-center` : ''} uppercase text-blue-gray-400`}
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rekap.map(
                (el, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={el.userId.name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          {/* <Avatar src={`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/files/${el.userId.image}`} alt={name} size="sm" variant="rounded" /> */}
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {el.userId.name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {el.userId.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {el.userId.institution}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs text-center font-semibold text-blue-gray-600">
                          {el.status === 'Absent' ? '-' : el.checkInTime.split('T')[1].split('.')[0]}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs text-center font-semibold text-blue-gray-600">
                          {el.status === 'Absent' ? '-' : el.checkOutTime ? el.checkOutTime.split('T')[1].split('.')[0] : el.checkOutTime}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex justify-center">
                        <Chip
                          variant="gradient"
                          value={el.status}
                          className="py-0.5 px-2 text-[10px] font-medium w-fit flex justify-center"
                        />
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center">
                        <Typography
                          as="a"
                          onClick={() => getAttendanceById(el._id)}
                          className="text-xs cursor-pointer font-semibold text-blue-gray-600"
                        >
                         <PencilSquareIcon className="w-5 h-5" />
                        </Typography>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
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
        <form onSubmit={updateAttendance}>
        <DialogBody className="space-y-4 pb-6">
          {detail && (
            <div>
              <div className="flex gap-4 mb-4 mt-2">
              <div className="w-full">
                <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                  Status
                </Typography>
                <div className="flex gap-10">
              <Select name="status" value={detail.status} onChange={handleStatusChange}
              >
                <Option value={'Present'}>Present</Option>
                <Option value={'Absent'}>Absent</Option>
              </Select>
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
                    size="lg"
                    disabled
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
                    size="lg"
                    type="time"
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
                    size="lg"
                    type="time"
                    value={detail.status === 'Absent' ? '-' : detail.checkOutTime ? detail.checkOutTime.split('T')[1].split('.')[0] : detail.checkOutTime}
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                  />
                </div>
              </div>
              </div>
              
              {detail.status === 'Absent' || status === 'Absent' && (
                <>
                  <div className="mt-4 w-full">
                    <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                      Keterangan
                    </Typography>
                    <div className="w-full">
                      <Textarea na value={detail.notes ? detail.notes : null} onChange={handleChange}/>
                    </div>
                  </div>
                  {detail.fileUrl ? 
                  
                  <div className="mt-5 w-full">
                    <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                      Bukti Keterangan
                    </Typography>
                    <a href={`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/files/${detail.fileUrl}`}>
                      Download File
                    </a>
                  </div> : <div className="mt-5 w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Upload Bukti Keterangan
              </Typography>
              <Input
                color="gray"
                variant="outlined"
                size="lg"
                onChange={handleFileChange}
                name="fileUrl"
                type="file"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
              />
            </div>
                }
                  
                </>
              )}
            </div>
          )}
        <DialogFooter>
          <Button type="submit" className="ml-auto">
            Simpan
          </Button>
        </DialogFooter>
        </DialogBody>
        </form>
      </Dialog>
    </div>
  );
}

export default Kehadiran;
