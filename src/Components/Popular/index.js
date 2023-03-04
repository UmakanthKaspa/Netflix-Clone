import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import LoaderView from '../Loader'
import FailureView from '../FailureView'
import './index.css'

const statusValues = {
  failure: 'failure',
  success: 'success',
  inProgress: 'inProgress',
}

class Popular extends Component {
  state = {
    popularStatus: '',
    popularList: [],
  }

  componentDidMount() {
    this.getPopularMoviesList()
  }

  retryPopularList = () => {
    this.getPopularMoviesList()
  }

  getPopularMoviesList = async () => {
    this.setState({popularStatus: statusValues.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/popular-movies',
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      const updatedPopularList = data.results.map(a => ({
        backdropPath: a.backdrop_path,
        id: a.id,
        overview: a.overview,
        posterPath: a.poster_path,
        title: a.title,
      }))

      this.setState({
        popularStatus: statusValues.success,
        popularList: updatedPopularList,
      })
    } else {
      this.setState({
        popularStatus: statusValues.failure,
      })
    }
  }

  successView = () => {
    const {popularList} = this.state
    return (
      <div>
        <ul className="popular_list">
          {popularList.map(a => (
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

  getPopularMoviesView = () => {
    const {popularStatus} = this.state
    switch (popularStatus) {
      case statusValues.success:
        return this.successView()
      case statusValues.inProgress:
        return (
          <div>
            <LoaderView />
          </div>
        )
      case statusValues.failure:
        return (
          <div>
            <FailureView retry={this.retryPopularList} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div className="Popular_Container">
        <Header />
        <div className="popular_middle_card">{this.getPopularMoviesView()}</div>

        <Footer />
      </div>
    )
  }
}

export default Popular
