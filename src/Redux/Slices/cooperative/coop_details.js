
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axioInstance';

// CREATE
export const createCooperativeDetails = createAsyncThunk(
  'cooperative/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/cooperative-details/create/`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create cooperative details.');
    }
  }
);

// FETCH
export const fetchCooperativeDetails = createAsyncThunk(
  'cooperative/fetch',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/cooperative-details/${userId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch cooperative details.');
    }
  }
);

// UPDATE
export const updateCooperativeDetails = createAsyncThunk(
  'cooperative/update',
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/cooperative-details/${userId}/`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update cooperative details.');
    }
  }
);

const cooperativeDetailsSlice = createSlice({
  name: 'cooperative',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
    successMessage: '',
  },
  reducers: {
    clearCooperativeMessages(state) {
      state.error = null;
      state.successMessage = '';
    },
  },
  extraReducers: (builder) => {
    // CREATE
    builder
      .addCase(createCooperativeDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCooperativeDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.successMessage = 'Cooperative details created successfully.';
      })
      .addCase(createCooperativeDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // FETCH
    builder
      .addCase(fetchCooperativeDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCooperativeDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCooperativeDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // UPDATE
    builder
      .addCase(updateCooperativeDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCooperativeDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.successMessage = 'Cooperative details updated successfully.';
      })
      .addCase(updateCooperativeDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCooperativeMessages } = cooperativeDetailsSlice.actions;
export default cooperativeDetailsSlice.reducer;
