// features/payment/paymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create Razorpay Order
export const createPaymentOrder = createAsyncThunk(
  "payment/createOrder",
  async ({ amount, jobId, paidTo }, thunkAPI) => {
    try {
      const res = await axios.post("/payment/create-order", {
        amount,
        jobId,
        paidTo,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Mark Payment Success
export const markPaymentSuccess = createAsyncThunk(
  "payment/markSuccess",
  async (paymentDetails, thunkAPI) => {
    try {
      const res = await axios.post("/payments/mark-success", paymentDetails);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    orderDetails: null,
    successMessage: null,
    error: null,
  },
  reducers: {
    clearPaymentState: (state) => {
      state.loading = false;
      state.orderDetails = null;
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(markPaymentSuccess.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
      })
      .addCase(markPaymentSuccess.rejected, (state, action) => {
        state.error = action.payload.message;
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
