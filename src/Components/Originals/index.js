import {Component} from 'react'
import Cookies from 'js-cookie'
import LoaderView from '../Loader'
import FailureView from '../FailureView'
import SliderView from '../SliderView'

const status = {
  failure: 'failure',
  success: 'success',
  inProgress: 'inProgress',
}

class Originals extends Component {
  state = {TrendingNowMoviesList: [], TrendingNowMoviesStatus: ''}

  componentDidMount() {
    this.getTrendingMoviesList()
  }

  reloadTrendingNow = () => {
    this.getTrendingMoviesList()
  }

  getTrendingMoviesList = async () => {
    this.setState({TrendingNowMoviesStatus: status.inProgress})
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
      const updatedTrendingNowMovieList = data.results.map(a => ({
        backdropPath: a.backdrop_path,
        id: a.id,
        overview: a.overview,
        posterPath: a.poster_path,
        title: a.title,
      }))
      this.setState({
        TrendingNowMoviesStatus: status.success,
        TrendingNowMoviesList: updatedTrendingNowMovieList,
      })
    } else {
      this.setState({
        TrendingNowMoviesStatus: status.failure,
      })
    }
  }

  getTrendingNowListView = () => {
    const {TrendingNowMoviesStatus, TrendingNowMoviesList} = this.state
    switch (TrendingNowMoviesStatus) {
      case status.success:
        return (
          <div>
            <h1 className="home_heading">Originals</h1>
            <SliderView moviesList={TrendingNowMoviesList} />
          </div>
        )
      case status.inProgress:
        return (
          <div className="home_bottom_card_view">
            <LoaderView />
          </div>
        )
      case status.failure:
        return (
          <div className="home_bottom_card_view">
            <FailureView retry={this.reloadTrendingNow} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return <div className="slider_card">{this.getTrendingNowListView()}</div>
  }
}

export default Originals
