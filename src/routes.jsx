import {
  UserCircleIcon,
  TableCellsIcon,
  ClipboardDocumentListIcon,
  ArrowLeftIcon,
  FingerPrintIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";
import { Anggota, Kehadiran, Laporan, Absen, RekapAbsen } from "@/pages/dashboard";
import { SignIn, ChangePw } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "daftar anggota",
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
        icon: <FingerPrintIcon {...icon} />,
        name: "absensi",
        path: "/absen",
        element: <Absen />,
      },
      {
        icon: <ClipboardDocumentIcon {...icon} />,
        name: "rekap absen",
        path: "/rekap",
        element: <RekapAbsen />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowLeftIcon {...icon} />,
        name: "Log Out",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/change-pw",
        element: <ChangePw />,
      },
    ],
  },
];

export default routes;
