import React, {useContext, useState} from "react";
import {
  Typography,
  Input,
  Radio,
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import {statisticsCardsData} from "@/data";
import { IconButton } from "@material-tailwind/react";
import { XMarkIcon, CursorArrowRippleIcon, PowerIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Swal from 'sweetalert2'
import { AuthContext } from "@/context/auth";
import Cookies from "js-cookie";

export function Absen() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (value) => {
    console.log(value);
    setOpen(!open)
  };

  const token = Cookies.get('token');
  const tokenParts = token.split('.');
        const user = JSON.parse(window.atob(tokenParts[1]));
  
  const [status, setStatus] = React.useState(false)

  const statusAbsen = () => {
    setStatus(!status)
  }

  const [formData, setFormData] = React.useState({
    userId: '',
    status: null,
    notes: '',
    fileUrl: ''
  })

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("Latitude: " + latitude + ", Longitude: " + longitude);
    setLatitude(latitude)
    setLongitude(longitude)
  }

  getLocation()
  
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }

  console.log(status);
  
  const createAbsensi = (e) => {
    e.preventDefault()
    const dataToSubmit = new FormData()
    console.log(e.target.fileUrl);
    setFormData({
      userId: user.id,
      status: status ? "Absent" : 'Present',
      notes: e.target.notes?.value === undefined ? '' : e.target.notes.value,
      fileUrl: e.target?.fileUrl === undefined ? "" : e.target.fileUrl[0]
    })
    for (const key in formData) {
      dataToSubmit.append(key, formData[key]);
    }
    const token = Cookies.get('token')
    localStorage.getItem('deviceId') ?? localStorage.setItem('deviceId', token);
    dataToSubmit.append('latitude', latitude)
    dataToSubmit.append('longitude', longitude)
    dataToSubmit.append('deviceId', localStorage.getItem('deviceId'))
    const submitData = async () => {
      try {
        await axios.post(`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/attendance`, dataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data', // Header untuk file upload
            'Authorization': `Bearer ${token}`
          },
        })
        setOpen(!open)
        Swal.fire({
          title: "Berhasil!",
          text: "Melakukan absensi hari ini!.",
          icon: "success",
          timer: 2000
        });
      } catch (error) {
        const {response: {data}} = error
        setOpen(!open)
        Swal.fire({
          title: "Gagal!",
          text: data.message,
          icon: "error",
          // timer: 2000
        });
      }
    }
    submitData()
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    })
  }

  const checkOut = () => {
    Swal.fire({
      title: "Pulang?",
      text: "Kamu akan melakukan presensi pulang!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D20103",
      cancelButtonColor: "#B9B6B6",
      confirmButtonText: "Check Out!"
    }).then((result) => {
      if (result.isConfirmed) {
        const fetchData = async () => {
            try {
            const token = Cookies.get('token')
            console.log(token);
            await axios.put(`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/attendance/${user.id}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              },
            })
            Swal.fire({
              title: "Berhasil!",
              text: "Presensi pulang berhasil dilakukan",
              icon: "success"
            });
          } catch (error) {
            Swal.fire({
              title: "Gagal!",
              text: error,
              icon: "error"
            });
          }
        }
        fetchData()
      }
    });
  }

    return (
        <div className="mt-12">
          <div className="mb-12 grid gap-y-5 lg:gap-y-10 lg:gap-x-52 gap-x-10 md:grid-cols-2 xl:grid-cols-4">
              <StatisticsCard
              className='bg-green-700'
                title='Presensi'
                icon={React.createElement(CursorArrowRippleIcon, {
                  className: "w-6 h-6 text-green-700",
                })}
                onClick={handleOpen}
              />
              <StatisticsCard
              className='bg-red-400'
                title='Pulang'
                icon={React.createElement(PowerIcon, {
                  className: "w-6 h-6 text-red-400",
                })}
                onClick={checkOut}
              />
          </div>
          <Dialog size="lg" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Form Absensi
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Silahkan isi Absensi dengan benar!
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
          
          <form onSubmit={(e) => createAbsensi(e)}>
          <div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Status
              </Typography>
              <div className="flex gap-10">
                <Radio name="status" label="Hadir" value={'Present'} defaultChecked onClick={statusAbsen}/>
                <Radio name="status" label="Absen" value={'Absent'} onClick={statusAbsen}/>
              </div>
            </div>
            {status && <>
              <div className="mt-4 w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Keterangan
              </Typography>
              <div className="w-full">
                <Textarea name="notes" onChange={handleChange}/>
              </div>
            </div>
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
            </>}
        <DialogFooter>
          <Button type="submit" className="ml-auto">
            Simpan
          </Button>
        </DialogFooter>
          </div>
          </form>
        </DialogBody>
      </Dialog>
        </div>
      );
}

  export default Absen
