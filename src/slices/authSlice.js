import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import backendUrl from "../backendIUrl/url";

const PORT = backendUrl();

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PORT}/login/`, credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PORT}/register/`, credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${PORT}/password-reset-request/`,
        credentials
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const passwordReset = createAsyncThunk(
  "auth/passwordReset",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${PORT}/password-reset-request/validate/`,
        credentials
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshtoken = await localStorage.getItem("token");
      if (!refreshtoken || refreshtoken.trim() === null) {
        console.error("No refresh token found. Rejecting request.");
        return rejectWithValue("No refresh token found. Please log in again.");
      }
      const response = await axios.post(`${PORT}/login/`, { refreshtoken });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

const initialState = {
  user: {},
  launchScreenStatus: true,
  loading: {
    loginLoading: false,
    signupLoading: false,
    resetpasswordLoading: false,
  },
  isLoading: false,
  emailValidation: false,
  loginStatus: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshError: (state) => {
      state.errors = [];
    },

    onChangeEmailValidation: (state) => {
      state.emailValidation = true;
    },

    logout: (state) => {
      localStorage.setItem("token", null);
      state.user = {};
      state.loginStatus = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading.loginLoading = true;
        state.loginStatus = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading.loginLoading = false;
        state.loginStatus = true;
        const { refresh, user } = action.payload;
        state.user = user;
        localStorage.setItem("token", refresh);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading.loginLoading = false;
        state.loginStatus = false;
        const { errors } = action.payload;

        state.loginErrors = errors;
      })

      // signup
      .addCase(signupUser.pending, (state) => {
        state.loading.signupLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading.signupLoading = false;
        console.log(action.payload)
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading.signupLoading = false;
        const { errors } = action.payload;
        state.signupError = errors;
        console.log(action.payload);
      })

      // verify email
      .addCase(verifyEmail.pending, (state) => {
        state.loading.resetpasswordLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading.resetpasswordLoading = false;
        state.emailValidation = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading.resetpasswordLoading = false;
        const { errors } = action.payload;
        state.PasswordResetError = errors;
      })

      // password reset 
      .addCase(passwordReset.pending, (state) => {
        state.loading.resetpasswordLoading = true;
      })
      .addCase(passwordReset.fulfilled, (state, action) => {
        state.loading.resetpasswordLoading = false;
        state.emailValidation = false;
      })
      .addCase(passwordReset.rejected, (state, action) => {
        state.loading.resetpasswordLoading = false;
        const { errors } = action.payload;
        state.PasswordResetError = errors;
      })

      // token verify
      .addCase(verifyToken.pending, (state) => {
        state.loginStatus = false;
        state.launchScreenStatus = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loginStatus = true;
        state.launchScreenStatus = false;
      
        state.user = action.payload.data;
          console.log(state.user);
        
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loginStatus = false;
        state.launchScreenStatus = false;
      });
  },
});

export const authState = (state) => state.authSlice;
export const { refreshError, logout } = authSlice.actions;
export default authSlice.reducer;
