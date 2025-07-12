import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../services/base_url";

axios.defaults.baseURL = base_url;

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
      return { type, reportedOnId, reportId };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

// Thunk to respond to a fraud report
export const sendReportResponse = createAsyncThunk(
  "admin/sendReportResponse",
  async ({ reportType, reportId, responseMessage }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/admin/respond-report", {
        reportType,
        reportId,
        responseMessage,
      });
      return {
        reportId,
        reportType,
        responseMessage,
        responseAt: new Date().toISOString(),
        message: res.data.message,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to send response"
      );
    }
  }
);

const adminFraudSlice = createSlice({
  name: "adminFraud",
  initialState: {
    reports: [],
    loading: false,
    error: null,
    responseLoading: false,
    responseSuccess: null,
    responseError: null,
  },
  reducers: {
    clearResponseStatus: (state) => {
      state.responseSuccess = null;
      state.responseError = null;
    },
  },
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
          reportId: r.reportId || r._id,
          reportedOnId: r.projectId,
          reportedBy: typeof r.reportedBy === "object" ? r.reportedBy.name : r.reportedBy,
          reason: r.reason,
          createdAt: r.createdAt,
          type: "project",
          responseMessage: r.responseMessage || null,
          responseAt: r.responseAt || null,
          hasResponded: !!r.responseMessage,
        }));
        
        const formattedUserReports = userReports.map((r) => ({
          reportId: r.reportId || r._id,
          reportedOnId: r.jobseekerId,
          reportedBy: typeof r.reportedBy === "object" ? r.reportedBy.name : r.reportedBy,
          reason: r.reason,
          createdAt: r.createdAt,
          type: "user",
          responseMessage: r.responseMessage || null,
          responseAt: r.responseAt || null,
          hasResponded: !!r.responseMessage,
        }));
        

        state.reports = [...formattedProjectReports, ...formattedUserReports];
      })
      .addCase(fetchFraudReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch fraud reports.";
      })

      // Delete fraud report
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
      })

      // Send admin response
      .addCase(sendReportResponse.pending, (state) => {
        state.responseLoading = true;
        state.responseError = null;
        state.responseSuccess = null;
      })
      .addCase(sendReportResponse.fulfilled, (state, action) => {
        state.responseLoading = false;
        state.responseSuccess = action.payload.message;

        const { reportId, responseMessage, responseAt } = action.payload;

        const index = state.reports.findIndex((r) => r.reportId === reportId);
        if (index !== -1) {
          state.reports[index].responseMessage = responseMessage;
          state.reports[index].responseAt = responseAt;
          state.reports[index].hasResponded = true; // ✅ update on send
        }
      })
      .addCase(sendReportResponse.rejected, (state, action) => {
        state.responseLoading = false;
        state.responseError = action.payload;
      });
  },
});

export const { clearResponseStatus } = adminFraudSlice.actions;
export default adminFraudSlice.reducer;
