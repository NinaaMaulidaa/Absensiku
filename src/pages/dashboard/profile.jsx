  import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Input,
    Tooltip,
    Button,
    Textarea,
    Dialog,
    Select,
    Option,
    DialogBody,
    DialogHeader,
    DialogFooter,
    IconButton,
    Avatar
  } from "@material-tailwind/react";
  import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
  } from "@heroicons/react/24/solid";
  import {TrashIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
  import { Link, useNavigate } from "react-router-dom";
  import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
  import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useUserLogin } from "@/context/user";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/auth";
import Swal from "sweetalert2";
import fetchData from "@/data/user/fetchListUser";
  
  export function Profile() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    if(!user) {
      return navigate('/auth/sign-in')
    }
    const [formData, setFormData] = React.useState({
      number_id: null,
      name: null,
      email: null,
      password: null,
      institution: null,
      address: null,
      image: null,
      isActive: null,
      contactNumber: null,
      description: null,
      internship_period: null
    })

    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:8000/api/v1/user/${user.id}`)
        setFormData(response.data.data[0])
      }
      fetchData()
    }, [])

    const handleFileChange = (e) => {
      setFormData({
        ...formData,
        image: e.target.files[0]
      })
    }
  
    const editData = async (user) => {
      setFormData({
        number_id: user.number_id,
      name: user.name,
      email: user.email,
      password: user.password,
      institution: user.institution,
      address: user.address,
      image: user.image,
      isActive: user.isActive == 1 ? true : false,
      contactNumber: user.contactNumber,
      description: user.description,
      internship_period: user.internship_period
      })
      setOpen(!open)
    }
  
    const submitData = async (e) => {
      e.preventDefault()
      if(!formData.image || !formData.name ) {
        Swal.fire({
          title: "Gagal!",
          text: "Pastikan semua data telah diisi dengan benar!",
          icon: "error",
          timer: 2000
        });
        return;
      }
      try {
        const dataToSubmit = new FormData();
      for (const key in formData) {
        dataToSubmit.append(key, formData[key]);
      }
      
        await axios.put(`http://localhost:8000/api/v1/user/${user.id}`, dataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data', // Header untuk file upload
          },
        })
        setOpen(!open)
        const fetchData = async () => {
          const response = await axios.get(`http://localhost:8000/api/v1/user/${user.id}`)
          setFormData(response.data.data[0])
        }
        fetchData()
        Swal.fire({
          title: "Diupdate!",
          text: "Data berhasil di update!.",
          icon: "success",
          timer: 2000
        });
      } catch (error) {
        console.log(error);
        setOpen(!open)
        Swal.fire({
          title: "Gagal!",
          text: error,
          icon: "error",
          timer: 2000
        });
      }
    }

    console.log(formData);
  
    const handleChange = (e) => {
      const {name, value} = e.target
      setFormData({
        ...formData,
        [name]: value
      })
    }

    return (
      <>
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
        </div>
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                <Avatar
                  src={`${formData.image ? formData.image[0] == 'h' ? formData.image : `https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/files/${formData.image}` : null}`}
                  alt="bruce-mars"
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {formData.name}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    Magang
                  </Typography>
                </div>
              </div>
              
            </div>
            <div className="mb-12 px-4">
              <ProfileInfoCard
                title="Profile Information"
                description={formData.description ? formData.description : `Nama saya ${formData.name}. Saya adalah seorang Mahasiswa/Siswa di ${formData.institution}, dan saat ini tinggal di ${formData.address}dengan nomor telepon yang dapat dihubungi ${formData.contactNumber}, serta alamat email aktif ${formData.email}.`}
                details={{
                  "username": formData.number_id,
                  telepon: formData.contactNumber,
                  email: formData.email,
                  "sekolah / kampus": formData.institution,
                }}
                action={
                  <Tooltip content="Edit Profile">
                    <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" onClick={() => editData(formData)}/>
                  </Tooltip>
                }
              />
            </div>
          </CardBody>
        </Card>
        <Dialog size="xl" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Edit Data
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Silahkan lengkapi data dengan benar!
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
          
          <form onSubmit={submitData}>
          <div className="flex gap-4 mb-4">
            <div className="w-full">
              <Input
                color="gray"
                size="sm"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="placeholder:opacity-100"
                label="Nama"
              />
            </div>
            <div className="w-full">
              <Input
                color="gray"
                size="sm"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                className="placeholder:opacity-100"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
          <div className="w-full">
              <Input
                color="gray"
                size="sm"
                label="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="placeholder:opacity-100"
              />
            </div>
            <div className="w-full">
              <Input
                color="gray"
                size="sm"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="placeholder:opacity-100"
                label="No. Telepon"
              />
            </div>
            <div className="w-full">
              <Input
                color="gray"
                size="sm"
                label="number_id"
                name="number_id"
                value={formData.number_id}
                onChange={handleChange}
                className="placeholder:opacity-100"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-full">
              <Input
                color="gray"
                size="sm"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="placeholder:opacity-100"
                label="Asal Sekolah"
              />
            </div>
            <div className="w-full">
              <Input
                color="gray"
                size="sm"
                name="internship_period"
  value={formData.internship_period}
                onChange={handleChange}
                className="placeholder:opacity-100"
                label="Periode"
              />
            </div>
            <div className="w-full">
              <Input
                color="gray"
                size="sm"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="placeholder:opacity-100"
                label="Alamat"
              />
            </div>
            
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-full">
            <Textarea label="Deskripsi" onChange={handleChange} value={formData.description} name="description"/>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-full">
              <Input
                color="gray"
                size="sm"
                name="image"
                onChange={handleFileChange}
                type="file"
                className="placeholder:opacity-100"
                label="Foto"
              />
            </div>
          </div>
        <DialogFooter>
          <Button type="sumbit" className="ml-auto">
            Simpan
          </Button>
        </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
      </>
    );
  }
  
  export default Profile;