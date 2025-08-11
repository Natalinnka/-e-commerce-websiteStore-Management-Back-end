import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Navbar.css'

const Navbar = () => {
  const cart = useSelector(state => state.cart)
  const cartCount = Array.isArray(cart)
  ? cart.reduce((total, item) => total + item.quantity, 0)
  : 0

  return (
    <nav className="navbar">
      <div className="logo">
          <NavLink to="/">
             <img src="/image/logo.png" alt="NK Logo" />
          </NavLink>
       </div>

      <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/shop">Shop</NavLink></li>
        <li className="nav-cart">
          <NavLink to="/cart" className="cart-link">
            🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar



