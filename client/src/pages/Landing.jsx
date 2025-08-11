// Imports
import { Link } from 'react-router-dom'
import './Landing.css'
import { useEffect, useState } from 'react'

// Landing component
const Landing = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  // Image slider logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % 5)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Image sources
  const images = [
    '/image/promo1.png',
    '/image/promo2.png',
    '/image/promo3.png',
    '/image/promo4.png',
    '/image/promo5.png'
  ]

  // JSX render
  return (
    <section className="landing-grid">
      
      {/* Image slider */}
      <div className="slider-column">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className={`responsive-image ${activeIndex === index ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Text block */}
      <div className="text-column">
        <h1 className="fancy">NK – Tasteful Like Home</h1>
        <p className="tagline">
          Welcome to NK – your destination for healthy and delicious cakes made with natural ingredients.
        </p>
        <Link to="/shop" className="shop-btn">Go to Shop</Link>
      </div>
    </section>
  )
}

export default Landing




