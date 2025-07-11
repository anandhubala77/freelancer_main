import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch all fraud reports
export const fetchFraudReports = createAsyncThunk(
  "admin/fetchFraudReports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/admin/fraud-reports");
      return response.data; // { projectReports: [], userReports: [] }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Thunk to delete a fraud report
export const deleteFraudReport = createAsyncThunk(
  "admin/deleteFraudReport",
  async ({ type, reportedOnId, reportId }, { rejectWithValue }) => {
    try {
      const url = `/admin/fraud-reports/${type}/${reportedOnId}/${reportId}`;
      await axios.delete(url);
      return { type, reportedOnId, reportId }; // Return for reducer
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

// Slice
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
      // Fetch fraud reports
      .addCase(fetchFraudReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFraudReports.fulfilled, (state, action) => {
        state.loading = false;

        const { projectReports = [], userReports = [] } = action.payload;

        const formattedProjectReports = projectReports.map((r) => ({
          reportId: r._id,
          reportedOnId: r.reportedOnId,
          reportedBy: r.reportedByName || r.reportedBy,
          reason: r.reason,
          createdAt: r.createdAt,
          type: "project", // ✅ ensure lowercase
        }));

        const formattedUserReports = userReports.map((r) => ({
          reportId: r.reportId, 
          reportedOnId: r.reportedOnId,
          reportedBy: r.reportedByName || r.reportedBy,
          reason: r.reason,
          createdAt: r.createdAt,
          type: "user", // ✅ ensure lowercase
        }));

        state.reports = [...formattedProjectReports, ...formattedUserReports];
      })
      .addCase(fetchFraudReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch fraud reports.";
      })

      // Delete report
      .addCase(deleteFraudReport.fulfilled, (state, action) => {
        const { type, reportedOnId, reportId } = action.payload;
        state.reports = state.reports.filter(
          (r) =>
            !(
              r.reportId === reportId &&
              r.reportedOnId === reportedOnId &&
              r.type === type
            )
        );
      })
      .addCase(deleteFraudReport.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete report.";
      });
  },
});

export default adminFraudSlice.reducer;
