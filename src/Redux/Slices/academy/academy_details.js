
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import axiosInstance from '../../axioInstance';
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// // Async thunk for creating academy details
// export const createAcademyDetails = createAsyncThunk(
//   'academy/createAcademyDetails',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(`academy-details/create/`, data);
//       return response.data;
//     } catch (error) {
//       // Check if there is a token error or another specific message
//       const errorMessage = 
//         error.response?.data?.detail === 'Token is invalid or expired' ? 
//         'Your session has expired. Please log in again.' :
//         error.response?.data?.message || 'Failed to create academy details.';
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// // Async thunk for getting academy details
// export const getAcademyDetails = createAsyncThunk(
//   'academy/getAcademyDetails',
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(`academy-details/${userId}/`);
//       return response.data;
//     } catch (error) {
//       const errorMessage = 
//         error.response?.data?.detail === 'Token is invalid or expired' ? 
//         'Your session has expired. Please log in again.' :
//         error.response?.data?.message || 'Failed to retrieve academy details.';
//       return rejectWithValue(errorMessage);
//     }
//   }
// );
// export const fetchAcademyDetails = createAsyncThunk(
//   'cooperative/fetchAcademyDetails',
//   async (user_id, { rejectWithValue }) => {
//       try {
//           const response = await axios.get(`${API_BASE_URL}/api/v1/academy-details/${user_id}/`);
//           return response.data;
//       } catch (error) {
//           return rejectWithValue(error.response?.data?.message || 'Failed to fetch cooperative details.');
//       }
//   }
// );


// // Async thunk for updating academy details
// export const updateAcademyDetails = createAsyncThunk(
//   'academy/updateAcademyDetails',
//   async ({ userId, data }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.put(`academy-details/${userId}/`, data);
//       return response.data;
//     } catch (error) {
//       const errorMessage = 
//         error.response?.data?.detail === 'Token is invalid or expired' ? 
//         'Your session has expired. Please log in again.' :
//         error.response?.data?.message || 'Failed to update academy details.';
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// const academyDetailsSlice = createSlice({
//   name: 'academy',
//   initialState: {
//     academyDetails: null,
//     isLoading: false,
//     error: null,
//     successMessage: '',
//   },
//   reducers: {
//     clearMessages: (state) => {
//       state.error = null;
//       state.successMessage = '';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create academy details
//       .addCase(createAcademyDetails.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(createAcademyDetails.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.academyDetails = action.payload;
//         state.successMessage = 'Academy details created successfully!';
//       })
//       .addCase(createAcademyDetails.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;  // Set custom error message
//       })

//       // Get academy details
//       .addCase(getAcademyDetails.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(getAcademyDetails.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.academyDetails = action.payload;
//       })
//       .addCase(getAcademyDetails.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;  // Set custom error message
//       })

//       .addCase(fetchAcademyDetails.pending, (state) => {
//           state.isLoading = true;
//           state.error = null;
//       })
//       .addCase(fetchAcademyDetails.fulfilled, (state, action) => {
//           state.isLoading = false;
//           state.academyDetails = action.payload;
//       })
//       .addCase(fetchAcademyDetails.rejected, (state, action) => {
//           state.isLoading = false;
//           state.error = action.payload;
//       })
//       // Update academy details
//       .addCase(updateAcademyDetails.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(updateAcademyDetails.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.academyDetails = action.payload;
//         state.successMessage = 'Academy details updated successfully!';
//       })
//       .addCase(updateAcademyDetails.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;  // Set custom error message
//       });
//   },
// });

// export const { clearMessages } = academyDetailsSlice.actions;
// export default academyDetailsSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axioInstance';

// Async thunk for creating academy details
export const createAcademyDetails = createAsyncThunk(
  'academy/createAcademyDetails',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`academy-details/create/`, data);
      return response.data;
    } catch (error) {
      const errorMessage = 
        error.response?.data?.detail === 'Token is invalid or expired' ? 
        'Your session has expired. Please log in again.' :
        error.response?.data?.message || 'Failed to create academy details.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for getting academy details
// export const getAcademyDetails = createAsyncThunk(
//   'academy/getAcademyDetails',
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(`academy-details/${userId}/`);
//       return response.data;
//     } catch (error) {
//       const errorMessage = 
//         error.response?.data?.detail === 'Token is invalid or expired' ? 
//         'Your session has expired. Please log in again.' :
//         error.response?.data?.message || 'Failed to retrieve academy details.';
//       return rejectWithValue(errorMessage);
//     }
//   }
// );
export const getAcademyDetails = createAsyncThunk(
  'academy/getAcademyDetails',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`academy-details/${userId}/`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null; // No details exist
      }
      const errorMessage = 
        error.response?.data?.detail === 'Token is invalid or expired' ? 
        'Your session has expired. Please log in again.' :
        error.response?.data?.message || 'Failed to retrieve academy details.';
      return rejectWithValue(errorMessage);
    }
  }
);


// Async thunk for updating academy details
export const updateAcademyDetails = createAsyncThunk(
  'academy/updateAcademyDetails',
  async (data, { rejectWithValue }) => {
    try {
      const userId = data.userId || data.user_id || localStorage.getItem('user_id');
      
      // Create a copy of the data object to avoid modifying the original
      const dataToSend = { ...data };
      
      // Remove user_id from the data sent to the API if it exists
      if (dataToSend.user_id) {
        delete dataToSend.user_id;
      }
      
      const response = await axiosInstance.put(`academy-details/${userId}/`, dataToSend);
      return response.data;
    } catch (error) {
      const errorMessage = 
        error.response?.data?.detail === 'Token is invalid or expired' ? 
        'Your session has expired. Please log in again.' :
        error.response?.data?.message || 'Failed to update academy details.';
      return rejectWithValue(errorMessage);
    }
  }
);

const academyDetailsSlice = createSlice({
  name: 'academy',
  initialState: {
    academyDetails: null,
    isLoading: false,
    error: null,
    successMessage: '',
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Create academy details
      .addCase(createAcademyDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAcademyDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.academyDetails = action.payload;
        state.successMessage = 'Academy details created successfully!';
      })
      .addCase(createAcademyDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get academy details
      .addCase(getAcademyDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAcademyDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.academyDetails = action.payload;
      })
      .addCase(getAcademyDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update academy details
      .addCase(updateAcademyDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAcademyDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.academyDetails = action.payload;
        state.successMessage = 'Academy details updated successfully!';
      })
      .addCase(updateAcademyDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = academyDetailsSlice.actions;
export default academyDetailsSlice.reducer;