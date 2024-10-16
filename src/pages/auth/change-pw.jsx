import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export function ChangePw() {
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
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
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
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div>
          <a href="/auth/sign-in">
          <Button className="mt-6" fullWidth>
          Sumbit
          </Button>
          </a>
          </div>
        </form>

      </div>
    </section>
  );
}

export default ChangePw;
