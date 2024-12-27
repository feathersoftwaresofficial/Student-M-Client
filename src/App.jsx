import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authState, verifyToken } from "./slices/authSlice";
import {
  getAllStudentData,
  getStudentCounts,
  getStudentHours,
  refreshAllProgram,
  studentsState,
  updataCount,
} from "./slices/studentsSlice";
import { activityState, getAllActivity } from "./slices/activitySlice";
import {
  getProgram,
  getProgramType,
  programState,
} from "./slices/programsSlice";
import LaunchScreen from "./components/mainscreen/LaunchScreen";
import GlassyOverlay from "./components/animation/GlassyOverlay";
import usePopUp from "./components/animation/PopUp";
import AppRoutes from "./routes/Routes";
import { usersState } from "./slices/usersSlice";
import { otherState } from "./slices/otherSlice";

function App() {
  const [burger, setBurger] = useState(false);
  const { triggerPopUp } = usePopUp();
  const selector = useSelector(studentsState);
  const authSelector = useSelector(authState);
  const activitySelector = useSelector(activityState);
  const programSelector = useSelector(programState);
  const usersSelector = useSelector(usersState);
  const otherSelector = useSelector(otherState);
  const { loginStatus, launchScreenStatus } = authSelector;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(verifyToken());
      await dispatch(getAllStudentData());
      dispatch(getProgram());
      dispatch(getProgramType());
      dispatch(updataCount());
      dispatch(getAllActivity());
      dispatch(refreshAllProgram());
      dispatch(getStudentCounts());
      dispatch(getStudentHours());
    };

    fetchData();
  }, [dispatch]);

  if (launchScreenStatus) {
    return <LaunchScreen />;
  }

  return (
    <div className="w-screen h-screen select-none overflow-x-hidden ">

      <GlassyOverlay visible={burger} />

      <AppRoutes
        burger={burger}
        setBurger={setBurger}
        dispatch={dispatch}
        navigate={navigate}
        triggerPopUp={triggerPopUp}
        selector={selector}
        programSelector={programSelector}
        authSelector={authSelector}
        usersSelector={usersSelector}
        loginStatus={loginStatus}
        activitySelector={activitySelector}
        otherSelector={otherSelector}
      />

    </div>
    
  );
}

export default App;
