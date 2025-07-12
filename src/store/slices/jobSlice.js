import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { base_url } from "../../services/base_url";

axios.defaults.baseURL = base_url;

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    list: [],
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
        state.list = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default jobSlice.reducer;
