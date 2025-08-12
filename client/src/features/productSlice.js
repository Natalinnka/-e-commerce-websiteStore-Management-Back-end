import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// Thunk for backend
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const API_URL = import.meta.env.VITE_API_URL || ''
    const url = API_URL ? `${API_URL}/api/products` : '/api/products'
    const res = await fetch(url)
    const data = await res.json()
    return data
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    reduceStock: (state, action) => {
      const item = state.find(p => p.id === action.payload)
      if (item && item.stock > 0) item.stock -= 1
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const { reduceStock } = productSlice.actions
export default productSlice.reducer

