import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../slices/authSlice";
import studentsReducer from "../slices/studentsSlice";
import activityReducer from "../slices/activitySlice";
import programReducer from "../slices/programsSlice";
import usersReducer from "../slices/usersSlice";
import otherReducer from "../slices/otherSlice";


export const store = configureStore({
  reducer: {
    authSlice: authReducer,
    studentsSlice: studentsReducer,
    activitySlice: activityReducer,
    programSlice: programReducer,
    usersSlice: usersReducer,
    otherSlice: otherReducer,
  },
});