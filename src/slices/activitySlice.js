import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import backendUrl from "../backendIUrl/url";

const PORT = backendUrl()

// Fetch all activities
export const getAllActivity = createAsyncThunk(
  "activity/getAllActivity",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PORT}/studentsyllabus/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add a new activity
export const addActivity = createAsyncThunk(
  "activity/addActivity",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PORT}/studentsyllabus/`, credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete an activity
export const deleteActivity = createAsyncThunk(
  "activity/deleteActivity",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${PORT}/studentsyllabus/${id}/`);
      return id; // Return the deleted ID for UI filtering
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Edit an activity
export const editActivity = createAsyncThunk(
  "activity/editActivity",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${PORT}/studentsyllabus/${credentials.id}/`,
        credentials
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Initial state
const initialState = {
  isLoading: false,
  getStudentActivityLoading:false,  
  studentAllActivity: [],
  totalActivityHours:0,
  error: null,
  totalActivityHours:0,
  editActivityLoading:false,
  deleteUpdateLoading:false,
  addActivityLoading:false,
  deleteActivityId:[]
};

// Activity slice
const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    addDeleteActivityId: (state, action) => {
      state.deleteActivityId = [...state.deleteActivityId, action.payload];
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch activities
      .addCase(getAllActivity.pending, (state) => {
        state.getStudentActivityLoading = true;
        state.error = null;
      })
      .addCase(getAllActivity.fulfilled, (state, action) => {
        state.studentAllActivity = action.payload.data;
        state.getStudentActivityLoading = false;
      })
      .addCase(getAllActivity.rejected, (state, action) => {
        state.getStudentActivityLoading = false;
        state.error = action.payload;
      })

      // Add activity
      .addCase(addActivity.pending, (state) => {
        state.addActivityLoading = true;
      })
      .addCase(addActivity.fulfilled, (state, action) => {
        state.studentAllActivity.push(action.payload.data);
        state.addActivityLoading = false;
      })
      .addCase(addActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.addActivityLoading = action.payload;
      })

      // Edit activity
      .addCase(editActivity.pending, (state) => {
        state.editActivityLoading = true;
      })
      .addCase(editActivity.fulfilled, (state, action) => {
        const updatedActivity = action.payload.data;
        state.studentAllActivity = state.studentAllActivity.map((activity) =>
          parseInt(activity.id) === parseInt(updatedActivity.id)
            ? updatedActivity
            : activity
        );
        state.editActivityLoading = false;
      })
      .addCase(editActivity.rejected, (state, action) => {
        state.editActivityLoading = false;
        state.error = action.payload;
      })

      // Delete activity
      .addCase(deleteActivity.pending, (state) => {
        state.deleteUpdateLoading = true;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.studentAllActivity = state.studentAllActivity.filter(
          (activity) => activity.id !== deletedId
        );
        state.deleteUpdateLoading = false;
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.deleteUpdateLoading = false;
        state.error = action.payload;
      });
  },
});
 export  const { addDeleteActivityId } = activitySlice.actions;
 export const activityState = (state) => state.activitySlice
export default activitySlice.reducer;
