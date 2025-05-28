import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axioInstance';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Async thunk to create a budget item
export const createBudgetItem = createAsyncThunk(
  'budget/createBudgetItem',
  async (budgetData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('v1/budget/create/', budgetData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create budget item.');
    }
  }
);

// Async thunk to fetch budget items by user
export const fetchBudgetItems = createAsyncThunk(
  'budget/fetchBudgetItems',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`v1/budget/user/${userId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch budget items.');
    }
  }
);

const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    successMessage: ''
  },
  reducers: {
    clearBudgetMessages: (state) => {
      state.error = null;
      state.successMessage = '';
    },
    removeLocalBudgetItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    // Create budget item
    builder
      .addCase(createBudgetItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBudgetItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        state.successMessage = 'Budget item added successfully!';
      })
      .addCase(createBudgetItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Fetch budget items
    builder
      .addCase(fetchBudgetItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBudgetItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchBudgetItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearBudgetMessages, removeLocalBudgetItem } = budgetSlice.actions;
export default budgetSlice.reducer;
