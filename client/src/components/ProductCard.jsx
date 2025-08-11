// Imports
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cartSlice'
import './ProductCard.css'
import { useState } from 'react'

// Product card component
const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { name, image, price, stock, sugarFree, noBake } = product
  const [added, setAdded] = useState(false)

  // Handle add to cart action
  const handleAddToCart = () => {
    dispatch(addToCart(product))
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className={`product-card ${stock === 0 ? 'out-of-stock' : ''}`}>
      {/* Product image and badges */}
      <div style={{ position: 'relative' }}>
        <img src={image} alt={name} />

        {/* Badges overlay */}
        {(sugarFree || noBake) && (
          <div className="badge-overlay">
            <span>
              {sugarFree && 'No Sugar'}
              {sugarFree && noBake && <br />}
              {noBake && 'No Bake'}
            </span>
          </div>
        )}
      </div>

      {/* Product name and price */}
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>

      {/* Stock info */}
      <p className="stock">
        {stock > 0 ? `In stock: ${stock}` : 'Out of stock'}
      </p>

      {/* Add to cart button */}
      <button onClick={handleAddToCart} disabled={stock === 0}>
        Add to Cart
      </button>

      {/* Added confirmation */}
      {added && <p className="added-msg">✅ Added to cart</p>}
    </div>
  )
}

export default ProductCard

