import { IoMdCart } from "react-icons/io";
import { ImLocation2 } from "react-icons/im";
import { RiMotorbikeFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { RiEBike2Fill } from "react-icons/ri";
import { LuPackageCheck } from "react-icons/lu";
import { FaPeopleCarryBox } from "react-icons/fa6";

export const trackingMileStones=[
    {
      currentStatus: "CREATED",
      label: "Order Placed",
      index: 0,
      imgUrl: IoMdCart,
    },
    {
      currentStatus: "PICKUP_SCHEDULED",
      label: "Pickup Scheduled",
      index: 1,
      imgUrl: ImLocation2,
    },
    {
      currentStatus: "OUT_FOR_PICKUP",
      label: "Out For Pickup",
      index: 2,
      imgUrl: RiMotorbikeFill,
    },
    {
      currentStatus: "PICKUP_COMPLETED",
      label: "Pickup Completed",
      index: 3,
      imgUrl: FaPeopleCarryBox,
    },
    {
      currentStatus: "IN_TRANSIT",
      label: "In Transit",
      index: 4,
      imgUrl: TbTruckDelivery,
    },
    {
      currentStatus: "OUT_FOR_DELIVERY",
      label: "Out For Delivery",
      index: 5,
      imgUrl: RiEBike2Fill,
    },
    {
      currentStatus: "DELIVERED",
      label: "Delivered",
      index: 6,
      imgUrl: LuPackageCheck,
    }
  ]