// Messages.jsx
import { useEffect, useState } from 'react'
import './Messages.css'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch all messages from backend
  const fetchMessages = async () => {
    try {
      setLoading(true)
      const API_URL = import.meta.env.VITE_API_URL || ''
      const url = API_URL ? `${API_URL}/api/messages` : '/api/messages'
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch messages')
      const data = await res.json()
      setMessages(data)
    } catch (err) {
      console.error('❌ Error fetching messages:', err)
      setError('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  // Delete message by ID
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return

    try {
      const API_URL = import.meta.env.VITE_API_URL || ''
      const url = API_URL ? `${API_URL}/api/messages/${id}` : `/api/messages/${id}`
      const res = await fetch(url, {
        method: 'DELETE'
      })
      if (res.ok) {
        // Remove from local state immediately
        setMessages(prev => prev.filter(msg => msg.id !== id))
      } else {
        alert('❌ Failed to delete message')
      }
    } catch (err) {
      console.error('❌ Error deleting message:', err)
      alert('Something went wrong while deleting the message.')
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  if (loading) return <p>Loading messages...</p>
  if (error) return <p className="status-message">{error}</p>

  return (
    <div className="messages-wrapper">
      <h2>Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        <table className="messages-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Message</th><th>Received</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.id}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td style={{ textAlign: 'left' }}>{msg.message}</td>
                <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(msg.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Messages



