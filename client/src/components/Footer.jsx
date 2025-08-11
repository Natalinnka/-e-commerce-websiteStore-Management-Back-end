import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} NK. All rights reserved.</p>
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/image/icons8-facebook.gif" alt="Facebook" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/image/icons8-instagram.gif" alt="Instagram" />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
          <img src="/image/icons8-tiktok.gif" alt="TikTok" />
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
          <img src="/image/icons8-whatsapp.gif" alt="WhatsApp" />
        </a>
      </div>

      {/* Attribution block */}
      <div className="attribution">
        Coded by{' '}
        <a href="https://github.com/Natalinnka" target="_blank" rel="noopener noreferrer">
          Nataliia Shchur
        </a>
      </div>

    </footer>
  )
}

export default Footer

