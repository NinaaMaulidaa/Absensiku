import { useUserLogin } from "@/context/user";
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '@/context/auth';
import Cookies from 'js-cookie';
import { useContext } from "react";

export function SignIn() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext);
  const loginAction = async (e) => {
    e.preventDefault()
    try {
      const userData = {
        number_id: e.target.username.value,
        password: e.target.password.value,
      };
    
      const response = await axios.post('https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/auth/login', userData);
      console.log(response);
    
      const token = response.data.data.access_token;
      const tokenParts = token.split('.');
      
      if (tokenParts.length === 3) {
        const decodedPayload = JSON.parse(window.atob(tokenParts[1]));
        login({userData: {
          number_id: decodedPayload.number_id,
          id: decodedPayload.id,
          email: decodedPayload.email
        }, token: token})
        Cookies.set('token', token, { expires: 1, path: '/' });
        navigate('/dashboard/profile')
      } else {
        console.error('Invalid JWT token format');
      }
    } catch (error) {
      console.error('Login failed', error);
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
      <div className="w-full lg:w-3/5 flex lg:gap-2 gap-5 flex-col items-center justify-center " >
        <div className="flex justify-end">
        <img
          src="https://3.bp.blogspot.com/-6Bq5Uk2tePI/Wflu6JX_KII/AAAAAAAAAVM/u1XUaIpGW9MjnRDQ1vfXf0HHvMOQrdRZgCLcBGAs/s1600/New-Logo-TA-2016.png"
          className="m-4 h-auto w-72"
        />
        </div>
        <div className="text-center w-4/5 lg:w-full">
          {/* <Typography variant="h1" className="my-4">Sign-In</Typography> */}
          <Typography variant="paragraph" color="blue-gray" className="lg:text-lg text-sm font-normal">Enter your username and password to Sign In.</Typography>
        </div>

        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={loginAction}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium ">
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="username"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
              name="username"
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
          {/* <a href="/dashboard/anggota"> */}
          <Button type="submit" className="mt-6 " fullWidth>
            Sign-In
            </Button>
            {/* </a> */}
          
          </div>

          <div className="flex justify-end gap-2 mr-4 mt-4 ">
            <Typography variant="small" className="font-medium text-gray-900 ">
              <a href="/auth/change-pw">
                Forgot Password?
              </a>
            </Typography>
          </div>
        </form>
      </div>

    </section>
  );
}

export default SignIn;
