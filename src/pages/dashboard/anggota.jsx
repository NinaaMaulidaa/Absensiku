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
  IconButton,
  Avatar
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import {TrashIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import fetchData from "@/data/user/fetchListUser";
import { useNavigate } from "react-router-dom";

export function Anggota() {

  const MySwal = withReactContent(Swal)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate()
  const [listUser, setListUser] = React.useState([])


  useEffect( () => {
    const fetchList = async () => {
      try {
        const { data } = await fetchData(); // Wait for the data
        console.log(data);
        setListUser(data); // Set the resolved data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchList();
  }, [])

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
          const {data} = await fetchData()
          setListUser(data)
          Swal.fire({
            title: "Dihapus!",
            text: "Data berhasil di hapus!.",
            icon: "success",
            timer: 2000
          });
        }).catch((err) => {
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
                          <Avatar src={user.image} alt={user.image} size="sm" variant="rounded" />
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
                          {user.periode}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex gap-3 justify-center items-center">
                        <Typography
                          as="a"
                          href="#"
                          onClick={handleOpen}
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                         <PencilSquareIcon className="w-5 h-5" />
                        </Typography>
                        <Typography
                          as="a"
                          onClick={() => deleteData(user._id)}
                          className="text-xs font-semibold text-blue-gray-600"
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
      </Card>
    </div>
    <Dialog size="lg" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Tambah Anggota
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
          
          <div className="flex gap-4">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Nama
              </Typography>
              <Input
                color="gray"
                size="lg"
                name="weight"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Nomor Induk
              </Typography>
              <Input
                color="gray"
                size="lg"
                name="size"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Asal Sekolah
              </Typography>
              <Input
                color="gray"
                size="lg"
                name="weight"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Periode
              </Typography>
              <Input
                color="gray"
                size="lg"
                name="size"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Username
              </Typography>
              <Input
                color="gray"
                size="lg"
                name="weight"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Password
              </Typography>
              <Input
                color="gray"
                size="lg"
                name="size"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto" onClick={handleOpen}>
            Simpan
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );

  
}

export default Anggota;
