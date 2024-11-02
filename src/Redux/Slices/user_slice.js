// Slice: user_slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/register/`, userData);
      console.log('Signup successful:', response.data);  // Debugging
      return response.data;
    } catch (error) {
      console.log('Signup error:', error.response?.data);  // Debugging
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: 'Something went wrong. Please try again.' });
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    isRegistered: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRegistered = true;
        console.log('Fulfilled payload:', action.payload);  // Debugging
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isRegistered = false;
        state.error = action.payload;
        console.log('Rejected payload:', action.payload);  // Debugging
      });
  },
});

export default userSlice.reducer;
