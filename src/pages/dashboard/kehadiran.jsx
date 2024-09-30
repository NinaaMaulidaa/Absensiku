import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import { authorsTableData } from "@/data";

export function Kehadiran() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h5" color="white">
           Daftar Hadir
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nama", "Sekolah", "Jam Masuk", "Jam Keluar", "Status",].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className={`text-[13px] font-bold ${el == "Jam Masuk" || el == "Jam Keluar" || el == "Status" ? `text-center` : ''} uppercase text-blue-gray-400`}
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(
                ({ img, name, noInduk, sekolah, checkin, checkout, status }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" variant="rounded" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {noInduk}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {sekolah[0]}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs text-center font-semibold text-blue-gray-600">
                          {checkin}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs text-center font-semibold text-blue-gray-600">
                          {checkout}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex justify-center">
                        <Chip
                          variant="gradient"
                          color={status == "Masuk" && "green" || status == "Tidak Masuk" && "blue-gray" || status == "Terlambat" && "red" }
                          value={status}
                          className="py-0.5 px-2 text-[10px] font-medium w-fit flex justify-center"
                        />
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
  );
}

export default Kehadiran;
