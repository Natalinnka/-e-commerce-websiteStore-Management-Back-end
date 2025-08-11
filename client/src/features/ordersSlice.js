import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Thunk to create an order
export const placeOrder = createAsyncThunk( 'orders/placeOrder',
  async ({ cartItems, buyerName }, thunkAPI) => {
    try {
      // Forming an array of items
      const items = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))

      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      )

      const order = { buyerName, items, total }

      const res = await fetch('http://localhost:10000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      })

      if (!res.ok) throw new Error('Failed to place order')

      return await res.json()
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
    lastOrder: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false
        state.lastOrder = action.payload
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Order failed'
      })
  }
})

export default ordersSlice.reducer

