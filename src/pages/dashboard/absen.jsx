import React from "react";
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
import { XMarkIcon } from "@heroicons/react/24/outline";

export function Absen() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (value) => {
    console.log(value);
    setOpen(!open)
  };
    return (
        <div className="mt-12">
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            {statisticsCardsData.map(({ icon, title, ...rest }) => (
              <StatisticsCard
                key={title}
                {...rest}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-6 h-6 text-white",
                })}
                onClick={handleOpen}
              />
            ))}
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
                <Radio name="type" label="Hadir" />
                <Radio name="type" label="Absen" defaultChecked />
              </div>
            </div>
            <div className="mt-4 w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Keterangan
              </Typography>
              <div className="w-full">
                <Textarea label="ket" />
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
                type="file"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
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

  export default Absen
