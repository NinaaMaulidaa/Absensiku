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
  
  export function Profile() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    if(!user) {
      return navigate('/auth/sign-in')
    }
    const [data, setData] = useState({
      name: '',
      number_id: '',
      description: '',
      email: '',
      contactNumber: '',
      institution: '',
      internship_period: '',
      image: '',
      address: ''
    })

    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(`http://192.168.1.132:3001/api/v1/user/${user.id}`)
        setData(response.data.data[0])
      }
      fetchData()
    }, [])
    

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
                  src={`${data.image ? data.image[0] == 'h' ? data.image : `https://88gzhtq3-3001.asse.devtunnels.ms/api/v1/files/${data.image}` : null}`}
                  alt="bruce-mars"
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {data.name}
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
                description={data.description ? data.description : `Nama saya ${data.name}. Saya adalah seorang Mahasiswa/Siswa di ${data.institution}, dan saat ini tinggal di ${data.address}dengan nomor telepon yang dapat dihubungi ${data.contactNumber}, serta alamat email aktif ${data.email}.`}
                details={{
                  "username": data.number_id,
                  telepon: data.contactNumber,
                  email: data.email,
                  "sekolah / kampus": data.institution,
                }}
                action={
                  <Tooltip content="Edit Profile">
                    <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" onClick={handleOpen}/>
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
          
          <form>
          <div className="flex gap-4 mb-4">
            <div className="w-full">
              <Input
                color="gray"
                size="sm"
                name="name"
                value={data.name}
                // onChange={handleChange}
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
                value={data.email}
                // onChange={handleChange}
                className="placeholder:opacity-100"
              />
            </div>
            <div className="w-full">
              <Input
                color="gray"
                size="sm"
                label="number_id"
                name="number_id"
                value={data.number_id}
                // onChange={handleChange}
                className="placeholder:opacity-100"
              />
            </div>
            <div className="w-full">
              <Input
                color="gray"
                size="sm"
                label="password"
                name="password"
                value={data.password}
                // onChange={handleChange}
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
                value={data.institution}
                // onChange={handleChange}
                className="placeholder:opacity-100"
                label="Asal Sekolah"
              />
            </div>
            <div className="w-full">
              <Input
                color="gray"
                size="sm"
                name="internship_period"
  value={data.internship_period}
                // onChange={handleChange}
                className="placeholder:opacity-100"
                label="Periode"
              />
            </div>
            <div className="w-full">
              <Input
                color="gray"
                size="sm"
                name="address"
                value={data.address}
                // onChange={handleChange}
                className="placeholder:opacity-100"
                label="Alamat"
              />
            </div>
            <div className="w-full">
              <Input
                color="gray"
                size="sm"
                name="contactNumber"
                value={data.contactNumber}
                // onChange={handleChange}
                className="placeholder:opacity-100"
                label="No. Telepon"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-full">
            {/* <Textarea label="Deskripsi" onChange={handleChange} value={data.description} name="description"/> */}
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-full">
              <Input
                color="gray"
                size="sm"
                name="image"
                // value={data.image}
                // onChange={handleFileChange}
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