// src/store/slices/adminProjectSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url } from '../../services/base_url';

// Fetch all projects
export const fetchAllProjects = createAsyncThunk(
  'admin/fetchAllProjects',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${base_url}/admin/projects`);
      return res.data; // 👈 fix here
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete a project
export const adminDeleteProject = createAsyncThunk(
  'admin/deleteProject',
  async (projectId, { rejectWithValue }) => {
    try {
      console.log("Deleting project:", projectId); // ✅
      const res = await axios.delete(`${base_url}/admin/projects/${projectId}`);
      return projectId;
    } catch (err) {
      console.error("DELETE Error", err); // ✅
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


const adminProjectsSlice = createSlice({
  name: 'adminProjects',
  initialState: {
    projects: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(adminDeleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(p => p._id !== action.payload);
      });
  }
});

export const selectAdminProjects = (state) => state.adminProjects.projects || [];
export const getAdminProjectsStatus = (state) => state.adminProjects.status;
export const getAdminProjectsError = (state) => state.adminProjects.error;

export default adminProjectsSlice.reducer;
