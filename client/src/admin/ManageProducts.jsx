// Imports
import { useEffect, useState } from 'react'
import './ManageProducts.css'

const ManageProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [message, setMessage] = useState('')

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch('http://localhost:10000/api/products')
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.error('❌ Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      const res = await fetch(`http://localhost:10000/api/products/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setMessage('✅ Product deleted')
        fetchProducts()
      } else {
        setMessage('❌ Failed to delete product')
      }
    } catch (err) {
      console.error('❌ Error:', err)
    }
  }

  // Handle edit submit
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!editingProduct) return

    try {
      const res = await fetch(
        `http://localhost:10000/api/products/${editingProduct.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingProduct)
        }
      )

      if (res.ok) {
        setMessage('✅ Product updated')
        setEditingProduct(null)
        fetchProducts()
      } else {
        setMessage('❌ Failed to update product')
      }
    } catch (err) {
      console.error('❌ Error:', err)
    }
  }

  // Load products on mount
  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) return <p>Loading products...</p>

  return (
    <div className="manage-products-wrapper">
      <h2>Manage Products</h2>
      {message && <p className="status-message">{message}</p>}

      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editingProduct?.id === product.id ? (
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value
                      })
                    }
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editingProduct?.id === product.id ? (
                  <input
                    type="text"
                    value={editingProduct.category || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value
                      })
                    }
                  />
                ) : (
                  product.category
                )}
              </td>
              <td>
                {editingProduct?.id === product.id ? (
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: parseFloat(e.target.value)
                      })
                    }
                  />
                ) : (
                  `$${product.price.toFixed(2)}`
                )}
              </td>
              <td>
                {editingProduct?.id === product.id ? (
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: parseInt(e.target.value)
                      })
                    }
                  />
                ) : (
                  product.stock
                )}
              </td>
              <td>
                {editingProduct?.id === product.id ? (
                  <>
                    <button onClick={handleEditSubmit}>Save</button>
                    <button onClick={() => setEditingProduct(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingProduct(product)}>Edit</button>
                    <button onClick={() => deleteProduct(product.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageProducts


