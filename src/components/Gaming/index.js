import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {SiYoutubegaming} from 'react-icons/si'

import Header from '../Header'
import NavigationBar from '../NavigationBar'
import ThemeContext from '../../context/ThemeContext'
import FailureView from '../FailureView'
import GamingVideoCard from '../GamingVideoCard'

import {
  Gamingbox,
  GamingTitleIbox,
  GamingVideosTitle,
  GamingVideosList,
  GamingText,
  LoaderBox,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    gamingVideos: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        gamingVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <LoaderBox data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </LoaderBox>
  )

  renderVideosView = () => {
    const {gamingVideos} = this.state
    return (
      <GamingVideosList>
        {gamingVideos.map(eachVideo => (
          <GamingVideoCard key={eachVideo.id} videoDetails={eachVideo} />
        ))}
      </GamingVideosList>
    )
  }

  onRetry = () => {
    this.getVideos()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderGamingVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value

          const bgColor = isDark ? '#0f0f0f' : '#f9f9f9'
          const textColor = isDark ? '#f9f9f9' : '#231f20'

          return (
            <div>
              <Header />
              <NavigationBar />
              <Gamingbox data-testid="gaming" bgColor={bgColor}>
                <GamingVideosTitle>
                  <GamingTitleIbox>
                    <SiYoutubegaming size={35} color="#ff0000" />
                  </GamingTitleIbox>
                  <GamingText color={textColor}>Gaming</GamingText>
                </GamingVideosTitle>
                {this.renderGamingVideos()}
              </Gamingbox>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
