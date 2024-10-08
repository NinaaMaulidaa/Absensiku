import { Routes, Route, useNavigate } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import React, { useEffect } from "react";
import {
  Input,
  Option,
  Select,
  Button,
  Dialog,
  Textarea,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import Swal from 'sweetalert2'
import axios from "axios";
export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const navigate = useNavigate()
  const { sidenavType } = controller;
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  
  const submitForm = async (e) => {
    e.preventDefault()
    try {
      const {nama, username, email, status, password} = e.target
    const user = {
      name: nama.value,
      email: email.value,
      isActive: true,
      number_id: username.value,
      password: password.value
    }
    const response = await axios.post('https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/user', user)
      handleOpen()
      Swal.fire({
        title: "Berhasil!",
        text: "Data pengguna ditambahkan!",
        icon: "success",
        timer: 2000
      });
      navigate('/anggota')
    } catch (error) {
      console.log(error.message);
      handleOpen()
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menambahkan data!",
        timer: 2000
      });
    }
  }

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
        brandName="https://3.bp.blogspot.com/-6Bq5Uk2tePI/Wflu6JX_KII/AAAAAAAAAVM/u1XUaIpGW9MjnRDQ1vfXf0HHvMOQrdRZgCLcBGAs/s1600/New-Logo-TA-2016.png"
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={handleOpen}
        >
          <UserPlusIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {routes.map(
            ({ pages }) => {
              console.log(typeof pages);
              const pageList = typeof pages === 'function' ? pages("All") : pages()
              return pageList.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
            }
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
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
        <form action="" onSubmit={(e) => submitForm(e)}>
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
                name="nama"
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
                Email
              </Typography>
              <Input
                color="gray"
                size="lg"
                name="email"
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
                name="username"
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
                name="password"
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
                Status
              </Typography>
              <Select label="Select Status" name="status">
                <Option value="true">Active</Option>
                <Option value="false">Non Active</Option>
              </Select>
            </div>
          </div>
        <DialogFooter>
          
          <Button type="submit" className="ml-auto">
            Simpan
          </Button>
          
        </DialogFooter>
      </form>
        </DialogBody>
      </Dialog>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
