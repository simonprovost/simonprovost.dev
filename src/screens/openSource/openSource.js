import React from "react";
import PropTypes from "prop-types";
import AcademiaHeader from "../../components/academiaHeader/academiaHeader";
import PostList from "../../components/postList/postList";
import openSourceConfig from "../../configs/openSourceConfig";
import "./openSource.css";

class OpenSource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            media: null,
        };
    }

    handleCompassClick = () => {
    };

    updateMedia = (media) => {
        this.setState({media});
    };

    render() {
        const {name, positions, tabs, posts} = this.props;
        const {media} = this.state;

        return (
            <div className="opensource__container">
                <div className="opensource__header-and-content-container">
                    <div className="opensource__header-and-content">
                        <AcademiaHeader
                            name={name}
                            positions={positions}
                            tabs={tabs.map((tab) => tab.name)}
                            onCompassClick={this.handleCompassClick}
                            onTabClick={(tab) => {
                                window.location.href = `/${tab.toLowerCase()}`;
                            }}
                            positionIndex={0}
                            snakeEffectProps={{
                                duration: 0.3,
                                delayIncrement: 0.08,
                                initialDelayRatio: 1,
                            }}
                        />
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
                <div className="opensource__media-preview-container">
                    {media && (
                        <div
                            className={`opensource__media-preview ${
                                media.aspect === "portrait" ? "portrait" : "landscape"
                            }`}
                        >
                            {media.type === "image" ? (
                                <img
                                    src={media.src}
                                    alt="Preview"
                                    className="opensource__media-content"
                                />
                            ) : (
                                <video
                                    src={media.src}
                                    className="opensource__media-content"
                                    autoPlay
                                    muted
                                    loop
                                />
                            )}
                        </div>
                    )}
                </div>
                <div>
                    <a href="/credits" className="opensource__credits-link">
                        Credits
                    </a>
                </div>
            </div>
        );
    }
}

OpenSource.propTypes = {
    name: PropTypes.string.isRequired,
    positions: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            supervisors: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    link: PropTypes.string.isRequired,
                })
            ).isRequired,
            companyName: PropTypes.string.isRequired,
            companyLink: PropTypes.string.isRequired,
        })
    ).isRequired,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
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

OpenSource.defaultProps = {
    ...openSourceConfig,
};

export default OpenSource;
