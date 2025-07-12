import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../services/base_url";

axios.defaults.baseURL = base_url;


// 🔐 Helper to get token from sessionStorage
export const getToken = () => {
  const user = sessionStorage.getItem("user");
  if (user) {
    const parsed = JSON.parse(user);
    return parsed.token;
  }
  return null;
};

// ✅ 1. Create Project (with image via FormData)
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (newProjectData, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found. Please log in.");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${base_url}/projects`,
        newProjectData,
        config
      );

      return response.data.project;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "An error occurred."
      );
    }
  }
);

// ✅ 2. Fetch Projects (filtered by user role on backend)
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get(`${base_url}/projects`, { headers });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch projects";
      return rejectWithValue(message);
    }
  }
);

// ✅ 3. Fetch Project by ID
export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/projects/${projectId}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch project";
      return rejectWithValue(message);
    }
  }
);

// ✅ 4. Update Project
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ projectId, updatedData }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No authentication token found.");

      const formData = new FormData();
      for (const key in updatedData) {
        formData.append(key, updatedData[key]);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${base_url}/projects/${projectId}`,
        formData,
        config
      );
      return response.data.project;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update project";
      return rejectWithValue(message);
    }
  }
);

// ✅ 5. Delete Project
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No authentication token found.");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`${base_url}/projects/${projectId}`, config);
      return projectId;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete project";
      return rejectWithValue(message);
    }
  }
);

// ✅ 6. Report Project
export const reportProject = createAsyncThunk(
  "projects/reportProject",
  async ({ projectId, reason, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${base_url}/projects/${projectId}/report`,
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

// ✅ Slice
const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    currentProject: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearProjectStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Create
      .addCase(createProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects.push(action.payload);
        state.error = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // --- Fetch All
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // --- Fetch by ID
      .addCase(fetchProjectById.pending, (state) => {
        state.status = "loading";
        state.currentProject = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProject = action.payload;
        state.error = null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.currentProject = null;
      })

      // --- Update
      .addCase(updateProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.projects.findIndex(
          (proj) => proj._id === action.payload._id
        );
        if (index !== -1) state.projects[index] = action.payload;
        if (
          state.currentProject &&
          state.currentProject._id === action.payload._id
        ) {
          state.currentProject = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // --- Delete
      .addCase(deleteProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = state.projects.filter(
          (proj) => proj._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = "failed";
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
