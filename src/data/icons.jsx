import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";

import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { PiStudentBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineLogout } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";



import total from '../assets/iconImages/total.png';
import active from '../assets/iconImages/active.png';
import intern from '../assets/iconImages/intern.png';
import project from '../assets/iconImages/project.png';
import complete from '../assets/iconImages/complete.png';
import discontinue from '../assets/iconImages/discontinue.png';
import { BsThreeDotsVertical } from "react-icons/bs";


const icons = {
  eye: <FaEye />,
  edit: <FaEdit />,
  delete: <AiFillDelete />,
  addStudent: <IoPersonAddSharp />,
  home: <FaHome />,
  students: <FaPeopleGroup />,
  program: <IoMdAddCircle />,
  bar: <RxHamburgerMenu />,
  plus: <FaPlus />,
  closeIcon: <IoClose />,
  downArrow: <FaAngleDown />,
  // logout: <IoLogOut />,
  logout: <AiOutlineLogout />,
  student: <PiStudentBold />,
  verticalDot: <BsThreeDotsVertical />,

  // img logo
  total:total,
  Active:active,
  completed:complete,
  discontinue:discontinue,
  cource:intern,
  intern:intern,
  project:project,
  work:intern,
  default:intern


};

export default icons;
