import './About.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendMessage } from '../features/messagesSlice'

// About page component
const About = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('') // ✅ For success/error messages
  const dispatch = useDispatch()

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')

    try {
      await dispatch(sendMessage(formData)).unwrap() // ✅ Send to backend
      setStatus('✅ Message sent successfully!')
      setFormData({ name: '', email: '', message: '' }) // Reset form
    } catch (err) {
      console.error('❌ Failed to send message:', err)
      setStatus('❌ Failed to send message. Please try again.')
    }
  }

  return (
    <section className="about-page">
      {/* Page heading and intro text */}
      <h2>About <span className="highlight">NK</span></h2>
      <p>
        At NK, we believe that desserts should be as wholesome as they are delicious.
        All our cakes, cupcakes, and ceremonial breads are made with love, fresh ingredients,
        and the same care you'd expect from home.
      </p>
      <p>
        Whether you're celebrating a birthday, a wedding, or simply craving a healthy indulgence,
        our baked goods are created to bring joy and comfort with every bite.
      </p>

      {/* Reasons list */}
      <h3>Why Choose NK?</h3>
      <ul className="about-list">
        <li>✅ Natural ingredients only</li>
        <li>✅ Refined sugar–free options</li>
        <li>✅ Handmade with care</li>
        <li>✅ Inspired by healthy eating</li>
      </ul>

      {/* Contact form */}
      <h3>Contact Us</h3>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Send</button>
      </form>

      {/* Status message */}
      {status && <p className="status-message">{status}</p>}

      {/* FAQ section */}
      <h3>FAQ</h3>
      <details>
        <summary>Do you offer gluten-free options?</summary>
        <p>Yes, we have a selection of gluten-free cakes and cupcakes available.</p>
      </details>
      <details>
        <summary>Can I customize my order?</summary>
        <p>Absolutely! We accept custom designs and flavors for all events.</p>
      </details>
      <details>
        <summary>Where do you deliver?</summary>
        <p>We currently deliver across Winnipeg and nearby areas.</p>
      </details>
      <details>
        <summary>How far in advance should I place an order?</summary>
        <p>We recommend placing orders at least 3–5 days in advance.</p>
      </details>
    </section>
  )
}

export default About



