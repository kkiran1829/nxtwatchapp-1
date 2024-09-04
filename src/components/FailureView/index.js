import {
  FailureViewImage,
  FailureImg,
  FailureHead,
  FailedTxt,
  RetryButton,
} from './styledComponents'

import ThemeContext from '../../context/ThemeContext'

const FailureView = props => {
  const {onRetry} = props

  const onClickRetry = () => {
    onRetry()
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const headingColor = isDark ? '#f1f5f9' : '#1e293b'
        const noteColor = isDark ? '#e2e8f0' : '#475569'

        const failureImageUrl = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <FailureViewImage>
            <FailureImg src={failureImageUrl} alt="failure view" />
            <FailureHead headingColor={headingColor}>
              Oops! Something Went Wrong
            </FailureHead>
            <FailedTxt noteColor={noteColor}>
              We are having some trouble to complete your request. <br /> Please
              try again later.
            </FailedTxt>
            <RetryButton type="button" onClick={onClickRetry}>
              Retry
            </RetryButton>
          </FailureViewImage>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default FailureView
