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
import { XMarkIcon, DocumentIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';

export function Kehadiran() {
  const [open, setOpen] = useState(false);
  const [rekap, setRekap] = useState([]);
  const [detail, setDetail] = useState(null);
  const [status, setStatus] = useState('')
  const [formData, setFormData] = React.useState({
    userId: '',
    notes: '',
    image: ''
  })

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
      setStatus(data.data.status)
      setFormData({
        ...formData,
        userId: data.data.userId
      })
      setOpen(true);
    } catch (error) {
      console.error("Error fetching attendance detail:", error);
    }
  };

  // The function that handles attendance update
const updateAttendance = (e) => {
  e.preventDefault();
  
  // Prepare the data to be submitted
  const dataToSubmit = new FormData();

  for (const key in formData) {
    dataToSubmit.append(key, formData[key]);
  }

  // Add attendance status to FormData
  console.log(formData);
  // Async function to submit the attendance update
  const submitData = async () => {
    try {
      // Send PUT request to update attendance
      const token = Cookies.get('token');
      await axios.put(`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/attendance/${detail._id}`, dataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data', // Necessary for file upload
          'Authorization': `Bearer ${token}`,
        },
      });
      setOpen(!open);
      // Show success alert
      const { data } = await axios.get('https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/attendance', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRekap(data.data);
      Swal.fire({
        title: "Berhasil!",
        text: "Melakukan update absensi!",
        icon: "success",
        timer: 2000,
      });
    } catch (error) {
      console.log(error);
      const { response } = error;
      setOpen(!open);
      
      // Show error alert
      Swal.fire({
        title: "Gagal!",
        text: response,
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
    setFormData({
      ...formData,
      status: e
    })
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    })
  }

  const exportTableToExcel = () => {
    // Find the table element
    const table = document.getElementById('my-table');
    if (!table) return;
  
    // Create a blank worksheet data array
    const worksheetData = [];
  
    // Loop through table rows
    for (let i = 0; i < table.rows.length; i++) {
      const row = table.rows[i];
      const rowData = [];
  
      // Loop through cells in each row, excluding the last cell (Opsi column)
      for (let j = 0; j < row.cells.length - 1; j++) {
        rowData.push(row.cells[j].innerText);
      }
  
      // Add the row data to worksheet data
      worksheetData.push(rowData);
    }
  
    // Convert the data array to a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    // Write workbook to binary string
    const workbookBinary = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
  
    // Convert the binary string to an ArrayBuffer
    const buffer = new ArrayBuffer(workbookBinary.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < workbookBinary.length; ++i) {
      view[i] = workbookBinary.charCodeAt(i) & 0xFF;
    }
  
    // Create a Blob from the ArrayBuffer with the correct MIME type
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  
    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'kehadiran.xlsx';
  
    // Trigger the download
    downloadLink.click();
  };
  

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h5" color="white">
           Daftar Hadir
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto" id="my-table">
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
                    <tr key={el.userId?.name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          {/* <Avatar src={`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/files/${el.userId.image}`} alt={name} size="sm" variant="rounded" /> */}
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {el.userId?.name ?? ''}
                            </Typography>
                            {/* <Typography className="text-xs font-normal text-blue-gray-500">
                              {el.userId?.email}
                            </Typography> */}
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {el.userId?.institution}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs text-center font-semibold text-blue-gray-600">
                          {el.status === 'Absent' ? '-' : el.checkInTime ? new Date(el.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs text-center font-semibold text-blue-gray-600">
                          {el.status === 'Absent' ? '-' : el.checkOutTime ? new Date(el.checkOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
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
      <div className="p-4 xl:ml-80">
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={exportTableToExcel}
        >
          <DocumentIcon className="h-5 w-5" />
        </IconButton>
      </div>
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
              <Select name="status" value={status} onChange={handleStatusChange}
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
                    value={detail.status === 'Absent' ? '-' : detail.checkInTime ?  new Date(detail.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
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
                    value={detail.status === 'Absent' ? '-' : detail.checkOutTime ?  new Date(detail.checkOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                  />
                </div>
              </div>
              </div>
              
              {status !== 'Present' ? 
              <>
              <div className="mt-4 w-full">
                <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                  Keterangan
                </Typography>
                <div className="w-full">
                  <Textarea name="notes" value={detail.notes ? detail.notes : null} onChange={handleChange}/>
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
                </div> : 
                <div className="mt-5 w-full">
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
            </> : <div></div>
              }
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
