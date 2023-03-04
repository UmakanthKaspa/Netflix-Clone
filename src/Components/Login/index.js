import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: false,
    errorMsg: '',
  }

  onUsernameEntered = event => {
    this.setState({username: event.target.value})
  }

  onPasswordEntered = event => {
    this.setState({password: event.target.value})
  }

  success = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failure = errorMsg => {
    this.setState({error: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.success(data.jwt_token)
    } else {
      this.failure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login_container">
        <img
          src="https://res.cloudinary.com/djedlaeqd/image/upload/v1675856993/Group_7399_pttm8o.png"
          alt="login website logo"
          className="login_logo"
        />
        <form onSubmit={this.onSubmitForm} className="login_form">
          <h1 className="login_heading">Login</h1>
          <label className="login_username" htmlFor="Username'">
            USERNAME
          </label>
          <input
            value={username}
            className="login_input"
            id="Username"
            type="text"
            placeholder="rahul"
            onChange={this.onUsernameEntered}
          />
          <label className="login_password" htmlFor="Password'">
            PASSWORD
          </label>
          <input
            value={password}
            placeholder="rahul@2021"
            onChange={this.onPasswordEntered}
            className="login_input"
            id="Password"
            type="password"
          />
          {error && <p className="error-msg">*{errorMsg}</p>}
          <button className="login_button" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
