import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
const cooperativeDetailsSlice = createSlice({
    name: 'cooperative',
    initialState: {
        isLoading: false,
        successMessage: '',
        error: null,
    },
    reducers: {
        clearMessages: (state) => {
            state.successMessage = '';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCooperativeDetails.pending, (state) => {
                state.isLoading = true;
                state.successMessage = '';
                state.error = null;
            })
            .addCase(createCooperativeDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = 'Cooperative details created successfully!';
                console.log("Response data:", action.payload);  // Check if document URL is present

            })
            .addCase(createCooperativeDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearMessages } = cooperativeDetailsSlice.actions;
export default cooperativeDetailsSlice.reducer;