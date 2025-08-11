// src/store.js
import { configureStore } from '@reduxjs/toolkit'
import productReducer from './features/productSlice'
import cartReducer from './features/cartSlice'
import ordersReducer from './features/ordersSlice'
import messagesReducer from './features/messagesSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    orders: ordersReducer,
    messages: messagesReducer
  }
})

