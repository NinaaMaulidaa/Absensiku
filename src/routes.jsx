import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ClipboardDocumentListIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Anggota, Kehadiran, Laporan, Notifikasi } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "anggota",
        path: "/anggota",
        element: <Anggota />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "kehadiran",
        path: "/kehadiran",
        element: <Kehadiran />,
      },
      {
        icon: <ClipboardDocumentListIcon {...icon} />,
        name: "laporan",
        path: "/laporan",
        element: <Laporan />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifikasi",
        path: "/notifikasi",
        element: <Notifikasi />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
