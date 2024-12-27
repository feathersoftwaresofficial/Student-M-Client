import { createSlice } from "@reduxjs/toolkit";






const initialState = {

  dashBoardScroll:false
};

export const otherSlice = createSlice({
  name: "other",
  initialState,
  reducers: {

      refreshDashScroll:(state,action)=>{
        state.dashBoardScroll=!state.dashBoardScroll

      }
  },

  extraReducers: (builder) => {
    builder;
  },
});

export const otherState = (state) => state.otherSlice;
export const { refreshDashScroll } = otherSlice.actions;
export default otherSlice.reducer;
