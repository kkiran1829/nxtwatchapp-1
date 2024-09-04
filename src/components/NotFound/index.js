import Header from '../Header'
import NavigationBar from '../NavigationBar'
import ThemeContext from '../../context/ThemeContext'
import {
  NotFoundBox,
  NotFoundVideosView,
  NotFoundVideosImage,
  NotFoundVideosHeading,
  NotFoundVideosTxt,
} from './styledComponents'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark} = value
      const bgColor = isDark ? '#181818' : '#f9f9f9'
      const headingColor = isDark ? '#f1f5f9' : '#1e293b'
      const noteColor = isDark ? '#e2e8f0' : '#475569'

      const notFoundImageUrl = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'

      return (
        <>
          <Header />
          <NavigationBar />
          <NotFoundBox bgColor={bgColor}>
            <NotFoundVideosView>
              <NotFoundVideosImage src={notFoundImageUrl} alt="not found" />
              <NotFoundVideosHeading headingColor={headingColor}>
                Page Not Found
              </NotFoundVideosHeading>
              <NotFoundVideosTxt noteColor={noteColor}>
                We are sorry, the page you requested could not be found.
              </NotFoundVideosTxt>
            </NotFoundVideosView>
          </NotFoundBox>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
