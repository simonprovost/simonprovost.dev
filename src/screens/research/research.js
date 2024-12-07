import React from "react";
import PropTypes from "prop-types";
import AcademiaHeader from "../../components/academiaHeader/academiaHeader";
import PostList from "../../components/postList/postList";
import researchConfig from "../../configs/researchConfig";
import "./research.css";

class Research extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      media: null,
    };
  }

  updateMedia = (media) => {
    this.setState({ media });
  };

  handlePostClick = (url) => {
    if (url) {
      window.open(url, "_self");
    }
  };

  handleCompassClick = () => {
    window.open("/", "_self");
  };

  render() {
    const { showTitle, posts } = this.props;
    const { media } = this.state;

    return (
      <div className="research__container">
        <div className="research__header-and-content-container">
          <div className="research__header-and-content">
            <AcademiaHeader
              name="Research"
              positions={[]}
              tabs={[]}
              showInfo={false}
              showTabs={false}
              showTitle={showTitle}
              onCompassClick={this.handleCompassClick}
              onTabClick={() => {}}
              positionIndex={0}
              snakeEffectProps={{
                duration: 0.3,
                delayIncrement: 0.08,
                initialDelayRatio: 1,
              }}
            />
            <div className="research__content-container">
              <PostList
                posts={posts}
                onPostHover={this.updateMedia}
                positionIndex={1}
                snakeEffectProps={{
                  duration: 0.5,
                  delayIncrement: 0.1,
                  initialDelayRatio: 0.2,
                }}
              />
            </div>
          </div>
        </div>
        <div className="research__media-preview-container">
          {media && (
            <div
              className={`research__media-preview ${
                media.aspect === "portrait" ? "portrait" : "landscape"
              }`}
            >
              {media.type === "image" ? (
                <img
                  src={media.src}
                  alt="Preview"
                  className="research__media-content"
                />
              ) : (
                <video
                  src={media.src}
                  className="research__media-content"
                  autoPlay
                  muted
                  loop
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Research.propTypes = {
  showTitle: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
      media: PropTypes.shape({
        type: PropTypes.oneOf(["image", "video"]).isRequired,
        src: PropTypes.string.isRequired,
      }),
      url: PropTypes.string,
    })
  ).isRequired,
};

Research.defaultProps = {
  ...researchConfig,
};

export default Research;
