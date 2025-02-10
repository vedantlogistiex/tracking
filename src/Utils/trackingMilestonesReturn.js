import { IoMdCart } from "react-icons/io";
import { ImLocation2 } from "react-icons/im";
import { RiMotorbikeFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { RiEBike2Fill } from "react-icons/ri";
import { LuPackageCheck } from "react-icons/lu";
import { FaPeopleCarryBox } from "react-icons/fa6";

export const trackingMilestonesReturn = [

  {
    currentStatus: "RETURN_PICKUP_SCHEDULED",
    label: "Pickup Scheduled",
    index: 0,
    imgUrl: ImLocation2,
  },
  {
    currentStatus: "RETURN_OUT_FOR_PICKUP",
    label: "Out For Pickup",
    index: 1,
    imgUrl: RiMotorbikeFill,
  },
  {
    currentStatus: "RETURN_PICKUP_COMPLETED",
    label: "Pickup Completed",
    index: 2,
    imgUrl: FaPeopleCarryBox,
  },
  {
    currentStatus: "RETURN_IN_TRANSIT",
    label: "Return In Transit",
    index: 3,
    imgUrl: TbTruckDelivery,
  },
  {
    currentStatus: "RETURN_OUT_FOR_DELIVERY",
    label: "Out For Return Delivery",
    index: 4,
    imgUrl: RiEBike2Fill,
  },
  {
    currentStatus: "RETURN_DELIVERED",
    label: "Return Delivered",
    index: 5,
    imgUrl: LuPackageCheck,
  }
]