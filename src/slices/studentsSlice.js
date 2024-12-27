import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import backendUrl from "../backendIUrl/url";

const PORT = backendUrl();

export const getAllStudentData = createAsyncThunk(
  "get/allStudentData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PORT}/Student/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err);
    }
  }
);

export const addStudent = createAsyncThunk(
  "add/student",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PORT}/Student/`, credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "delete/student",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${PORT}/Student/${credentials}/`);
      return credentials;
    } catch (err) {
      return rejectWithValue(err.response.data || err);
    }
  }
);

export const updataStudent = createAsyncThunk(
  "edit/editStudent",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${PORT}/Student/${credentials.id}/`,
        credentials
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err);
    }
  }
);

export const getStudentHours = createAsyncThunk(
  "get/remaininghour",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PORT}/remaininghour/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err);
    }
  }
);

export const getStudentCounts = createAsyncThunk(
  "get/getStudentCounts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PORT}/home/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err);
    }
  }
);

const initialState = {
  isLoading: false,
  studentsDataList: [],
  addStudentLoading: false,
  deleteStudentLoading: false,
  deleteStudentIds: [],
  updateStudentLoading: false,
  getStudentCountsLoading: false,
  mentorList: [],
  ProgramType: [],
  Program: [],
  studentsData: [],
  studentsHours: [],
  getStudentHoursLoading: false,
  totalStudents: 0,
  allStudentStatus: [],
};

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addDeleteId: (state, action) => {
      state.deleteStudentIds = [...state.deleteStudentIds, action.payload];
    },

    updataCount: (state) => {
      (state.totalStudents = 0),
        state.studentsDataList.forEach((student) => {
          state.totalStudents += 1;

        });
    },

    refreshAllProgram: (state) => {
      const currentProgram = [
        ...new Set(
          state.studentsDataList
            .map((program) => program.program && program.program.toLowerCase())
            .filter((program) => program)
        ),
      ];

      const currentProgramType = [
        ...new Set(
          state.studentsDataList
            .map(
              (program) =>
                program.programType && program.programType.toLowerCase()
            )
            .filter((programType) => programType)
        ),
      ];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllStudentData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStudentData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentsDataList = action.payload.data;
        // console.log(state.studentsDataList);
        state.mentorList = action.payload.mentorList;
      })
      .addCase(getAllStudentData.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(addStudent.pending, (state) => {
        state.addStudentLoading = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.addStudentLoading = false;
        state.studentsDataList = [
          ...state.studentsDataList,
          action.payload.data,
        ];
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.addStudentLoading = false;
      })

      .addCase(deleteStudent.pending, (state) => {
        state.deleteStudentLoading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.deleteStudentLoading = false;
        state.studentsDataList = state.studentsDataList.filter(
          (student) => student.id !== action.payload
        );
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.deleteStudentLoading = false;
      })

      .addCase(updataStudent.pending, (state) => {
        state.updateStudentLoading = true;
      })
      .addCase(updataStudent.fulfilled, (state, action) => {
        state.updateStudentLoading = false;
        console.log(action.payload.data);
        
        state.studentsDataList = state.studentsDataList.map((student) =>
          parseInt(student.id) === parseInt(action.payload.data.id)
            ? action.payload.data
            : student
        );
      })
      .addCase(updataStudent.rejected, (state, action) => {
        state.updateStudentLoading = false;
      })

      // get hours
      .addCase(getStudentHours.pending, (state) => {
        state.getStudentHoursLoading = true;
      })
      .addCase(getStudentHours.fulfilled, (state, action) => {
        state.getStudentHoursLoading = false;
        state.studentsHours = action.payload.data;
      })
      .addCase(getStudentHours.rejected, (state, action) => {
        state.getStudentHoursLoading = false;
      })

      // get studentcount data
      .addCase(getStudentCounts.pending, (state) => {
        state.getStudentCountsLoading = true;
      })
      .addCase(getStudentCounts.fulfilled, (state, action) => {
        state.getStudentCountsLoading = false;
        state.studentsData = action.payload.programTypeCounts;
        // console.log(action.payload);
        const { ActiveStudent, completedStudent, discontinueStudent } =
          action.payload;
        state.allStudentStatus = [
          { feild: "Active", count: ActiveStudent },
          { feild: "completed", count: completedStudent },
          { feild: "discontinue", count: discontinueStudent },
        ];
      })
      .addCase(getStudentCounts.rejected, (state, action) => {
        state.getStudentCountsLoading = false;
      });
  },
});

export const studentsState = (state) => state.studentsSlice;
export const { addDeleteId, updataCount, refreshAllProgram } =
  studentsSlice.actions;
export default studentsSlice.reducer;
