import { useState } from 'react'
import './AddProduct.css'

const AddProduct = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState('')
  const [image, setImage] = useState('')
  const [preview, setPreview] = useState('')
  const [sugarFree, setSugarFree] = useState(false)
  const [noBake, setNoBake] = useState(false)
  const [message, setMessage] = useState('')

  // Categories for dropdown
  const categories = [
    'Cake', 'Cupcake', 'No-Bake', 'Fruit', 'Chocolate'
  ]

  // Update image and preview
  const handleImageChange = (value) => {
    setImage(value)
    if (value.startsWith('http') || value.startsWith('/image/')) {
      setPreview(value)
    } else {
      setPreview('')
    }
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    const newProduct = {
      name,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      image,
      sugarFree,
      noBake
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || ''
      const url = API_URL ? `${API_URL}/api/products` : '/api/products'
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      })

      const data = await res.json()
      console.log('Response:', data)

      if (res.ok) {
        setMessage('✅ Product added successfully!')
        // Reset form
        setName('')
        setPrice('')
        setCategory('')
        setStock('')
        setImage('')
        setPreview('')
        setSugarFree(false)
        setNoBake(false)
      } else {
        setMessage(`❌ Error: ${data.error || 'Failed to add product'}`)
      }
    } catch (err) {
      setMessage('❌ Server error')
    }
  }

  return (
    <div className="add-product-wrapper">
      <form className="add-product-form" onSubmit={handleSubmit}>
        <h2>Add Product</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Image URL or /image/file.jpg"
          value={image}
          onChange={(e) => handleImageChange(e.target.value)}
        />

        {preview && (
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: '150px',
                maxHeight: '120px',
                objectFit: 'cover',
                borderRadius: '8px',
                boxShadow: '0 0 5px rgba(0,0,0,0.2)'
              }}
            />
          </div>
        )}

        <label>
          <input
            type="checkbox"
            checked={sugarFree}
            onChange={() => setSugarFree(!sugarFree)}
          />
          Sugar Free
        </label>

        <label>
          <input
            type="checkbox"
            checked={noBake}
            onChange={() => setNoBake(!noBake)}
          />
          No Bake
        </label>

        <button type="submit">Add Product</button>
        {message && <p className="status-message">{message}</p>}
      </form>
    </div>
  )
}

export default AddProduct
