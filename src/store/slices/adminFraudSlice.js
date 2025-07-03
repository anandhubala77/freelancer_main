// --- adminFraudSlice.js ---
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFraudReports = createAsyncThunk(
  "admin/fetchFraudReports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/admin/fraud-reports");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const adminFraudSlice = createSlice({
  name: "adminFraud",
  initialState: {
    reports: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFraudReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFraudReports.fulfilled, (state, action) => {
        state.loading = false;
        const { projectReports, userReports } = action.payload;

        const formattedProjectReports = projectReports.map((report) => ({
          _id: report.projectId,
          reportedBy: report.reportedBy,
          reason: report.reason,
          createdAt: report.createdAt,
          type: "project",
        }));

        const formattedUserReports = userReports.map((report) => ({
          _id: report.jobseekerId,
          reportedBy: report.reportedBy,
          reason: report.reason,
          createdAt: report.reportedAt,
          type: "user",
        }));

        state.reports = [...formattedProjectReports, ...formattedUserReports];
      })
      .addCase(fetchFraudReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch fraud reports.";
      });
  },
});

export default adminFraudSlice.reducer;