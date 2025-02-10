import { IoMdCart } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { RiEBike2Fill } from "react-icons/ri";
import { LuPackageCheck } from "react-icons/lu";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { RiMotorbikeFill } from "react-icons/ri";

export const b2bForwardTrackingMileStones = [
    {
        currentStatus: 100,
        label: "Order Placed",
        index: 0,
        imgUrl: IoMdCart,
    },
    {
        currentStatus: 125,
        label: "Pickup Scheduled",
        index: 1,
        imgUrl: IoMdCart,
    },
    {
        currentStatus: 150,
        label: "Out For Pickup",
        index: 2,
        imgUrl: RiMotorbikeFill,
    },
    {
        currentStatus: 200,
        label: "Pickup Completed",
        index: 3,
        imgUrl: FaPeopleCarryBox,
    },
    {
        currentStatus: 300,
        label: "In Transit",
        index: 4,
        imgUrl: TbTruckDelivery,
    },
    {
        currentStatus: 425,
        label: "Out For Delivery",
        index: 5,
        imgUrl: RiEBike2Fill,
    },
    {
        currentStatus: 500,
        label: "Delivered",
        index: 6,
        imgUrl: LuPackageCheck,
    }
]