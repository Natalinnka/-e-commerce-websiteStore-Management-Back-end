// Imports
import { useState } from 'react'
import AddProduct from './AddProduct'
import ManageProducts from './ManageProducts'
import Orders from './Orders'
import Messages from './Messages'
import './dashboard.css' 

const Dashboard = () => {
  // Track active tab
  const [activeTab, setActiveTab] = useState('add')

  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">Admin Dashboard</h1>

      {/* Navigation tabs */}
      <div className="admin-tabs">
        <button
          className={activeTab === 'add' ? 'active' : ''}
          onClick={() => setActiveTab('add')}
        >
          ➕ Add Product
        </button>
        <button
          className={activeTab === 'manage' ? 'active' : ''}
          onClick={() => setActiveTab('manage')}
        >
          📝 Manage Products
        </button>
        <button
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          📦 Orders
        </button>
        <button
          className={activeTab === 'messages' ? 'active' : ''}
          onClick={() => setActiveTab('messages')}
        >
          ✉️ Messages
        </button>
      </div>

      {/* Content area */}
      <div className="admin-content">
        {activeTab === 'add' && <AddProduct />}
        {activeTab === 'manage' && <ManageProducts />}
        {activeTab === 'orders' && <Orders />}
        {activeTab === 'messages' && <Messages />}
      </div>
    </div>
  )
}

export default Dashboard



