import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import backendUrl from "../backendIUrl/url";

const PORT = backendUrl();

export const addUsers = createAsyncThunk(
  "add/user",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PORT}/register/`, credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const getUsers = createAsyncThunk(
  "get/user",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PORT}/user/`)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }

  }
);

export const updateUser = createAsyncThunk(
  "update/user",
  async (credentials, { rejectWithValue }) => {
    try {

      if (credentials.password === "") {
        const { password, ...filteredCredentials } = credentials;
        credentials = filteredCredentials;
      }
      console.log(credentials); 
      const response = await axios.put(
        `${PORT}/user/${credentials.id}/`,
        credentials
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);


export const deleteUser = createAsyncThunk(
  "delete/user",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${PORT}/user/${credentials}/`);
      return credentials;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

const initialState = {
  allUsers: [],
  loading: {
    addUsersLoading: false,
    updateUserLoading: false,
    deleteUserLoading: false,
    getUserLoading: false,
  },
  deleteIds: [],
  adminPageRoute: "allUsers",
};

export const usersSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addDeleteIds: (state, action) => {
      state.deleteIds = [...state.deleteIds, action.payload];
    },
    changeAdminRoute: (state, action) => {
      state.adminPageRoute = action.payload;
      console.log(state.adminPageRoute);
    },
  },

  extraReducers: (builder) => {
    builder

      // add user
      .addCase(addUsers.pending, (state) => {
        state.loading.addUsersLoading = true;
      })
      .addCase(addUsers.fulfilled, (state, action) => {
        state.loading.addUsersLoading = false;
        state.allUsers = [...state.allUsers, action.payload.user];
        console.log(action.payload);
      })
      .addCase(addUsers.rejected, (state, action) => {
        state.loading.addUsersLoading = false;
        const { errors } = action.payload;

        console.log(action.payload);
      })

      // get users
      .addCase(getUsers.pending, (state) => {
        state.loading.getUserLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading.getUserLoading = false;
        state.allUsers = action.payload.data;
        console.log(action.payload.data);
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading.getUserLoading = false;
        const { errors } = action.payload;

        console.log(action.payload);
      })

      // update user
      .addCase(updateUser.pending, (state) => {
        state.loading.updateUserLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading.updateUserLoading = false;
        state.allUsers = state.allUsers.map((user, index) =>
          user.id === action.payload.data[0].id ? action.payload.data[0] : user
        );
        console.log(action.payload.data[0]);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading.updateUserLoading = false;

        console.log(action.payload);
      })

      // delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading.deleteUserLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading.deleteUserLoading = false;
        state.allUsers = state.allUsers.filter(
          (user, index) => user.id !== action.payload
        );
        console.log(action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading.deleteUserLoading = false;

        console.log(action);
      });
  },
});

export const usersState = (state) => state.usersSlice;
export const { addDeleteIds, changeAdminRoute } = usersSlice.actions;
export default usersSlice.reducer;
