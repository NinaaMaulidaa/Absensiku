import {
  QrCodeIcon,
} from "@heroicons/react/24/solid";
import { element } from "prop-types";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: QrCodeIcon,
    title: "Check-In",
    value: "Semangatt!!",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: QrCodeIcon,
    title: "Check-Out",
    value: "Hati-hati dijalan.",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
