
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../axioInstance";

// export const fetchCommodityTrend = createAsyncThunk(
//   "commodityTrend/fetchCommodityTrend",
//   async (formData, { rejectWithValue }) => {
//     try {
//       // Send all form data as parameters instead of just commodity, district, year
//       const response = await axiosInstance.get("predictions/trend/", {
//         params: formData, // This will send all form fields
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || "Failed to fetch commodity trend."
//       );
//     }
//   }
// );

// const commodityTrendSlice = createSlice({
//   name: "commodityTrend",
//   initialState: {
//     predictions: [],
//     trend_analysis: null,
//     commodity: "",
//     location: "",
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCommodityTrend.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.predictions = [];
//         state.trend_analysis = null;
//         state.commodity = "";
//         state.location = "";
//       })
//       .addCase(fetchCommodityTrend.fulfilled, (state, action) => {
//         state.loading = false;
//         state.predictions = action.payload.predictions;
//         state.trend_analysis = action.payload.trend_analysis;
//         state.commodity = action.payload.commodity;
//         state.location = action.payload.location;
//       })
//       .addCase(fetchCommodityTrend.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default commodityTrendSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axioInstance";

// ============ THUNKS ============

// 🟦 Trend Prediction Thunk
export const fetchCommodityTrend = createAsyncThunk(
  "commodityTrend/fetchCommodityTrend",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("predictions/trend/", {
        params: formData,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch commodity trend."
      );
    }
  }
);

// 🟨 Price Comparison Thunk
export const comparePricesAcrossLocations = createAsyncThunk(
  "commodityTrend/comparePricesAcrossLocations",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("predictions/compare/", formData);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ============ SLICE ============

const commodityTrendSlice = createSlice({
  name: "commodityTrend",
  initialState: {
    predictions: [],
    trend_analysis: null,
    commodity: "",
    location: "",
    loading: false,
    error: null,

    // NEW: Price Comparison Results
    priceComparison: {
      predictions: [],
      comparison_reports: [],
      insights: {},
      loading: false,
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // 🔹 Commodity Trend Logic
    builder
      .addCase(fetchCommodityTrend.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.predictions = [];
        state.trend_analysis = null;
        state.commodity = "";
        state.location = "";
      })
      .addCase(fetchCommodityTrend.fulfilled, (state, action) => {
        state.loading = false;
        state.predictions = action.payload.predictions;
        state.trend_analysis = action.payload.trend_analysis;
        state.commodity = action.payload.commodity;
        state.location = action.payload.location;
      })
      .addCase(fetchCommodityTrend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 🟨 Price Comparison Logic
    builder
      .addCase(comparePricesAcrossLocations.pending, (state, action) => {
        state.priceComparison.loading = true;
        state.priceComparison.error = null;
        state.priceComparison.predictions = [];
        state.priceComparison.comparison_reports = [];
        state.priceComparison.insights = {};
        // Store the commodity from the request
        state.priceComparison.commodity = action.meta.arg.commodity || "";
      })
      .addCase(comparePricesAcrossLocations.fulfilled, (state, action) => {
        state.priceComparison.loading = false;
        state.priceComparison.predictions = action.payload.predictions;
        state.priceComparison.comparison_reports = action.payload.comparison_reports;
        state.priceComparison.insights = action.payload.insights;
        // Keep the commodity from the request
        state.priceComparison.commodity = action.meta.arg.commodity || "";
      })
      .addCase(comparePricesAcrossLocations.rejected, (state, action) => {
        state.priceComparison.loading = false;
        state.priceComparison.error = action.payload;
      });
  },
});

export default commodityTrendSlice.reducer;
