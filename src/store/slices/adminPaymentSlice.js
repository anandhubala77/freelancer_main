import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Thunk: Fetch all payments for admin
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

// ✅ Thunk: Delete a payment by ID
export const deletePayment = createAsyncThunk(
  "adminPayments/deletePayment",
  async (paymentId, thunkAPI) => {
    try {
      await axios.delete(`/payment/${paymentId}`);
      return paymentId; // return the ID so we can filter it out in reducer
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Delete failed");
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
      // 🔵 Fetch All Payments
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
      })

      // 🔴 Delete Payment
      .addCase(deletePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        state.payments = state.payments.filter((p) => p._id !== deletedId);
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export actions and reducer
export const { clearAdminPaymentState } = adminPaymentSlice.actions;

export default adminPaymentSlice.reducer;
