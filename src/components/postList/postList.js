import React, {Component, createRef} from "react";
import PropTypes from "prop-types";
import "./postList.css";
import SnakeEffectContainer from "../snakeEffect/snakeEffect";

class PostList extends Component {
    constructor(props) {
        super(props);
        this.hoverSquareRef = createRef();
        this.postListRef = createRef();
        this.state = {
            hoverStyle: {
                width: "0px",
                height: "0px",
                top: "0px",
                left: "0px",
                opacity: 0,
            },
            isMobile: window.innerWidth <= 768,
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
        clearTimeout(this.resizeTimeout);
    }

    handleResize = () => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            const isMobile = window.innerWidth <= 768;
            if (isMobile !== this.state.isMobile) {
                this.setState({isMobile});
            }
        }, 150);
    };

    handleMouseEnter = (e, post) => {
        const {customOnPostHover, onPostHover} = this.props;
        const hoverSquare = this.hoverSquareRef.current;
        const postListRect = this.postListRef.current.getBoundingClientRect();
        const postRect = e.currentTarget.getBoundingClientRect();

        hoverSquare.classList.remove("animate");
        void hoverSquare.offsetWidth;
        hoverSquare.classList.add("animate");

        this.setState({
            hoverStyle: {
                width: `${postRect.width + 10}px`,
                height: `${postRect.height}px`,
                top: `${postRect.top - postListRect.top}px`,
                left: `${postRect.left - 10 - postListRect.left}px`,
                opacity: 1,
            },
        });

        if (customOnPostHover) {
            customOnPostHover(post);
        } else if (onPostHover) {
            onPostHover(post.media);
        }
    };

    handleMouseLeave = () => {
        const {customOnPostHover, onPostHover} = this.props;

        this.setState((prevState) => ({
            hoverStyle: {...prevState.hoverStyle, opacity: 0},
        }));

        if (customOnPostHover) {
            customOnPostHover(null);
        } else if (onPostHover) {
            onPostHover(null);
        }
    };

    handlePostClick = (post) => {
        const {customOnPostClick} = this.props;
        if (customOnPostClick) {
            customOnPostClick(post);
        } else if (post.url) {
            window.open(post.url, "_self");
        }
    };

    render() {
        const {posts, positionIndex = 0, snakeEffectProps = {}} = this.props;
        const {hoverStyle, isMobile} = this.state;

        const {
            duration = 0.2,
            delayIncrement = 0.1,
            initialDelayRatio = 2,
        } = snakeEffectProps;

        const initialDelay = positionIndex * initialDelayRatio;

        return (
            <div className="post__list" ref={this.postListRef}>
                <div
                    ref={this.hoverSquareRef}
                    className="post__hover-square"
                    style={hoverStyle}
                ></div>
                <SnakeEffectContainer
                    duration={duration}
                    delayIncrement={delayIncrement}
                    initialDelay={initialDelay}
                >
                    {posts.map((post, index) => (
                        <div
                            className="post__container"
                            key={index}
                            onMouseEnter={(e) => this.handleMouseEnter(e, post)}
                            onMouseLeave={this.handleMouseLeave}
                            onClick={() => this.handlePostClick(post)}
                        >
                            <a className="post__link">
                                {isMobile ? (
                                    <div className="post__titles">
                                        {post.titles.map((title, idx) => (
                                            <span
                                                className={`post__title ${
                                                    idx === 0 ? "primary" : "subsequent"
                                                }`}
                                                key={idx}
                                            >
                        {title}
                      </span>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="post__titles joined">
                    <span className="post__title">
                      {post.titles.join(" ")}
                    </span>
                                    </div>
                                )}

                                {isMobile ? (
                                    <div className="post__details-container">
                                        {post.details.map((detail, idx) => (
                                            <span
                                                className={`post__details ${
                                                    idx === 0 ? "primary" : "subsequent"
                                                }`}
                                                key={idx}
                                            >
                        {detail}
                      </span>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="post__details-container joined">
                    <span className="post__details">
                      {post.details.join(" ")}
                    </span>
                                    </div>
                                )}
                            </a>
                        </div>
                    ))}
                </SnakeEffectContainer>
            </div>
        );
    }
}

PostList.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            titles: PropTypes.arrayOf(PropTypes.string).isRequired,
            details: PropTypes.arrayOf(PropTypes.string).isRequired,
            media: PropTypes.shape({
                type: PropTypes.oneOf(["image", "video"]).isRequired,
                src: PropTypes.string.isRequired,
            }),
            url: PropTypes.string,
        })
    ).isRequired,
    onPostHover: PropTypes.func,
    customOnPostHover: PropTypes.func,
    positionIndex: PropTypes.number,
    snakeEffectProps: PropTypes.shape({
        duration: PropTypes.number,
        delayIncrement: PropTypes.number,
        initialDelayRatio: PropTypes.number,
    }),
    customOnPostClick: PropTypes.func,
};

export default PostList;
