import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../services/base_url";

// Set base URL for Axios
axios.defaults.baseURL = base_url;

// Async thunk to fetch all jobs
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ Only return the projects array; ignore pagination
      return response.data?.projects || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create job slice
const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    list: [],       // Job list array
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // ✅ Array of jobs
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch jobs";
      });
  },
});

export default jobSlice.reducer;
