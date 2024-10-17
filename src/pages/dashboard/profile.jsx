import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Switch,
    Tooltip,
    Button,
  } from "@material-tailwind/react";
  import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
  } from "@heroicons/react/24/solid";
  import { Link } from "react-router-dom";
  import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
  import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useUserLogin } from "@/context/user";
import { useEffect, useState } from "react";
import axios from "axios";
  
  export function Profile() {
    const [user, setUser] = useUserLogin()
    console.log(user);
    const [data, setData] = useState({
      name: '',
      number_id: '',
      description: '',
      email: '',
      contactNumber: '',
      institution: '',
      internship_period: '',
      image: '',
      address: ''
    })

    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/user/${user.id}`)
        setData(response.data.data)
      }
      fetchData()
    }, [])

    return (
      <>
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
        </div>
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                <Avatar
                  src={`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/files/${data.image}`}
                  alt="bruce-mars"
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {data.name}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    Magang
                  </Typography>
                </div>
              </div>
              
            </div>
            <div className="mb-12 px-4">
              <ProfileInfoCard
                title="Profile Information"
                description={data.description ? data.description : `Nama saya ${data.name}. Saya adalah seorang Mahasiswa/Siswa di ${data.institution}, dan saat ini tinggal di ${data.address}dengan nomor telepon yang dapat dihubungi ${data.contactNumber}, serta alamat email aktif ${data.email}.`}
                details={{
                  "username": data.number_id,
                  telepon: data.contactNumber,
                  email: data.email,
                  "sekolah / kampus": data.institution,
                }}
                action={
                  <Tooltip content="Edit Profile">
                    <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                  </Tooltip>
                }
              />
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
  
  export default Profile;