import { Routes, Route } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import React from "react";
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

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

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
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
