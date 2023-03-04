import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaPlay} from 'react-icons/fa'
import {BiInfoCircle} from 'react-icons/bi'
import LoaderView from '../Loader'
import FailureView from '../FailureView'
import Header from '../Header'
import TrendingNow from '../TrendingNow'
import Originals from '../Originals'
import TopRated from '../TopRated'
import Footer from '../Footer'
import './index.css'

const status = {
  failure: 'failure',
  success: 'success',
  inProgress: 'inProgress',
}

class Home extends Component {
  state = {posterObject: [], posterObjectStatus: ''}

  componentDidMount() {
    this.getPosterObject()
  }

  reloadPosterCard = () => {
    this.getPosterObject()
  }

  getPosterObject = async () => {
    this.setState({posterObjectStatus: status.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
      options,
    )
    const data = await response.json()
    if (response.ok) {
      const randomPosterObject =
        data.results[Math.floor(Math.random() * (data.results.length - 1))]

      const updatedPosterObject = {
        id: randomPosterObject.id,
        backdropPath: randomPosterObject.backdrop_path,
        title: randomPosterObject.title,
        overview: randomPosterObject.overview,
      }
      this.setState({
        posterObjectStatus: status.success,
        posterObject: updatedPosterObject,
      })
    } else {
      this.setState({
        posterObjectStatus: status.failure,
      })
    }
  }

  getPoster = () => {
    const {posterObject, posterObjectStatus} = this.state
    const {title, backdropPath, overview, id} = posterObject

    switch (posterObjectStatus) {
      case status.success:
        return (
          <div
            className="Home_poster"
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${backdropPath})`,

              width: '100vw',
            }}
          >
            <Header />
            <div className="vertical">
              <div className="horizontal">
                <div className="Home_poster_title">{title}</div>
                <div className="Home_poster_overview">{overview}</div>
                <div className="buttons_card">
                  <button type="button" className="watch_button">
                    <FaPlay size={13} /> PLAY
                  </button>
                  <Link to={`/movies/${id}`} className="infoButton">
                    <BiInfoCircle size={18} /> More Info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      case status.inProgress:
        return (
          <div className="Poster_other_views">
            <LoaderView />
          </div>
        )
      case status.failure:
        return (
          <div className="Poster_other_views">
            <FailureView retry={this.reloadPosterCard} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home_container">
        {this.getPoster()}
        <TopRated />
        <TrendingNow />
        <Originals />
        <Footer />
      </div>
    )
  }
}

export default Home
