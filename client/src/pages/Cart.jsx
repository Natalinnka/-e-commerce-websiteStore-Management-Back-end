// Cart.jsx
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart, incrementQuantity, decrementQuantity } from '../features/cartSlice'
import { placeOrder } from '../features/ordersSlice' // ✅ Thunk for placing orders
import './Cart.css'
import { useState } from 'react'

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const { loading, error, lastOrder } = useSelector(state => state.orders)
  const dispatch = useDispatch()
  const [showSuccess, setShowSuccess] = useState(false)

  // Calculate total price
  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)

  // Handle order placement
  const handlePurchase = async () => {
    if (cart.length === 0) return

    const buyerName = prompt('Enter your name:')
    if (!buyerName) return

    try {
      // 1️⃣ Dispatch thunk to place order
      const resultAction = await dispatch(placeOrder({ cartItems: cart, buyerName }))

      if (placeOrder.fulfilled.match(resultAction)) {
        // 2️⃣ Clear cart after successful order
        dispatch(clearCart())
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      } else {
        alert('❌ Failed to place order. Please try again.')
      }
    } catch (err) {
      console.error('❌ Error placing order:', err)
      alert('Something went wrong while placing your order.')
    }
  }

  return (
    <section className="cart-page">
      <h2>Your Cart</h2>

      {/* Success message */}
      {showSuccess && (
        <div className="success-message">
          ✅ Your order was placed successfully!
        </div>
      )}

      {/* Error message */}
      {error && <p className="error-message">❌ {error}</p>}

      {/* Empty cart message */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Cart items list */}
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                {/* Product image */}
                <div className="cart-img">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* Product details */}
                <div className="cart-details">
                  <h3 className="cart-title">{item.name}</h3>

                  {/* Quantity and price controls */}
                  <div className="cart-actions">
                    <div className="quantity-controls">
                      <button onClick={() => dispatch(decrementQuantity(item.id))}>−</button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>

                    <p className="cart-price">${(item.price * item.quantity).toFixed(2)}</p>

                    {/* Remove button */}
                    <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Cart summary and checkout */}
          <div className="cart-summary">
            <h3>Total: ${total}</h3>
            <button
              className="purchase-btn"
              onClick={handlePurchase}
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Purchase'}
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default Cart


