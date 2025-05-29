// src/Redux/Slices/prediction/predictionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axioInstance';
// POST - Create Prediction
export const createPrediction = createAsyncThunk(
  'prediction/create',
  async (inputData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('predict/', inputData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// GET - List Predictions
export const fetchPredictions = createAsyncThunk(
  'prediction/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('predictions/');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// GET - Get Prediction Detail by ID
export const fetchPredictionById = createAsyncThunk(
  'prediction/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`predictions/${id}/`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const predictionSlice = createSlice({
  name: 'prediction',
  initialState: {
    predictions: [],
    prediction: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Prediction
      .addCase(createPrediction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPrediction.fulfilled, (state, action) => {
        state.loading = false;
        state.prediction = action.payload;
        state.predictions.unshift(action.payload);
      })
      .addCase(createPrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All Predictions
      .addCase(fetchPredictions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPredictions.fulfilled, (state, action) => {
        state.loading = false;
        state.predictions = action.payload;
      })
      .addCase(fetchPredictions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Prediction by ID
      .addCase(fetchPredictionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPredictionById.fulfilled, (state, action) => {
        state.loading = false;
        state.prediction = action.payload;
      })
      .addCase(fetchPredictionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default predictionSlice.reducer;
