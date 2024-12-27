import React, { useEffect, useRef } from "react";
import DasHeader from "../components/mainscreen/DasHeader";
import { Outlet } from "react-router-dom";
import Navbar from "../components/mainscreen/Navbar";


const DashLayout = ({
  burger,
  setBurger,
  dispatch,
  authSelector,
  otherSelector,
}) => {
  const { dashBoardScroll } = otherSelector;
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [dashBoardScroll]);

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className="md:block  left-0  z-30 ">
        <Navbar
          burger={burger}
          setBurger={setBurger}
          authSelector={authSelector}
          dispatch={dispatch}
        />
      </div>

      <div className="w-full h-full flex flex-col overflow-hidden ">
        <div className="h-[70px] md:hidden bg-[#17ACC3]">
          <DasHeader
            burger={burger}
            setBurger={setBurger}
            dispatch={dispatch}
          />
        </div>

        <div className="flex-grow overflow-auto" ref={containerRef}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashLayout;

