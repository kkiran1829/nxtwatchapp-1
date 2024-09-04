import ThemeContext from '../../context/ThemeContext'

import {
  GameLink,
  GamingList,
  GamingThumbNailImages,
  GamingSection,
  GamingTitle,
  GamingDateAndViews,
} from './styledComponents'

const GamingVideoCard = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, viewCount} = videoDetails

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const textColor = isDark ? '#f9f9f9' : '#231f20'

        return (
          <GameLink to={`/videos/${id}`} className="link">
            <GamingList>
              <GamingThumbNailImages src={thumbnailUrl} alt="video thumbnail" />
              <GamingSection>
                <GamingTitle color={textColor}>{title}</GamingTitle>
                <GamingDateAndViews color={textColor}>
                  {viewCount} Watching Worldwide
                </GamingDateAndViews>
              </GamingSection>
            </GamingList>
          </GameLink>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default GamingVideoCard
