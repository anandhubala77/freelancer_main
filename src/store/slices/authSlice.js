import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../services/base_url"; // Adjust the path as needed

// Set the base URL for Axios globally
axios.defaults.baseURL = base_url;

// Async thunk to login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post("/user/login", credentials);

      const { jwt_Token, user_data } = res.data;

      const userToStore = user_data === undefined ? null : user_data;

      sessionStorage.setItem("token", jwt_Token);
      sessionStorage.setItem("user", JSON.stringify(userToStore));

      return { token: jwt_Token, user: userToStore };
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || "Login failed", error);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// NEW: Async Thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token'); // Get token from sessionStorage
      if (!token) {
        return rejectWithValue('No authentication token found.');
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      // Adjust the endpoint if your backend uses a different one for updating user profiles
      const { data } = await axios.put("/user/profile", profileData, config);

      // Assuming your backend returns the updated user object or similar data
      const updatedUser = data.user_data || data; // Adjust this based on your API response structure

      // Update sessionStorage with the new user data
      sessionStorage.setItem('user', JSON.stringify(updatedUser));

      return updatedUser; // Return the updated user data
    } catch (error) {
      console.error("Update profile error:", error.response?.data?.message || "Failed to update profile", error);
      return rejectWithValue(error.response?.data?.message || "Failed to update profile.");
    }
  }
);

// NEW: Async Thunk for changing user password
export const changeUserPassword = createAsyncThunk(
  'auth/changeUserPassword',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token'); // Get token from sessionStorage
      if (!token) {
        return rejectWithValue('No authentication token found.');
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      // Adjust the endpoint if your backend uses a different one for changing passwords
      const { data } = await axios.put("/user/password", { currentPassword, newPassword }, config);
      return data; // Assuming your API returns a success message or confirmation
    } catch (error) {
      console.error("Change password error:", error.response?.data?.message || "Failed to change password", error);
      return rejectWithValue(error.response?.data?.message || "Failed to change password.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem("token") || null,
    user: sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      sessionStorage.clear(); // Clears all items from sessionStorage
    },
    initializeAuth: (state) => {
      const token = sessionStorage.getItem("token");
      const user = sessionStorage.getItem("user");

      if (token && user) {
        state.token = token;
        state.user = JSON.parse(user);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Existing loginUser reducers
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // NEW: updateUserProfile reducers
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Set user directly with the updated payload
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // NEW: changeUserPassword reducers
      .addCase(changeUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.loading = false;
        // Password change typically doesn't return user data, just success
        // You might want to clear password fields in the component after success
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;