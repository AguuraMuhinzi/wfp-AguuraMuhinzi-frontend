import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axioInstance";

// Fetch all generated reports
export const fetchGeneratedReports = createAsyncThunk(
  "reports/fetchGeneratedReports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("reports/generated/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch reports.");
    }
  }
);

// Generate a report by ID
export const generateReport = createAsyncThunk(
  "reports/generateReport",
  async (reportId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`reports/generate/${reportId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Report generation failed.");
    }
  }
);

const reportSlice = createSlice({
  name: "reports",
  initialState: {
    generatedReports: [],
    loading: false,
    error: null,
    currentReport: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeneratedReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGeneratedReports.fulfilled, (state, action) => {
        state.generatedReports = action.payload;
        state.loading = false;
      })
      .addCase(fetchGeneratedReports.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(generateReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.currentReport = action.payload;
        state.loading = false;
      })
      .addCase(generateReport.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default reportSlice.reducer;
