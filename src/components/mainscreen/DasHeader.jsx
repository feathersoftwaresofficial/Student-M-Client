import React, { useState } from 'react'
import { logout } from '../../slices/authSlice';
import { MdLogout } from "react-icons/md";
import icons from '../../data/icons';
import ConfirmationPopup from '../../CustomComponents/ConfirmationPopup';

const DasHeader = ({ setBurger, dispatch }) => {
  const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);



  const onClickBurger = () => {
    setBurger((pre) => !pre)

  }

  const deleteConform = () => {
    dispatch(logout())

  }








  return (
    <header
      className="flex justify-between h-[70px]   md:justify-end z-30   py-  px- md:px- w-full  items-center md:gap-10   top-0 right-0
     left-0  "
    >
      <ConfirmationPopup
        visible={deleteConfirmPopup}
        message={`Are you sure you want to Logout?`}
        onConfirm={deleteConform}
        onCancel={() => setDeleteConfirmPopup(false)}
      />

      <div
        className="burger md:hidden px-3   text-white text-[30px] "
        onClick={() => onClickBurger()}
      >
        {icons.bar}
      </div>

      <button
        className="logout px-4 py-1 capitalize text-white font-bold  text-[31px] rounded-sm p-1"
        onClick={() => setDeleteConfirmPopup(true)}
      >
        {icons.logout}
      </button>
    </header>
  );
}

export default DasHeader