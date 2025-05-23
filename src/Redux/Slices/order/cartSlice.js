import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../axioInstance';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/cart/${userId}/`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ userId, productId, quantity }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/cart/add/', {
      user_id: userId,
      product_id: productId,
      quantity
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ itemId, quantity }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put(`/cart/item/${itemId}/update/`, { quantity });
    return { ...res.data, itemId };
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Thunk: Remove from cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (itemId, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/cart/item/${itemId}/remove/`);
    return itemId;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Thunk: Clear cart
export const clearCart = createAsyncThunk('cart/clearCart', async (userId, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/cart/clear/${userId}/`);
    return [];
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});
// Inside src/redux/slices/cartSlice.js

export const checkoutCart = createAsyncThunk('cart/checkoutCart', async ({ userId, cooperativeId }, { rejectWithValue }) => {
  try {
    const payload = { user_id: userId };
    if (cooperativeId) payload.cooperative_id = cooperativeId;

    const res = await axiosInstance.post('/cart/checkout/', payload);
    return res.data;  // Expected to contain { message, order: {...} }
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total_price: 0,
    total_items: 0,
    loading: false,
    error: null,
    checkoutStatus: null,
    lastOrder: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total_price = action.payload.total_price;
        state.total_items = action.payload.total_items;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.fulfilled, (state) => {
        // Optionally refresh in the component with fetchCart
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update Cart Item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const item = state.items.find(i => i.id === action.payload.itemId);
        if (item) {
          item.quantity = action.payload.item_quantity;
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Remove from Cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Clear Cart
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.total_price = 0;
        state.total_items = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Checkout
      .addCase(checkoutCart.pending, (state) => {
        state.loading = true;
        state.checkoutStatus = null;
        state.error = null;
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutStatus = 'success';
        state.lastOrder = action.payload.order;
        state.items = [];
        state.total_price = 0;
        state.total_items = 0;
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.loading = false;
        state.checkoutStatus = 'failed';
        state.error = action.payload;
      });
  }
});

export default cartSlice.reducer;