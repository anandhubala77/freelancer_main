import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch all payments for admin
export const fetchAdminPayments = createAsyncThunk(
  "adminPayments/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/payment/admin/all-payments");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error fetching payments");
    }
  }
);

const adminPaymentSlice = createSlice({
  name: "adminPayments",
  initialState: {
    loading: false,
    payments: [],
    error: null,
  },
  reducers: {
    clearAdminPaymentState: (state) => {
      state.loading = false;
      state.payments = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchAdminPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminPaymentState } = adminPaymentSlice.actions;
export default adminPaymentSlice.reducer;
