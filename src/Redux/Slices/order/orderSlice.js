// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../axioInstance';
// import axios from 'axios';
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// // Thunks for async actions
// export const createOrder = createAsyncThunk('orders/createOrder', async (orderData, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post(`/create`, orderData);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || 'Failed to create order');
//   }
// });

// export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/v1/orderss/`);
//       console.log('API response:', response.data); // Debug log
//       return response.data;
//     } catch (error) {
//       console.error('Fetch orders error:', error.response); // Debug log
//       return rejectWithValue(error.response?.data || 'Failed to fetch orders');
//     }
//   });
//   export const fetchCooperativeOrders = createAsyncThunk(
//     'orders/fetchCooperativeOrders',
//     async (cooperativeId, { rejectWithValue }) => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/v1/orderss/`, {
//           params: { cooperative: cooperativeId },
//         });
//         return response.data;
//       } catch (error) {
//         return rejectWithValue(error.response?.data || 'Failed to fetch cooperative orders');
//       }
//     }
//   );

// export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async (orderId, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/api/v1/orders/${orderId}`);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || 'Failed to fetch order');
//   }
// });

// export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus', async ({ id, status }, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.patch(`/orders/update/${id}/`, { status });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || 'Failed to update order status');
//   }
// });

// // Orders slice
// const ordersSlice = createSlice({
//   name: 'orders',
//   initialState: {
//     cooperativeOrders: [],
//     orders: [],
//     order: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Create Order
//       .addCase(createOrder.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createOrder.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders.push(action.payload);
//       })
//       .addCase(createOrder.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Fetch Orders
//       .addCase(fetchOrders.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders = action.payload;
//       })
//       .addCase(fetchOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Fetch Order by ID
//       .addCase(fetchOrderById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrderById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.order = action.payload;
//       })
//       .addCase(fetchOrderById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Update Order Status
//       .addCase(updateOrderStatus.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateOrderStatus.fulfilled, (state, action) => {
//         state.loading = false;
//         // Optionally update the status in the `orders` array if needed
//       })
//       .addCase(updateOrderStatus.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchCooperativeOrders.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCooperativeOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cooperativeOrders = action.payload;
//       })
//       .addCase(fetchCooperativeOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
      
//   },
// });

// export default ordersSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Thunks for async actions
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/orders/create/`, orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create order');
    }
  }
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/orders/`);
      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Fetch orders error:', error.response);
      return rejectWithValue(error.response?.data || 'Failed to fetch orders');
    }
  }
);

export const fetchCooperativeOrders = createAsyncThunk(
  'orders/fetchCooperativeOrders',
  async (cooperativeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/orderss/${cooperativeId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch cooperative orders');
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/orders/${orderId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch order');
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/api/v1/orders/update/${id}/`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update order status');
    }
  }
);

// Orders slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    cooperativeOrders: [],
    orders: [],
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Cooperative Orders
      .addCase(fetchCooperativeOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCooperativeOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.cooperativeOrders = action.payload;
      })
      .addCase(fetchCooperativeOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update the status in the `orders` array if needed
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
