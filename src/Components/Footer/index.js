import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="Footer_container">
    <div className="footer_icon_container">
      <button className="Footer_icon_button" type="button">
        <FaGoogle />
      </button>
      <button className="Footer_icon_button" type="button">
        <FaTwitter />
      </button>
      <button className="Footer_icon_button" type="button">
        <FaInstagram />
      </button>
      <button className="Footer_icon_button" type="button">
        <FaYoutube />
      </button>
    </div>
    <p className="Contact_us">Contact Us</p>
  </div>
)

export default Footer
