import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import backendUrl from "../backendIUrl/url";

const PORT = backendUrl();

// Fetch all activities
export const getProgram = createAsyncThunk(
  "get/program",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PORT}/Otherprogram/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const addProgram = createAsyncThunk(
  "add/program",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PORT}/Otherprogram/`, {
        program: credentials,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const updateProgram = createAsyncThunk(
  "update/program",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${PORT}/Otherprogram/${credentials.id}/`,
        credentials
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const deleteProgram = createAsyncThunk(
  "delete/program",
  async (credentials, { rejectWithValue }) => {
    try {
      await axios.delete(`${PORT}/Otherprogram/${credentials}/`);
      return credentials;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// -------------
export const getProgramType = createAsyncThunk(
  "get/programType",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PORT}/Otherprogramtype/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const addProgramType = createAsyncThunk(
  "add/programType",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PORT}/Otherprogramtype/`, {
        programType: credentials,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const updateProgramType = createAsyncThunk(
  "update/programType",
  async (credentials, { rejectWithValue }) => {
    console.log(credentials);

    try {
      const response = await axios.put(
        `${PORT}/Otherprogramtype/${credentials.id}/`,

        credentials
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const deleteProgramType = createAsyncThunk(
  "delete/programType",
  async (credentials, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${PORT}/Otherprogramtype/${credentials.id}/`
      );
      return credentials.id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// Initial state  
const initialState = {

  program: [],
  programType: [],
  getProgramLoading: true,
  postProgramLoading: false,
  updataProgramLoading: false,
  deleteProgramLoading: false,
  getProgramTypeLoading: true,
  postProgramTypeLoading: false,
  updataProgramTypeLoading: false,
  deleteProgramTypeLoading: false,
  
};

// Activity slice
const programSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getProgram.pending, (state) => {
        state.getProgramLoading = true;
      })
      .addCase(getProgram.fulfilled, (state, action) => {
        state.getProgramLoading = false;
        state.program = action.payload.data;
      })
      .addCase(getProgram.rejected, (state, action) => {
        state.getProgramLoading = false;
        state.error = action.payload;
      })

      // add
      .addCase(addProgram.pending, (state) => {
        state.postProgramLoading = true;
      })
      .addCase(addProgram.fulfilled, (state, action) => {
        state.postProgramLoading = false;
        state.program = [...state.program, action.payload.data];
      })
      .addCase(addProgram.rejected, (state, action) => {
        state.postProgramLoading = false;
        state.error = action.payload;
      })

      // update
      .addCase(updateProgram.pending, (state) => {
        state.updataProgramLoading = true;
      })
      .addCase(updateProgram.fulfilled, (state, action) => {
        state.updataProgramLoading = false;
        state.program = state.program.map((pro) =>
          pro.id === action.payload.data.id ? action.payload.data : pro
        );
      })
      .addCase(updateProgram.rejected, (state, action) => {
        state.updataProgramLoading = false;
        state.error = action.payload;
      })

      // delete
      .addCase(deleteProgram.pending, (state) => {
        state.deleteProgramLoading = true;
      })
      .addCase(deleteProgram.fulfilled, (state, action) => {
        state.deleteProgramLoading = false;
        state.program = state.program.filter(
          (pro) => pro.id !== action.payload
        );
      })
      .addCase(deleteProgram.rejected, (state, action) => {
        state.deleteProgramLoading = false;
        state.error = action.payload;
      })

      // ------------

      .addCase(getProgramType.pending, (state) => {
        state.getProgramTypeLoading = true;
      })
      .addCase(getProgramType.fulfilled, (state, action) => {
        state.getProgramTypeLoading = false;
        state.programType = action.payload.data;
      })
      .addCase(getProgramType.rejected, (state, action) => {
        state.getProgramTypeLoading = false;
        state.error = action.payload;
      })

      // add
      .addCase(addProgramType.pending, (state) => {
        state.postProgramTypeLoading = true;
      })
      .addCase(addProgramType.fulfilled, (state, action) => {
        state.postProgramTypeLoading = false;
        state.programType = [...state.programType, action.payload.data];

      })
      .addCase(addProgramType.rejected, (state, action) => {
        state.postProgramTypeLoading = false;
        state.error = action.payload;

      })

      // update
      .addCase(updateProgramType.pending, (state) => {
        state.updataProgramTypeLoading = true;
      })
      .addCase(updateProgramType.fulfilled, (state, action) => {
        state.updataProgramTypeLoading = false;
        state.programType = state.programType.map((pro) =>
          pro.id === action.payload.data.id ? action.payload.data : pro
        );
      })
      .addCase(updateProgramType.rejected, (state, action) => {
        state.updataProgramTypeLoading = false;
        state.error = action.payload;
      })

      // delete
      .addCase(deleteProgramType.pending, (state) => {
        state.deleteProgramTypeLoading = true;
      })
      .addCase(deleteProgramType.fulfilled, (state, action) => {
        state.deleteProgramTypeLoading = false;
        state.programType = state.programType.filter(
          (pro) => pro.id !== action.payload
        );
      })
      .addCase(deleteProgramType.rejected, (state, action) => {
        state.deleteProgramTypeLoading = false;
        state.error = action.payload;
      });
  },
});

export const programState = (state) => state.programSlice;
export default programSlice.reducer;
