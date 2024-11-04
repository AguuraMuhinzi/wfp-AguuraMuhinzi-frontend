// // Slice: user_slice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// export const signupUser = createAsyncThunk(
//   'user/signupUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/register/`, userData);
//       console.log('Signup successful:', response.data);  // Debugging
//       return response.data;
//     } catch (error) {
//       console.log('Signup error:', error.response?.data);  // Debugging
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data);
//       }
//       return rejectWithValue({ message: 'Something went wrong. Please try again.' });
//     }
//   }
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     isLoading: false,
//     isRegistered: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(signupUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(signupUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isRegistered = true;
//         console.log('Fulfilled payload:', action.payload);  // Debugging
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isRegistered = false;
//         state.error = action.payload;
//         console.log('Rejected payload:', action.payload);  // Debugging
//       });
//   },
// });

// export default userSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/register/`, userData);
      // Trigger OTP sending after successful signup
      dispatch(sendOtp({ email: userData.email }));
      return { ...response.data, email: userData.email };  // Include email in response
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: 'Something went wrong. Please try again.' });
    }
  }
);

export const sendOtp = createAsyncThunk(
  'user/sendOtp',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/send-verification-email/`, { email });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: 'Failed to send verification email.' });
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'user/verifyOtp',
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/verify-email/`, { email, code });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: 'Failed to verify OTP.' });
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    isRegistered: false,
    error: null,
    otpSent: false,
    successMessage: '',
    email: null, // Store email in state
  },
  reducers: {
    clearSuccessMessage: (state) => {
        state.successMessage = '';
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRegistered = true;
        state.email = action.payload.email;  // Save email on successful signup
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.otpSent = true;
        state.successMessage = action.payload.message;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isLoading = false;
        state.isVerified = true;
        state.successMessage = "OTP verified successfully!";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { clearSuccessMessage } = userSlice.actions;
export default userSlice.reducer;
