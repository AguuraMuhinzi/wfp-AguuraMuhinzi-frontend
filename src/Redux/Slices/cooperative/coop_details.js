// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../axioInstance';

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// // Async thunk for creating cooperative details
// export const createCooperativeDetails = createAsyncThunk(
//     'cooperative/createCooperativeDetails',
//     async (data, { rejectWithValue }) => {
//         try {
//             const response = await axiosInstance.post(
//                 `/cooperative-details/create/`, 
//                 data,
//                 {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 }
//             );
//             return response.data; 
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to create cooperative details.');
//         }
//     }
// );
// const cooperativeDetailsSlice = createSlice({
//     name: 'cooperative',
//     initialState: {
//         isLoading: false,
//         successMessage: '',
//         error: null,
//     },
//     reducers: {
//         clearMessages: (state) => {
//             state.successMessage = '';
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(createCooperativeDetails.pending, (state) => {
//                 state.isLoading = true;
//                 state.successMessage = '';
//                 state.error = null;
//             })
//             .addCase(createCooperativeDetails.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.successMessage = 'Cooperative details created successfully!';
//                 console.log("Response data:", action.payload);  // Check if document URL is present

//             })
//             .addCase(createCooperativeDetails.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export const { clearMessages } = cooperativeDetailsSlice.actions;
// export default cooperativeDetailsSlice.reducer;





import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import axiosInstance from '../../axioInstance';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Async thunk for creating cooperative details
export const createCooperativeDetails = createAsyncThunk(
    'cooperative/createCooperativeDetails',
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
            return rejectWithValue(error.response?.data?.message || 'Failed to create cooperative details.');
        }
    }
);

// Async thunk for fetching cooperative details
export const fetchCooperativeDetails = createAsyncThunk(
    'cooperative/fetchCooperativeDetails',
    async (user_id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/cooperative-details/${user_id}/`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch cooperative details.');
        }
    }
);

const cooperativeDetailsSlice = createSlice({
    name: 'cooperative',
    initialState: {
        isLoading: false,
        successMessage: '',
        error: null,
        cooperativeDetails: null, 
    },
    reducers: {
        clearMessages: (state) => {
            state.successMessage = '';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Create cooperative details
        builder
            .addCase(createCooperativeDetails.pending, (state) => {
                state.isLoading = true;
                state.successMessage = '';
                state.error = null;
            })
            .addCase(createCooperativeDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = 'Cooperative details created successfully!';
                console.log("Response data:", action.payload);
            })
            .addCase(createCooperativeDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Fetch cooperative details
        builder
            .addCase(fetchCooperativeDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCooperativeDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cooperativeDetails = action.payload;
            })
            .addCase(fetchCooperativeDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearMessages } = cooperativeDetailsSlice.actions;
export default cooperativeDetailsSlice.reducer;
