import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not_found_container">
    <h1 className="not_found_heading">Lost Your Way ?</h1>
    <p className="not_found_paragraph">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="not_found_button" type="button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
