import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import icons from "../../data/icons";
import { navv, adminDash } from "../../data/navbarData";
import featherLogo from "../../assets/images/feather-logo.png";
import ConfirmationPopup from "../../CustomComponents/ConfirmationPopup";
import { logout } from "../../slices/authSlice";
const Navbar = ({ burger, setBurger, authSelector, dispatch }) => {
  const { user } = authSelector;
  const location = useLocation();
  const navigate = useNavigate();

  const [clickState, setClickState] = useState("");
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [animateCloseButton, setAnimateCloseButton] = useState(false);
  const [hoverTooltip, setHoverTooltip] = useState(null);
  const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);
  const [hoverLogout, setHoverLogout] = useState(false); 

  const onClickHandle = (name) => {
    navigate(`/${name}`);
    setClickState(name);
    setBurger(false);
  };

  useLayoutEffect(() => {
    const currentPath = location.pathname.slice(1) || "Dashboard";
    setClickState(currentPath);
  }, [location.pathname]);

  useEffect(() => {
    let timer;
    if (burger) {
      timer = setTimeout(() => {
        setShowCloseButton(true);
        setAnimateCloseButton(true);
      }, 200);
    } else {
      setShowCloseButton(false);
      setAnimateCloseButton(false);
    }
    return () => clearTimeout(timer);
  }, [burger]);

  const handleLogout = () => {
    setDeleteConfirmPopup(false);
    dispatch(logout());
        setBurger(false);
  };

  return (
    <div
      className={`w-[80px] h-screen bg-[#17ACC3] absolute z-50 transition-all duration-400 capitalize ${
        burger ? "left-0" : "-left-[300px]"
      } md:static flex flex-col justify-between`}
    >
      <ConfirmationPopup
        visible={deleteConfirmPopup}
        message="Are you sure you want to Logout?"
        onConfirm={handleLogout}
        onCancel={() => setDeleteConfirmPopup(false)}
      />

      {showCloseButton && (
        <div
          className={`cancel text-black absolute -right-12 top-3 text-[20px] bg-white p-2 rounded-full transition-all duration-400 md:hidden ${
            animateCloseButton ? "animate-lotus" : ""
          }`}
          onClick={() => setBurger((prev) => !prev)}
        >
          {icons.closeIcon}
        </div>
      )}

      {/* Logo */}
      <div className="flex gap-2 items-center justify-center py-5 h-[100px]">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
          <img
            src={featherLogo}
            alt="Feather Softwares Logo"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation flex flex-col justify-start w-full h-full py-4 text-white items-center ">
        <ul className="flex flex-col justify-center  w-full items-center gap-2 ps-[10px] ">
          {navv.map((nav, ind) => {
            if (!adminDash.includes(nav.path) || user.role === "admin") {
              return (
                <li
                  key={ind}
                  onClick={() => onClickHandle(nav.path)}
                  onMouseEnter={() => setHoverTooltip(nav.name)}
                  onMouseLeave={() => setHoverTooltip(null)}
                  className={`navigator group relative flex  gap-3 items-center justify-center w-full py-2 rounded-s-full ${
                    clickState === nav.path
                      ? "bg-white bg-opacity-30 "
                      : "hover:bg-white hover:bg-opacity-30"
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="icon text-[30px]">{nav.icon}</span>
                    {hoverTooltip === nav.name && (
                      <span className="absolute left-[67px] top-1/2 transform -translate-y-1/2 px-2 py-1 bg-[#17ACC3] text-white text-xs rounded-md shadow-md opacity-100 transition-opacity duration-300">
                        {nav.name}
                        <span className="absolute top-1/2 -left-[6px] -translate-y-1/2 h-3 w-3 rotate-45 bg-[#17ACC3]"></span>
                      </span>
                    )}
                  </div>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>


      <div className="flex justify-center items-center py-4 px-0  relative w-full ps-[10px] ">
        <button
          className="logout rounded-[8px] px-2 py-2 flex justify-center w-full items-center capitalize hover:bg-white hover:bg-opacity-30 text-white text-[30px] rounded-s-full  "
          onClick={() => setDeleteConfirmPopup(true)}
          onMouseEnter={() => setHoverLogout(true)} 
          onMouseLeave={() => setHoverLogout(false)} 
        >
          {icons.logout}
          {hoverLogout && (
            <span className="absolute left-[97px] top-1/2 transform -translate-y-1/2 px-2 py-1 bg-[#17ACC3] text-white text-xs rounded-md shadow-md opacity-100 transition-opacity duration-300">
              Logout
              <span className="absolute top-1/2 -left-[6px] -translate-y-1/2 h-3 w-3 rotate-45 bg-[#17ACC3]"></span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
