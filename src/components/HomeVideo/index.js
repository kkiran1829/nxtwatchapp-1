import {
  NoVideosView,
  NoVideosImage,
  NoVideosHeading,
  NoVideosNote,
  RetryButton,
  VideoCardList,
} from './styledComponents'

import ThemeContext from '../../context/ThemeContext'
import HomeVideoCard from '../HomeVideoCard'

const HomeVideo = props => {
  const {HomeVideos, onRetry} = props
  const videosCount = HomeVideos.length

  const onClickRetry = () => {
    onRetry()
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const headingColor = isDark ? '#f1f5f9' : '#1e293b'
        const noteColor = isDark ? '#e2e8f0' : '#475569'

        return videosCount > 0 ? (
          <VideoCardList>
            {HomeVideos.map(eachVideo => (
              <HomeVideoCard video={eachVideo} key={eachVideo.id} />
            ))}
          </VideoCardList>
        ) : (
          <NoVideosView>
            <NoVideosImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <NoVideosHeading headingColor={headingColor}>
              No Search results found
            </NoVideosHeading>
            <NoVideosNote noteColor={noteColor}>
              Try different keywords or remove search filter
            </NoVideosNote>
            <RetryButton type="button" onClick={onClickRetry}>
              Retry
            </RetryButton>
          </NoVideosView>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default HomeVideo
