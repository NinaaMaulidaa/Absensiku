import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";


export function SignIn() {
  return (
    <section className="flex gap-4 border-indigo-400 bg-blue-gray-300">
      <div className="w-full lg:w-3/5 my-20" >

        <div className="text-center">
          <Typography variant="h1" className="font-serif font-bold mb-4">Sign-In</Typography>
          {/* <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your username and password to Sign In.</Typography> */}
        </div>

        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium font-serif">
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="username"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 font-serif"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium font-serif">
              Password
            </Typography>

            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 font-serif"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button className="mt-6 font-serif" fullWidth>
            Sign In
          </Button>

          <div className="flex justify-end gap-2 mr-4 mt-4 ">
            <Typography variant="small" className="font-medium text-gray-900 font-serif">
              <a href="#">
                Forgot Password?
              </a>
            </Typography>
          </div>
        </form>
      </div>
      
      {/* <div className="w-3/5 h-full hidden lg:block">
        <img
          src="/img/Telkom-Bg.jpg"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div> */}

    </section>
  );
}

export default SignIn;
