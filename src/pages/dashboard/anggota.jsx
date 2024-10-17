import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
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
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import {TrashIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import fetchData from "@/data/user/fetchListUser";
import axios from "axios";
import { useSearch } from "@/context/search";

export function Anggota() {

  const MySwal = withReactContent(Swal)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [listUser, setListUser] = React.useState([])
  const [idUser, setIdUser] = React.useState("")
  var [name, setName] = useSearch()
  const [status, setStatus] = React.useState(true)
  const [formData, setFormData] = React.useState({
    number_id: '',
    name: '',
    email: '',
    password: '',
    institution: '',
    address: '',
    image: null,
    isActive: status,
    contactNumber: '',
    description: '',
    internship_period: ''
  })

  const [active, setActive] = React.useState(1);
  const [page, setPage] = React.useState();

  useEffect( () => {
    const fetchList = async () => {
      try {
        const { data } = await fetchData({active: null}); 
        setPage(data.pages)
        setListUser(data.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchList();
  }, [])


  useEffect( () => {
    const fetchList = async () => {
      try {
        if(name) {
          const { data } = await axios.get(`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/user?name=${name}`)
          setListUser(data.data);
        } else {

          const { data } = await fetchData({active: null}); 
        setPage(data.pages)
        setListUser(data.data); 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchList();
  }, [name])
 
  const getItemProps = (index) => {
    return {
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => setActive(index),
    }
  };
 
  const next = async () => {
    if (active === 5) return;
 
    setActive(active + 1);
  };
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1);
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const { data } = await fetchData({active: active}); 
        setPage(data.pages)
        setListUser(data.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchList();
  }, [active])

  const deleteData = (id) => {
    MySwal.fire({
      title: "Apakah anda yakin?",
      text: "Data yang sudah dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/user/${id}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
          },
        }).then(async(result) => {
          const {data} = await fetchData({active: active})
          setListUser(data.data)
          Swal.fire({
            title: "Dihapus!",
            text: "Data berhasil di hapus!.",
            icon: "success",
            timer: 2000
          });
        }).catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Gagal!",
            text: "Data gagal di hapus!.",
            icon: "error",
            timer: 2000
          });
        });
      }
    });
  }

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
    isActive: user.isActive,
    contactNumber: user.contactNumber,
    description: user.description,
    internship_period: user.internship_period
    })
    setIdUser(user._id)
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
    
      const response = await axios.put(`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/user/${idUser}`, dataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data', // Header untuk file upload
        },
      })
      setOpen(!open)
      const {data} = await fetchData({active: active})
          setListUser(data.data)
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
      });
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleStatusChange = (value) => {
    setStatus(value)
    setFormData({
      ...formData,
      status: value
    })
  }

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h5" color="white">
           Daftar Anggota
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nama", "Email", "Sekolah", "Periode","Opsi", ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className={`text-[13px] font-bold ${el == "Periode" || el == "Email" || el == "Sekolah" || el == "Opsi" ? `text-center` : ''} uppercase text-blue-gray-400`}
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listUser.map(
                (user, key) => {
                  const className = `py-3 px-5 ${
                    key === listUser.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={key}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/files/${user.image}`} alt={user.image} size="sm" className="rounded-full"/>
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {user.name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600 text-center">
                          {user.email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600 text-center">
                          {user.institution}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600 text-center">
                          {user.internship_period}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex gap-3 justify-center items-center">
                        <Typography
                          as="a"
                          onClick={() => editData(user)}
                          className="text-xs font-semibold text-blue-gray-600 cursor-pointer"
                        >
                         <PencilSquareIcon className="w-5 h-5" />
                        </Typography>
                        <Typography
                          as="a"
                          onClick={() => deleteData(user._id)}
                          className="text-xs font-semibold text-blue-gray-600 cursor-pointer"
                        >
                        <TrashIcon className="w-5 h-5" />
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
          <div className="flex items-center my-4 justify-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({length: page}, (_, i) => {
          i += 1
          return (
            <IconButton {...getItemProps(i)}>{i}</IconButton>
            )
        })}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === 5}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
      </Card>
    </div>
    <Dialog size="xl" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Edit Data Anggota
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Masukkan data anggota dengan benar!
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
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-full">
            <Textarea label="Deskripsi" onChange={handleChange} value={formData.description} name="description"/>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-full">
              <Select label="Select Status" name="status" value={status} onChange={(value) => handleStatusChange(value)}>
                <Option value={true}>Active</Option>
                <Option value={false}>Non Active</Option>
              </Select>
            </div>
            <div className="w-full">
              <Input
                color="gray"
                size="sm"
                name="image"
                // value={formData.image}
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

export default Anggota;
