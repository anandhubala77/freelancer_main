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
      const res = await axios.post("/payment/mark-success", paymentDetails);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getReceivedPayments = createAsyncThunk(
  "payment/getReceivedPayments",
  async (freelancerId, thunkAPI) => {
    try {
      const res = await axios.get(`/payment/received/${freelancerId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data || "Failed to fetch");
    }
  }
);
export const getSentPayments = createAsyncThunk(
  "payment/getSentPayments",
  async (hiringPersonId, thunkAPI) => {
    try {
      const res = await axios.get(`/payment/sent/${hiringPersonId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data || "Failed to fetch");
    }
  }
);
// Async Thunk
export const fetchSentPayments = createAsyncThunk(
  "payment/fetchSentPayments",
  async (userId, thunkAPI) => {
    try {
      const res = await axios.get(`/payment/sent/${userId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error");
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
    receivedPayments: [], // ✅ New state
    sentPayments: [],
  },
  reducers: {
    clearPaymentState: (state) => {
      state.loading = false;
      state.orderDetails = null;
      state.successMessage = null;
      state.error = null;
      state.receivedPayments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReceivedPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReceivedPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.receivedPayments = action.payload;
      })
      .addCase(getReceivedPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSentPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSentPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.sentPayments = action.payload;
      })
      .addCase(getSentPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSentPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSentPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.sentPayments = action.payload;
      })
      .addCase(fetchSentPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
