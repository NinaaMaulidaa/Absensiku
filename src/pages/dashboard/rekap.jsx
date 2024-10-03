import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Progress,
} from "@material-tailwind/react";
import {EyeIcon  } from "@heroicons/react/24/solid";
import {RekapSiswa  } from "@/data";

export function RekapAbsen() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
           Rekap Absen
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
          <thead>
              <tr>
                {["No", "Tanggal", "Check-In","Check-Out", "Keterangan"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className={`text-[13px] font-bold ${ el =="Check-In" || "Check-In" || "Keterangan" ? `text-center` : ''} uppercase text-blue-gray-400`}
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RekapSiswa .map(
                ({ no, tanggal, checkin, checkout, keterangan}, key) => {
                  const className = `py-3 px-5 ${
                    key === RekapSiswa .length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={tanggal}>
                      <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-center"
                          >
                            {no}
                          </Typography>
                          </td>

                          <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-center"
                          >
                            {tanggal}
                          </Typography>
                          </td>
                        
                      
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-center text-blue-gray-600"
                        >
                          {checkin}
                        </Typography>
                      </td>
                      <td className={className}>
                          <Typography
                            variant="small"
                            className="text-center text-blue-gray-600"
                          >
                            {checkout}
                          </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex gap-3 justify-center items-center">
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                         <EyeIcon  className="w-5 h-5" />
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
  )
}
  
  export default RekapAbsen