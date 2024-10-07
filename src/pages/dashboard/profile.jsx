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
  
  export function Profile() {
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
                  src="https://media.licdn.com/dms/image/v2/D5603AQE4bwScCRx-Og/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1718366278503?e=1733961600&v=beta&t=csDgJ4R318KSXY5DHvtxsd2G4SJnqYAPKd6-YD0TJMk"
                  alt="bruce-mars"
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    Nina Krisna Maulida
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    Magang - STMIK Mandira Indonesia
                  </Typography>
                </div>
              </div>
              
            </div>
            <div className="mb-12 px-4">
              <ProfileInfoCard
                title="Profile Information"
                description="I am a 6th semester student at STMIK Mardira Indonesia in Bandung, focusing on honing my skills in information technology. During this time, I have learned the basics of computer science and deepened my programming knowledge. In addition, I am also actively involved in the Student Executive Board (BEM) on campus, where I contribute to various organizational activities, program development, and initiatives that aim to enhance the learning experience and build a strong community among students.
"
                details={{
                  "username": "2115354015",
                  mobile: "082147390668",
                  email: "ninakrsn@gmail.com",
                  location: "Bandung",
                  social: (
                    <div className="flex items-center gap-4">
                      <i className="fa-brands fa-instagram text-purple-500" />
                    </div>
                  ),
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