import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {ImCross} from 'react-icons/im'
import {HiOutlineSearch} from 'react-icons/hi'

import {MdMenuOpen} from 'react-icons/md'

import './index.css'

class Header extends Component {
  state = {showHideMenu: false, showSearchIcon: true}

  componentDidMount() {
    const {match} = this.props
    const {path} = match
    if (path === '/search') {
      this.setState({showSearchIcon: false})
    } else {
      this.setState({showSearchIcon: true})
    }
  }

  toggleMenu = () => {
    this.setState(prevState => ({showHideMenu: !prevState.showHideMenu}))
  }

  closeMenu = () => {
    this.setState({showHideMenu: false})
  }

  render() {
    const {showHideMenu, showSearchIcon} = this.state

    return (
      <div className="header">
        <Link to="/">
          <img
            className="Header_logo"
            src="https://res.cloudinary.com/djedlaeqd/image/upload/v1675856993/Group_7399_pttm8o.png"
            alt="website logo"
          />
        </Link>
        {showSearchIcon && (
          <Link to="/search">
            <button className="Header_menu_HiOutlineSearch" type="button">
              <HiOutlineSearch size={25} />
            </button>
          </Link>
        )}

        <button className="Header_menu_MdMenuOpen" type="button">
          <MdMenuOpen onClick={this.toggleMenu} size={25} />
        </button>

        {showHideMenu && (
          <ul className="home_options_list">
            <Link to="/">
              <li className="Home_option">Home</li>
            </Link>
            <Link to="/popular">
              <li className="Popular_option">Popular</li>
            </Link>
            <Link to="/account">
              <li className="Account_option">Account</li>
            </Link>

            <button
              onClick={this.closeMenu}
              className="ImCross_option"
              type="button"
            >
              <ImCross size={10} />
            </button>
          </ul>
        )}

        <ul className="home_options_md_list">
          <Link to="/">
            <li className="Home_option_md">Home</li>
          </Link>
          <Link to="/popular">
            <li className="Popular_option_md">Popular</li>
          </Link>
          <Link to="/account">
            <img
              className="profile_img"
              src="https://res.cloudinary.com/djedlaeqd/image/upload/v1675878200/account-avatar_irmhck_evgzsq.png"
              alt="profile"
            />
          </Link>
        </ul>
      </div>
    )
  }
}

export default withRouter(Header)
