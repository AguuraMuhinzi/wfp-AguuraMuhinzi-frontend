import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axioInstance";

// ============ ASYNC THUNKS ============

// Upload CSV file
export const uploadCSV = createAsyncThunk(
  "priceUpload/uploadCSV",
  async ({ file, overwriteExisting }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('csv_file', file);
      formData.append('overwrite_existing', overwriteExisting);
      // Use the correct backend endpoint and let Axios set Content-Type
      const response = await axiosInstance.post('admin/upload-csv-prices/', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Upload failed');
    }
  }
);

// Fetch reference prices
export const fetchReferencePrices = createAsyncThunk(
  "priceUpload/fetchReferencePrices",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(filters);
      const response = await axiosInstance.get(`admin/reference-prices/?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Search prices
export const searchPrices = createAsyncThunk(
  "priceUpload/searchPrices",
  async (searchParams, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(searchParams);
      const response = await axiosInstance.get(`admin/search-prices/?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Fetch upload history
export const fetchUploadHistory = createAsyncThunk(
  "priceUpload/fetchUploadHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('admin/upload-history/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Download template
export const downloadTemplate = createAsyncThunk(
  "priceUpload/downloadTemplate",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('admin/download-template/', {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'price_template.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Download failed');
    }
  }
);

// ============ SLICE ============

const priceUploadSlice = createSlice({
  name: "priceUpload",
  initialState: {
    // Upload state
    uploadLoading: false,
    uploadSuccess: false,
    uploadError: null,
    uploadData: null,
    
    // Reference prices state
    pricesLoading: false,
    pricesError: null,
    referencePrices: [],
    pricesCount: 0,
    
    // Search state
    searchLoading: false,
    searchError: null,
    searchResults: [],
    
    // Upload history state
    historyLoading: false,
    historyError: null,
    uploadHistory: [],
    
    // Download state
    downloadLoading: false,
    downloadError: null,
    
    // Filters and pagination
    filters: {},
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0
    }
  },
  reducers: {
    // Clear upload state
    clearUploadState: (state) => {
      state.uploadLoading = false;
      state.uploadSuccess = false;
      state.uploadError = null;
      state.uploadData = null;
    },
    
    // Clear search state
    clearSearchState: (state) => {
      state.searchLoading = false;
      state.searchError = null;
      state.searchResults = [];
    },
    
    // Set filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    // Clear filters
    clearFilters: (state) => {
      state.filters = {};
    },
    
    // Set pagination
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    
    // Reset state
    resetState: (state) => {
      state.uploadLoading = false;
      state.uploadSuccess = false;
      state.uploadError = null;
      state.uploadData = null;
      state.pricesLoading = false;
      state.pricesError = null;
      state.referencePrices = [];
      state.pricesCount = 0;
      state.searchLoading = false;
      state.searchError = null;
      state.searchResults = [];
      state.historyLoading = false;
      state.historyError = null;
      state.uploadHistory = [];
      state.downloadLoading = false;
      state.downloadError = null;
      state.filters = {};
      state.pagination = {
        page: 1,
        pageSize: 10,
        total: 0
      };
    }
  },
  extraReducers: (builder) => {
    // Upload CSV
    builder
      .addCase(uploadCSV.pending, (state) => {
        state.uploadLoading = true;
        state.uploadSuccess = false;
        state.uploadError = null;
      })
      .addCase(uploadCSV.fulfilled, (state, action) => {
        state.uploadLoading = false;
        state.uploadSuccess = true;
        state.uploadData = action.payload;
        state.uploadError = null;
      })
      .addCase(uploadCSV.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadSuccess = false;
        state.uploadError = action.payload;
      });

    // Fetch reference prices
    builder
      .addCase(fetchReferencePrices.pending, (state) => {
        state.pricesLoading = true;
        state.pricesError = null;
      })
      .addCase(fetchReferencePrices.fulfilled, (state, action) => {
        state.pricesLoading = false;
        state.referencePrices = action.payload.results || action.payload;
        state.pricesCount = action.payload.count || action.payload.length || 0;
        state.pagination.total = action.payload.count || action.payload.length || 0;
        state.pricesError = null;
      })
      .addCase(fetchReferencePrices.rejected, (state, action) => {
        state.pricesLoading = false;
        state.pricesError = action.payload;
      });

    // Search prices
    builder
      .addCase(searchPrices.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchPrices.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload.results || action.payload;
        state.searchError = null;
      })
      .addCase(searchPrices.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
      });

    // Fetch upload history
    builder
      .addCase(fetchUploadHistory.pending, (state) => {
        state.historyLoading = true;
        state.historyError = null;
      })
      .addCase(fetchUploadHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.uploadHistory = action.payload.results || action.payload;
        state.historyError = null;
      })
      .addCase(fetchUploadHistory.rejected, (state, action) => {
        state.historyLoading = false;
        state.historyError = action.payload;
      });

    // Download template
    builder
      .addCase(downloadTemplate.pending, (state) => {
        state.downloadLoading = true;
        state.downloadError = null;
      })
      .addCase(downloadTemplate.fulfilled, (state) => {
        state.downloadLoading = false;
        state.downloadError = null;
      })
      .addCase(downloadTemplate.rejected, (state, action) => {
        state.downloadLoading = false;
        state.downloadError = action.payload;
      });
  },
});

// Export actions
export const {
  clearUploadState,
  clearSearchState,
  setFilters,
  clearFilters,
  setPagination,
  resetState
} = priceUploadSlice.actions;

// Export selectors
export const selectPriceUpload = (state) => state.priceUpload;
export const selectUploadState = (state) => ({
  loading: state.priceUpload.uploadLoading,
  success: state.priceUpload.uploadSuccess,
  error: state.priceUpload.uploadError,
  data: state.priceUpload.uploadData
});
export const selectReferencePrices = (state) => ({
  loading: state.priceUpload.pricesLoading,
  error: state.priceUpload.pricesError,
  prices: state.priceUpload.referencePrices,
  count: state.priceUpload.pricesCount
});
export const selectSearchState = (state) => ({
  loading: state.priceUpload.searchLoading,
  error: state.priceUpload.searchError,
  results: state.priceUpload.searchResults
});
export const selectUploadHistory = (state) => ({
  loading: state.priceUpload.historyLoading,
  error: state.priceUpload.historyError,
  history: state.priceUpload.uploadHistory
});
export const selectDownloadState = (state) => ({
  loading: state.priceUpload.downloadLoading,
  error: state.priceUpload.downloadError
});

export default priceUploadSlice.reducer; 