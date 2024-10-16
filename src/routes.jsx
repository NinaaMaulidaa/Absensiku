import {
  UserCircleIcon,
  TableCellsIcon,
  ClipboardDocumentListIcon,
  ArrowLeftIcon,
  FingerPrintIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";
import { Anggota, Kehadiran, Laporan, Absen, RekapAbsen, Profile } from "@/pages/dashboard";
import { SignIn, ChangePw } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: (user) => {
      if(user === 'Magang') {
        const pages = [
          {
            icon: <UserCircleIcon {...icon} />,
            name: "Profile",
            path: "/profile",
            element: <Profile />,
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
        ]
        return pages
      } 
      if(user === "All") {
        return [
          {
            icon: <UserCircleIcon {...icon} />,
            name: "Profile",
            path: "/profile",
            element: <Profile />,
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
        ]
      } else {
        const pages = [
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
        ]
        return pages
      }
    },
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: (user) => {
      if(user) {
        return [
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
        ]
      }
    },
  },
];

export default routes;
