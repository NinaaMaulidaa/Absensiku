import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export function ChangePw() {
  const navigate = useNavigate()
  const changePassword = async (e) => {
    e.preventDefault()
    const change = {
      email: e.target.email.value,
      password: e.target.password.value,
    }
    try {
      await axios.put(`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/auth/change-password`, change, {})
      Swal.fire({
        title: "Berhasil!",
        text: "Ganti Password berhasil di lakukan!.",
        icon: "success",
        timer: 2000
      });
      navigate('/auth/sign-in')
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Gagal!",
        text: error,
        icon: "error",
      });
    }
  }
  return (
    <section className="h-screen gap-4 flex">
            <div className="w-2/5 h-full hidden lg:block">
            <img
          src="https://i.pinimg.com/736x/30/f8/56/30f85663a6807ca681cfe3bcbd841b66.jpg"
          className="h-full w-full object-cover rounded-r-full"
        />
      </div>
      <div className="w-full lg:w-3/5 flex lg:gap-2 gap-5 flex-col items-center justify-center">
      <div className="flex justify-start">
        <img
          src="https://3.bp.blogspot.com/-6Bq5Uk2tePI/Wflu6JX_KII/AAAAAAAAAVM/u1XUaIpGW9MjnRDQ1vfXf0HHvMOQrdRZgCLcBGAs/s1600/New-Logo-TA-2016.png"
          className="m-4 h-auto w-72"
        />
        </div>
        <div className="text-center w-4/5 lg:w-full">
          {/* <Typography variant="h2" className="font-bold my-4">Change Password</Typography> */}
          <Typography variant="paragraph" color="blue-gray" className="lg:text-lg text-sm font-normal">Enter your email and password to Change Password.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={changePassword}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              name="email"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium ">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              name="password"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div>
          <Button type="submit" className="mt-6" fullWidth>
          Submit
          </Button>
          </div>
        </form>

      </div>
    </section>
  );
}

export default ChangePw;
