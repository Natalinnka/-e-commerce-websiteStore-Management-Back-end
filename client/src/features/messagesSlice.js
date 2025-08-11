// client/src/features/messagesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// POST new message (for public site contact form)
export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ name, email, message }, thunkAPI) => {
    try {
      const res = await fetch('http://localhost:10000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to send message')
      }
      return await res.json()
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    lastMessage: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false
        state.lastMessage = action.payload
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to send message'
      })
  }
})

export default messagesSlice.reducer


