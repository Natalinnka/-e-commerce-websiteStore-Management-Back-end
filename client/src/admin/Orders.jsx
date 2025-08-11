// Orders.jsx
import { useEffect, useState } from 'react'
import './Orders.css'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true)
      const res = await fetch('http://localhost:10000/api/orders')
      if (!res.ok) throw new Error('Failed to fetch orders')
      const data = await res.json()
      setOrders(data)
    } catch (err) {
      console.error('❌ Error fetching orders:', err)
      setError('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  // Delete order
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return

    try {
      const res = await fetch(`http://localhost:10000/api/orders/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        // Remove order from local state without reloading
        setOrders(prev => prev.filter(order => order.id !== id))
      } else {
        alert('❌ Failed to delete order')
      }
    } catch (err) {
      console.error('❌ Error deleting order:', err)
      alert('Something went wrong while deleting the order.')
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) return <p>Loading orders...</p>
  if (error) return <p className="status-message">{error}</p>

  return (
    <div className="orders-wrapper">
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Items</th><th>Created</th><th>Actions</th> {/* ✅ Added for delete */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.buyerName || order.customerName || 'N/A'}</td>
                <td>${order.total?.toFixed(2) || 0}</td>
                <td>{order.status || 'Pending'}</td>
                <td>
                  {order.items && Array.isArray(order.items) ? (
                    <ul style={{ textAlign: 'left', paddingLeft: '20px', margin: 0 }}>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    '—'
                  )}
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(order.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Orders


