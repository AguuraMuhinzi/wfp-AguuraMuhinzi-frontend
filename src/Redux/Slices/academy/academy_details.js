// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../axioInstance';


// // to create academy details
// export const createAcademyDetails = createAsyncThunk(
//     'academy/createAcademyDetails',
//     async (data, { rejectWithValue }) => {
//       try {
//         const response = await axiosInstance.post(`academy-details/create/`, data);
//         return response.data;
//       } catch (error) {
//         // Check if there is a token error or another specific message
//         const errorMessage = 
//           error.response?.data?.detail === 'Token is invalid or expired' ? 
//           'Your session has expired. Please log in again.' :
//           error.response?.data?.message || 'Failed to create academy details.';
//         return rejectWithValue(errorMessage);
//       }
//     }
//   )
// //  get academy details
// export const getAcademyDetails = createAsyncThunk(
//   'academy/getAcademyDetails',
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(`academy-details/${userId}/`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to retrieve academy details.');
//     }
//   }
// );

// // update academy details
// export const updateAcademyDetails = createAsyncThunk(
//   'academy/updateAcademyDetails',
//   async ({ userId, data }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.put(`/api/academy-details/${userId}/`, data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to update academy details.');
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
//         state.error = action.payload;
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
//         state.error = action.payload;
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
//         state.error = action.payload;
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
      // Check if there is a token error or another specific message
      const errorMessage = 
        error.response?.data?.detail === 'Token is invalid or expired' ? 
        'Your session has expired. Please log in again.' :
        error.response?.data?.message || 'Failed to create academy details.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for getting academy details
export const getAcademyDetails = createAsyncThunk(
  'academy/getAcademyDetails',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`academy-details/${userId}/`);
      return response.data;
    } catch (error) {
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
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`academy-details/${userId}/`, data);
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
        state.error = action.payload;  // Set custom error message
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
        state.error = action.payload;  // Set custom error message
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
        state.error = action.payload;  // Set custom error message
      });
  },
});

export const { clearMessages } = academyDetailsSlice.actions;
export default academyDetailsSlice.reducer;
