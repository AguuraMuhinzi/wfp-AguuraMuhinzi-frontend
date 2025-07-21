import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axioInstance';
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// Async thunk for adding a product
export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                `/products/create/`,
                productData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add product.');
        }
    }
);

// Async thunk for listing products
export const listProducts = createAsyncThunk(
    'product/listProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/products/`); // Replace with your actual API base URL if needed
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch products.'
            );
        }
    }
);

// Async thunk for updating a product
export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({ productId, productData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/products/update/${productId}/`,
                productData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update product.');
        }
    }
);

// Async thunk for replenishing stock
export const replenishStock = createAsyncThunk(
    'product/replenishStock',
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/products/replenish/${productId}/replenish-stock/`,
                { quantity },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to replenish stock.');
        }
    }
);

// Add deleteProduct async thunk
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/products/${productId}/delete/`);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete product');
    }
  }
);

// Product slice
const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        status: 'idle',
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add Product
            .addCase(addProduct.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // List Products
            .addCase(listProducts.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(listProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(listProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.payload;
            })

            // Update Product
            .addCase(updateProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.products.findIndex(
                    (product) => product.id === action.payload.id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Replenish Stock
            .addCase(replenishStock.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(replenishStock.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.products.findIndex(
                    (product) => product.id === action.meta.arg.productId
                );
                if (index !== -1) {
                    state.products[index].stock = action.payload.new_stock;
                }
            })
            .addCase(replenishStock.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = state.products.filter(product => product.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
