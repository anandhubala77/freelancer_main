// src/features/projects/projectsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // We'll use axios for API calls
import { base_url } from "../../services/base_url";



// Helper to get token from sessionStorage (assuming you store it there after login)

export const getToken = () => {
  const user = sessionStorage.getItem("user");
  if (user) {
    const parsed = JSON.parse(user);
    console.log("getToken: Extracted token from user object:", parsed.token);
    return parsed.token;
  }
  console.warn("getToken: No user found in sessionStorage.");
  return null;
};

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (newProjectData, { rejectWithValue }) => {
    try {
      console.log('createProject Thunk: Starting execution.');
      const token = getToken();

      if (!token) {
        console.warn('createProject Thunk: NO TOKEN FOUND. Rejecting with value.');
        return rejectWithValue('No token found. Please log in.');
      }

      console.log('createProject Thunk: Token found, proceeding with API call setup.');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };

      console.log('createProject Thunk: Attempting axios.post to URL:', `${base_url}/projects`);
      console.log('createProject Thunk: Payload being sent:', newProjectData);
      console.log('createProject Thunk: Axios config:', config);

      const response = await axios.post(`${base_url}/projects`, newProjectData, config);

      console.log('createProject Thunk: Axios POST successful, response data:', response.data);
      return response.data.project;


    } catch (error) {
      console.error('createProject Thunk: Error during API call or processing:', error.response?.data || error.message);
      // Log the full error object if available for more details
      if (error.response) {
          console.error("Error Response Status:", error.response.status);
          console.error("Error Response Headers:", error.response.headers);
          console.error("Error Response Data:", error.response.data);
      } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received. Request:", error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
      }
      return rejectWithValue(error.response?.data?.message || error.message || 'An unknown error occurred.');
    }
  }
);


// 2. Fetch All Projects
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/projects`);
      return response.data; // Backend returns an array of projects
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch projects';
      return rejectWithValue(message);
    }
  }
);

// 3. Fetch Single Project by ID (useful for editing)
export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/projects/${projectId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch project';
      return rejectWithValue(message);
    }
  }
);

// 4. Update Project
export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ projectId, updatedData }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('No authentication token found.');
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios.put(`${base_url}/projects/${projectId}`, updatedData, config);
      return response.data.project; // Backend returns { message, project }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update project';
      return rejectWithValue(message);
    }
  }
);

// 5. Delete Project
export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('No authentication token found.');
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      await axios.delete(`${base_url}/projects/${projectId}`, config);
      return projectId; // Return the ID so we can remove it from state
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to delete project';
      return rejectWithValue(message);
    }
  }
);
// projectSlice.js

export const reportProject = createAsyncThunk(
  "projects/reportProject",
  async ({ projectId, reason, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `/projects/${projectId}/report`,
        { reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);



// Redux Toolkit Slice
const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    currentProject: null, // For details of a single project, e.g., during editing
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // You can add synchronous reducers here if needed, e.g., to clear errors
    clearProjectStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- Create Project ---
      .addCase(createProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects.push(action.payload); // Add the new project to the list
        state.error = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // --- Fetch All Projects ---
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload; // Replace with fetched projects
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // --- Fetch Project By ID ---
      .addCase(fetchProjectById.pending, (state) => {
        state.status = 'loading';
        state.currentProject = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentProject = action.payload;
        state.error = null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.currentProject = null;
      })

      // --- Update Project ---
      .addCase(updateProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Find and replace the updated project in the array
        const index = state.projects.findIndex(proj => proj._id === action.payload._id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        // If currentProject was the one being updated, update it too
        if (state.currentProject && state.currentProject._id === action.payload._id) {
            state.currentProject = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // --- Delete Project ---
      .addCase(deleteProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the deleted project from the array using its ID
        state.projects = state.projects.filter(proj => proj._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearProjectStatus } = projectsSlice.actions;

export const selectAllProjects = (state) => state.projects.projects;
export const selectCurrentProject = (state) => state.projects.currentProject;
export const getProjectsStatus = (state) => state.projects.status;
export const getProjectsError = (state) => state.projects.error;

export default projectsSlice.reducer;