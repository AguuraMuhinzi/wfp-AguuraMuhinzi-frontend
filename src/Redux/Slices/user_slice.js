// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// export const signupUser = createAsyncThunk(
//   'user/signupUser',
//   async (userData, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/register/`, userData);
//       dispatch(sendOtp({ email: userData.email }));
//       return { ...response.data, email: userData.email };
//     } catch (error) {
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data);
//       }
//       return rejectWithValue({ message: 'Something went wrong. Please try again.' });
//     }
//   }
// );

// export const sendOtp = createAsyncThunk(
//   'user/sendOtp',
//   async ({ email }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/send-verification-email/`, { email });
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data);
//       }
//       return rejectWithValue({ message: 'Failed to send verification email.' });
//     }
//   }
// );

// export const verifyOtp = createAsyncThunk(
//   'user/verifyOtp',
//   async ({ email, code }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/verify-email/`, { email, code });
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data);
//       }
//       return rejectWithValue({ message: 'Failed to verify OTP.' });
//     }
//   }
// );

// export const login = createAsyncThunk(
//   'user/login',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/login-user/`, { email, password });
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data);
//       }
//       return rejectWithValue({ message: 'Failed to login.' });
//     }
//   }
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     isLoading: false,
//     isRegistered: false,
//     error: null,
//     otpSent: false,
//     successMessage: '',
//     isAuthenticated: false,
//     email: null,
//     userInfo: null,
//     role: null,
//     user: null,
//     accessToken: null,
//     refreshToken: null,
//   },
//   reducers: {
//     // clearSuccessMessage: (state) => {
//       state.successMessage = '';
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.userInfo = null;
//       state.email = null;
//       localStorage.removeItem('userInfo');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signupUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(signupUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isRegistered = true;
//         state.email = action.payload.email;
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       .addCase(sendOtp.fulfilled, (state, action) => {
//         state.otpSent = true;
//         state.successMessage = action.payload.message;
//       })
//       .addCase(sendOtp.rejected, (state, action) => {
//         state.error = action.payload;
//       })
//       .addCase(verifyOtp.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(verifyOtp.fulfilled, (state) => {
//         state.isLoading = false;
//         state.isVerified = true;
//         state.successMessage = "OTP verified successfully!";
//       })
//       .addCase(verifyOtp.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       .addCase(login.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isAuthenticated = true;
//         state.userInfo = action.payload;
//         state.role = action.payload.role;
//         localStorage.setItem('userInfo', JSON.stringify(action.payload));
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isAuthenticated = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearSuccessMessage, logout } = userSlice.actions;
// export default userSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Async thunk for signup
export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/register/`, userData);
      dispatch(sendOtp({ email: userData.email }));
      return { ...response.data, email: userData.email };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: 'Something went wrong. Please try again.' });
    }
  }
);

// Async thunk for OTP sending
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

// Async thunk for OTP verification
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

// Async thunk for login
export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/login-user/`, { email, password });
  
        // Store JWT in localStorage
        const { access, refresh, user } = response.data;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('user_id', user.id);
  
        // Set Axios default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
  
        return response.data; // Return full user data
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: 'Failed to login.' });
      }
    }
  );

  export const getUserById = createAsyncThunk(
    'user/getUserById',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/user/${userId}/`);
        return response.data;  // This will contain user details
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: 'Failed to fetch user details.' });
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
    isAuthenticated: false,
    email: null,
    userInfo: null,
    role: null,
    user: null,
    userId: null,
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = '';
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.email = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      state.userId = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup reducers
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRegistered = true;
        state.email = action.payload.email;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Send OTP reducers
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.otpSent = true;
        state.successMessage = action.payload.message;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.error = action.payload;
      })

      // OTP verification reducers
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
      })

      // Login reducers
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userInfo = action.payload.user;  // Stores user info from the response
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.role = action.payload.user.role;
        state.userId = action.payload.user.id
        console.log("Access Token:", action.payload.access);
        console.log("Refresh Token:", action.payload.refresh);
        console.log("User Info:", action.payload.user);

        // Store tokens and user info in local storage for persistence
        localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
        localStorage.setItem('accessToken', action.payload.access);
        localStorage.setItem('refreshToken', action.payload.refresh);
        localStorage.setItem('user_id', action.payload.user.id);  // Store user_id separately if needed

      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSuccessMessage, logout } = userSlice.actions;
export default userSlice.reducer;
