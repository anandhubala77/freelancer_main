import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../services/base_url";

axios.defaults.baseURL = base_url;



// Async thunk to login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post("/user/login", credentials);

      const { jwt_Token, user_data } = res.data;

      // --- CRITICAL CHANGE HERE ---
      // Combine the user_data and the token into a single object to be stored
      const userToStore = user_data ? { ...user_data, token: jwt_Token } : null;

      // Store only the combined user object in sessionStorage under the 'user' key
      sessionStorage.setItem("token", jwt_Token);
      sessionStorage.setItem("user", JSON.stringify(userToStore));
      // You can remove this line as the token is now part of the user object
      // sessionStorage.setItem("token", jwt_Token); // <--- YOU CAN REMOVE THIS LINE IF YOU PREFER SINGLE STORAGE

      // Return both for Redux state if your Redux state separates them (which it does)
      return { token: jwt_Token, user: userToStore };
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || "Login failed",
        error
      );
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// NEW: Async Thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      // Retrieve the current user object which should now contain the token
      const currentUserString = sessionStorage.getItem("user");
      const currentUser = currentUserString
        ? JSON.parse(currentUserString)
        : null;
      const token = currentUser?.token; // Get token from the stored user object

      if (!token) {
        return rejectWithValue("No authentication token found. Please log in.");
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put("/user/profile", profileData, config);

      const updatedUserFromBackend = data.user_data || data;

      // --- CRITICAL CHANGE HERE FOR UPDATE ---
      // Preserve the token when updating the user in sessionStorage
      const updatedUserToStore = {
        ...updatedUserFromBackend,
        token: token, // Keep the existing token with the updated user data
      };

      sessionStorage.setItem("user", JSON.stringify(updatedUserToStore));

      return updatedUserToStore; // Return the full updated user data including token for Redux state
    } catch (error) {
      console.error(
        "Update profile error:",
        error.response?.data?.message || "Failed to update profile",
        error
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile."
      );
    }
  }
);

// (The rest of your slice code, including changeUserPassword and extraReducers, remains the same for now)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem("token") || null, // This can now potentially be removed if you only use user.token
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
      // This part is still good if you want to keep 'token' separate in Redux state
      const token = sessionStorage.getItem("token"); // Will get the token from the separate 'token' item (if still used)
      const user = sessionStorage.getItem("user"); // Will get the combined user object

      if (token && user) {
        // Or if (user && JSON.parse(user).token) {
        state.token = token; // This can be replaced with JSON.parse(user).token
        state.user = JSON.parse(user);
      } else if (user) {
        // Handle case where only 'user' is stored with embedded token
        const parsedUser = JSON.parse(user);
        if (parsedUser.token) {
          state.token = parsedUser.token;
          state.user = parsedUser;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Still good, gets from returned payload
        state.user = action.payload.user; // Still good, gets from returned payload (now includes token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ... rest of your extraReducers for updateUserProfile and changeUserPassword
      // The fulfilled case for updateUserProfile might need a slight adjustment:
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // This payload *now includes the token* due to above change
        // If you were storing token separately in Redux state:
        // state.token = action.payload.token;
      });
  },
});

export const { logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
