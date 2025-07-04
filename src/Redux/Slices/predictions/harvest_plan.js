// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../axioInstance';

// // 🔄 Async thunk to fetch harvest planning data
// export const fetchHarvestPlanningSuggestions = createAsyncThunk(
//   'harvest/fetchSuggestions',
//   async (inputData, { rejectWithValue }) => {
//     try {
//       const query = new URLSearchParams(inputData).toString();
//       const res = await axiosInstance.get(`farmer/harvest-planning/?${query}`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// const harvestPlanningSlice = createSlice({
//   name: 'harvestPlanning',
//   initialState: {
//     top_commodities: [],
//     all_commodities: [],
//     location: {},
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearHarvestPlanning: (state) => {
//       state.top_commodities = [];
//       state.all_commodities = [];
//       state.location = {};
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchHarvestPlanningSuggestions.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchHarvestPlanningSuggestions.fulfilled, (state, action) => {
//         state.loading = false;
//         state.top_commodities = action.payload.top_commodities;
//         state.all_commodities = action.payload.all_commodities;
//         state.location = action.payload.location;
//       })
//       .addCase(fetchHarvestPlanningSuggestions.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearHarvestPlanning } = harvestPlanningSlice.actions;
// export default harvestPlanningSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axioInstance";
export const fetchCommodityTrend = createAsyncThunk(
  "commodityTrend/fetchCommodityTrend",
  async ({ commodity, district, year }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("predictions/trend/", {
        params: { commodity, district, year },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch commodity trend."
      );
    }
  }
);

const commodityTrendSlice = createSlice({
  name: "commodityTrend",
  initialState: {
    predictions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommodityTrend.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.predictions = [];
      })
      .addCase(fetchCommodityTrend.fulfilled, (state, action) => {
        state.loading = false;
        state.predictions = action.payload;
      })
      .addCase(fetchCommodityTrend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commodityTrendSlice.reducer;
