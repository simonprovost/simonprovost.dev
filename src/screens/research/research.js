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
            selectedPost: null,
        };
    }

    updateSelectedPost = (post) => {
        this.setState({selectedPost: post});
    };

    handleCompassClick = () => {
        window.open("/", "_self");
    };

    render() {
        const {showTitle, posts} = this.props;
        const {selectedPost} = this.state;

        console.log("Selected Post: ", selectedPost);

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
                            onTabClick={() => {
                            }}
                            positionIndex={0}
                            snakeEffectProps={{
                                duration: 0.3,
                                delayIncrement: 0.08,
                                initialDelayRatio: 1,
                            }}
                            customSrc="/rive/head_sub_pages.riv"
                            isSubpage={true}
                        />
                        <div className="research__content-container">
                            <PostList
                                posts={posts}
                                customOnPostHover={this.updateSelectedPost}
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
                {selectedPost && (
                    <div className="research__abstract-preview-container">
                        <div className="research__abstract-preview">
                            <h2 className="research__abstract-title">{selectedPost.titles.join(" ")}</h2>
                            <p className="research__abstract-authors">{selectedPost.authors}</p>
                            <p className="research__abstract-text">{selectedPost.abstract}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

Research.propTypes = {
    showTitle: PropTypes.bool.isRequired,
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            details: PropTypes.arrayOf(PropTypes.string).isRequired,
            url: PropTypes.string,
        })
    ).isRequired,
};

Research.defaultProps = {
    ...researchConfig,
};

export default Research;
