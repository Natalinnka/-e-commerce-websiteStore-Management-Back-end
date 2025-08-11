// Imports
import './Shop.css'
import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { useSelector } from 'react-redux'

const Shop = () => {
  // State for products and filters
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('')
  const [loading, setLoading] = useState(true)

  // Fetch lastOrder from Redux orders
  const lastOrder = useSelector(state => state.orders.lastOrder)

  // Fetch products from API with filters and sorting
  const fetchProducts = async () => {
    try {
      setLoading(true)

      // Build query string
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (category && category !== 'All') params.append('category', category)
      if (sort === 'price-asc') params.append('sort', 'price_asc')
      if (sort === 'price-desc') params.append('sort', 'price_desc')

      const response = await fetch(`/api/products?${params.toString()}`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch products on first render and whenever filters change
  useEffect(() => {
    fetchProducts()
  }, [search, category, sort])

  // Refresh products when a new order is placed
  useEffect(() => {
    if (lastOrder) {
      fetchProducts()
    }
    // eslint-disable-next-line
  }, [lastOrder])

  // Generate unique categories for dropdown
  const uniqueCategories = ['All', ...new Set(products.map(p => p.category))]

  // JSX render
  return (
    <div className="shop-wrapper">
      <section className="shop">
        
        {/* Header */}
        <div className="shop-header">
          <h2>Shop Healthy Cakes</h2>
        </div>

        {/* Filters */}
        <div className="filters">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          {/* Sort dropdown */}
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          {/* Category dropdown */}
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Product list */}
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="product-grid">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

export default Shop


