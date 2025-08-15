// Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Helper to fetch and safely parse JSON (gives clearer errors)
async function fetchJson(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  const text = await res.text();
  if (!res.ok) {
    // Surface backend errors (or HTML) to the console/thunk
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON response: ${text.slice(0, 200)}`);
  }
}

// Thunk for backend
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    const API_BASE = import.meta.env.VITE_API_URL;
    // Enforce absolute URL to avoid hitting the static site's /api/*
    if (!API_BASE) {
      return rejectWithValue('VITE_API_URL is not defined. Set it on your Static Site and redeploy with Clear build cache.');
    }

    const url = `${API_BASE}/api/products`;
    try {
      const data = await fetchJson(url);
      return data;
    } catch (err) {
      // Log for debugging in the browser console
      console.error('fetchProducts error:', err);
      return rejectWithValue(String(err?.message || err));
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    reduceStock: (state, action) => {
      const item = state.find(p => p.id === action.payload);
      if (item && item.stock > 0) item.stock -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (_state, action) => {
        return action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state
        console.error('fetchProducts rejected:', action.payload || action.error);
        return state;
      });
  },
});

export const { reduceStock } = productSlice.actions;
export default productSlice.reducer;
