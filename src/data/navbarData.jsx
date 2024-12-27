import { FaHome } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { PiStudentBold } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { BiHome } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { MdGroups2 } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { IoHomeSharp } from "react-icons/io5";
 const adminDash = ["signup", "all_users", "add_credential"];
import { IoLogOut } from "react-icons/io5";
const navv = [
  {
    id: 0,
    name: "Dashboard",
    path: "Dashboard",

    icon: <IoHomeSharp />,
  },
  {
    id: 2,
    name: "Students",
    path: "all_Student",
    icon: <TiGroup />,
  },
  {
    id: 5,
    name: "admin",
    path: "all_users",
    icon: <RiAdminFill />,
  },
];



export { navv, adminDash };
