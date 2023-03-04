import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import LoaderView from '../Loader'
import FailureView from '../FailureView'
import Footer from '../Footer'

import Header from '../Header'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {searchInput: ''}

  searchInputEntered = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchResult = async event => {
    event.preventDefault()
    const {searchInput} = this.state
    this.setState({searchStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`,
      options,
    )

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(product => ({
        backdropPath: product.backdrop_path,
        id: product.id,
        overview: product.overview,
        posterPath: product.poster_path,
        title: product.title,
      }))

      this.setState({
        searchMoviesList: updatedData,
        searchStatus: apiStatus.success,
      })
    }
  }

  successView = () => {
    const {searchMoviesList, searchInput} = this.state
    if (searchMoviesList.length === 0) {
      return (
        <div className="No_movies_found">
          <img
            src="https://res.cloudinary.com/djedlaeqd/image/upload/v1675876061/Group_7394_n2jit7.png"
            alt="no movies"
          />
          <p className="No_movies_found_text">
            Your search for
            <strong className="searchInput_value"> {searchInput}</strong> did
            not find any matches.
          </p>
        </div>
      )
    }
    return (
      <div>
        <ul className="popular_list">
          {searchMoviesList.map(a => (
            <Link to={`/movies/${a.id}`} key={a.id}>
              <li key={a.id}>
                <img className="popular_img" src={a.posterPath} alt={a.title} />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  searchListView = () => {
    const {searchStatus} = this.state
    switch (searchStatus) {
      case apiStatus.success:
        return this.successView()
      case apiStatus.inProgress:
        return (
          <div>
            <LoaderView />
          </div>
        )
      case apiStatus.failure:
        return (
          <div>
            <FailureView retry={this.retrySearchMovieList} />
          </div>
        )

      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="search_container">
        <Header />
        <form
          onSubmit={this.getSearchResult}
          className="search_input_container"
        >
          <input
            value={searchInput}
            onChange={this.searchInputEntered}
            placeholder="Search"
            type="search"
            className="search_input"
          />
          <button className="search_input_button" type="submit">
            <HiOutlineSearch size={20} />
          </button>
        </form>
        <div className="search_middle_card">{this.searchListView()}</div>

        <Footer />
      </div>
    )
  }
}

export default Search
