import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// Thunk for backend
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch('http://localhost:10000/api/products')
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

