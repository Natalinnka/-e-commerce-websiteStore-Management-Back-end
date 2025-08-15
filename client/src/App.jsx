// Imports
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { fetchProducts } from './features/productSlice'

import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import About from './pages/About'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'
import AddProduct from './admin/AddProduct'
import Dashboard from './admin/dashboard'
import Orders from './admin/Orders'
import Messages from './admin/Messages'
import ManageProducts from './admin/ManageProducts'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />

        {/* Admin */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/messages" element={<Messages />} />
        <Route path="/admin/products" element={<ManageProducts />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App





