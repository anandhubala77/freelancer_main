import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Submit a new quotation
export const submitQuotation = createAsyncThunk(
  'quotation/submitQuotation',
  async ({ quoteData, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/quotations',
        quoteData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Fetch all quotations for a specific job
export const fetchQuotations = createAsyncThunk(
  'quotation/fetchQuotations',
  async ({ jobId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5000/quotations/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const quotationSlice = createSlice({
  name: 'quotation',
  initialState: {
    loading: false,
    error: null,
    quotations: [],
    successMessage: null,
  },
  reducers: {
    resetQuotationState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
  builder
    // Submit quotation
    .addCase(submitQuotation.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(submitQuotation.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
    })
    .addCase(submitQuotation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error || 'Submission failed';
    })

    // Fetch quotations
    .addCase(fetchQuotations.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchQuotations.fulfilled, (state, action) => {
      state.loading = false;
      state.quotations = action.payload;
    })
    .addCase(fetchQuotations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error || 'Fetching failed';
    })

    // ✅ Update status
    .addCase(updateQuotationStatus.fulfilled, (state, action) => {
      state.successMessage = action.payload.message;
      const updated = action.payload.updated;
      state.quotations = state.quotations.map((q) =>
        q._id === updated._id ? updated : q
      );
    })
    .addCase(updateQuotationStatus.rejected, (state, action) => {
      state.error = action.payload?.error || 'Update failed';
    });
}

});
export const updateQuotationStatus = createAsyncThunk(
  'quotation/updateQuotationStatus',
  async ({ quotationId, status, token }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/quotations/${quotationId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const { resetQuotationState } = quotationSlice.actions;
export default quotationSlice.reducer;
