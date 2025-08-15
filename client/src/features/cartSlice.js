// Imports
import { createSlice } from '@reduxjs/toolkit'

// Cart slice
const cartSlice = createSlice({
  name: 'cart',

  // Initial state
  initialState: [],

  // Reducers
  reducers: {
    // Add item to cart
    addToCart(state, action) {
      const existing = state.find(item => item.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.push({ ...action.payload, quantity: 1 })
      }
    },

    // Remove item by id
    removeFromCart(state, action) {
      return state.filter(item => item.id !== action.payload)
    },

    // Clear all items
    clearCart() {
      return []
    },

    // Increase quantity
    incrementQuantity(state, action) {
      const item = state.find(i => i.id === action.payload)
      if (item && item.quantity < item.stock) {
        item.quantity += 1
      }
    },

    // Decrease quantity or remove
    decrementQuantity(state, action) {
      const item = state.find(i => i.id === action.payload)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          return state.filter(i => i.id !== action.payload)
        }
      }
    }
  }
})

// Export actions
export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity
} = cartSlice.actions

// Export reducer
export default cartSlice.reducer




