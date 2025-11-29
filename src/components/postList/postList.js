import React, {Component, createRef} from "react";
import PropTypes from "prop-types";
import TouchAppRoundedIcon from "@mui/icons-material/TouchAppRounded";
import "./postList.css";
import SnakeEffectContainer from "../snakeEffect/snakeEffect";

class PostList extends Component {
    constructor(props) {
        super(props);
        this.hoverSquareRef = createRef();
        this.postListRef = createRef();
        this.postRefs = new Map();
        this.hoverCurrent = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            opacity: 0,
        };
        this.hoverTarget = {...this.hoverCurrent};
        this.animationFrame = null;
        this.handleMotionPreferenceChange = null;
        this.activeHoverBase = {x: 0, y: 0};
        this.activeHoverKey = null;
        if (typeof window !== "undefined" && window.matchMedia) {
            this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
            this.prefersReducedMotion = this.motionQuery.matches;
        } else {
            this.motionQuery = null;
            this.prefersReducedMotion = false;
        }
        this.state = {
            isMobile: window.innerWidth <= 768,
        };
    }

    renderFormattedContent = (text, keyPrefix) => {
        if (typeof text !== "string" || text.length === 0) {
            return text;
        }

        const segments = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

        return segments.map((segment, index) => {
            if (segment.startsWith("**") && segment.endsWith("**")) {
                return (
                    <strong key={`${keyPrefix}-bold-${index}`}>
                        {segment.slice(2, -2)}
                    </strong>
                );
            }

            return (
                <React.Fragment key={`${keyPrefix}-text-${index}`}>
                    {segment}
                </React.Fragment>
            );
        });
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        if (this.motionQuery) {
            this.handleMotionPreferenceChange = (event) => {
                this.prefersReducedMotion = event.matches;
                if (this.prefersReducedMotion) {
                    this.hoverCurrent = {...this.hoverTarget};
                    this.commitHoverStyles();
                    if (this.animationFrame) {
                        cancelAnimationFrame(this.animationFrame);
                        this.animationFrame = null;
                    }
                } else if (this.hoverSquareRef.current && !this.animationFrame) {
                    this.animationFrame = requestAnimationFrame(this.animateHoverSquare);
                }
            };
            if (this.motionQuery.addEventListener) {
                this.motionQuery.addEventListener(
                    "change",
                    this.handleMotionPreferenceChange
                );
            } else if (this.motionQuery.addListener) {
                this.motionQuery.addListener(this.handleMotionPreferenceChange);
            }
        }
        this.syncHoverToCurrentFocus({animate: false});
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
        clearTimeout(this.resizeTimeout);
        if (this.motionQuery && this.handleMotionPreferenceChange) {
            if (this.motionQuery.removeEventListener) {
                this.motionQuery.removeEventListener(
                    "change",
                    this.handleMotionPreferenceChange
                );
            } else if (this.motionQuery.removeListener) {
                this.motionQuery.removeListener(this.handleMotionPreferenceChange);
            }
        }
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    handleResize = () => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            const isMobile = window.innerWidth <= 768;
            if (isMobile !== this.state.isMobile) {
                this.setState({isMobile}, () => {
                    this.syncHoverToCurrentFocus({animate: false});
                });
            } else {
                this.syncHoverToCurrentFocus({animate: false});
            }
        }, 150);
    };

    componentDidUpdate(prevProps) {
        const {lockedPostId, activePostId} = this.props;

        if (prevProps.lockedPostId !== lockedPostId) {
            this.syncHoverToCurrentFocus({animate: true});
        } else if (
            !lockedPostId &&
            activePostId &&
            prevProps.activePostId !== activePostId
        ) {
            this.syncHoverToCurrentFocus({animate: true});
        } else if (prevProps.posts !== this.props.posts) {
            this.syncHoverToCurrentFocus({animate: false});
        }
    }

    setPostRef = (key, element) => {
        if (element) {
            this.postRefs.set(key, element);
        } else {
            this.postRefs.delete(key);
        }
    };

    commitHoverStyles = () => {
        const hoverSquare = this.hoverSquareRef.current;

        if (!hoverSquare) {
            return;
        }

        const {width, height, x, y, opacity} = this.hoverCurrent;

        hoverSquare.style.width = `${Math.max(width, 0)}px`;
        hoverSquare.style.height = `${Math.max(height, 0)}px`;
        hoverSquare.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        hoverSquare.style.opacity = `${opacity}`;
    };

    animateHoverSquare = () => {
        const hoverSquare = this.hoverSquareRef.current;

        if (!hoverSquare) {
            this.animationFrame = null;
            return;
        }

        const smoothing = this.prefersReducedMotion ? 1 : 0.09;
        const damping = this.prefersReducedMotion ? 1 : 0.14;

        const next = {...this.hoverCurrent};
        next.width += (this.hoverTarget.width - next.width) * smoothing;
        next.height += (this.hoverTarget.height - next.height) * smoothing;
        next.x += (this.hoverTarget.x - next.x) * damping;
        next.y += (this.hoverTarget.y - next.y) * damping;
        next.opacity += (this.hoverTarget.opacity - next.opacity) * 0.25;

        const delta =
            Math.abs(next.width - this.hoverTarget.width) +
            Math.abs(next.height - this.hoverTarget.height) +
            Math.abs(next.x - this.hoverTarget.x) +
            Math.abs(next.y - this.hoverTarget.y) +
            Math.abs(next.opacity - this.hoverTarget.opacity);

        this.hoverCurrent = next;
        this.commitHoverStyles();

        if (delta < 0.65) {
            this.hoverCurrent = {...this.hoverTarget};
            this.commitHoverStyles();
            this.animationFrame = null;
            return;
        }

        this.animationFrame = requestAnimationFrame(this.animateHoverSquare);
    };

    updateHoverTarget = (target, {animate = true} = {}) => {
        const hoverSquare = this.hoverSquareRef.current;

        if (!hoverSquare) {
            return;
        }

        this.hoverTarget = {...this.hoverTarget, ...target};

        if (!animate || this.prefersReducedMotion) {
            this.hoverCurrent = {...this.hoverCurrent, ...this.hoverTarget};
            this.commitHoverStyles();
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
                this.animationFrame = null;
            }
            return;
        }

        if (!this.animationFrame) {
            this.animationFrame = requestAnimationFrame(this.animateHoverSquare);
        }
    };

    moveHoverSquareToPost = (postKey, {animate = true} = {}) => {
        const hoverSquare = this.hoverSquareRef.current;
        const listElement = this.postListRef.current;
        const targetElement = this.postRefs.get(postKey);

        if (!hoverSquare || !listElement || !targetElement) {
            return;
        }

        const listRect = listElement.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const baseX = targetRect.left - 10 - listRect.left;
        const baseY = targetRect.top - listRect.top;

        this.activeHoverBase = {x: baseX, y: baseY};
        this.activeHoverKey = postKey;

        this.updateHoverTarget(
            {
                width: targetRect.width + 10,
                height: targetRect.height,
                x: baseX,
                y: baseY,
                opacity: 1,
            },
            {animate}
        );
    };

    syncHoverToCurrentFocus = ({animate = true} = {}) => {
        const {lockedPostId, activePostId} = this.props;
        const targetKey = lockedPostId || activePostId;

        if (targetKey) {
            this.moveHoverSquareToPost(targetKey, {animate});
        } else {
            this.updateHoverTarget({opacity: 0}, {animate});
        }
    };

    handleMouseEnter = (e, post, postKey) => {
        const {customOnPostHover, onPostHover, lockedPostId} = this.props;
        const hoverSquare = this.hoverSquareRef.current;
        const listElement = this.postListRef.current;

        if (!hoverSquare || !listElement) {
            return;
        }

        const postListRect = listElement.getBoundingClientRect();
        const postRect = e.currentTarget.getBoundingClientRect();

        if (!lockedPostId || lockedPostId === post.id) {
            const baseX = postRect.left - 10 - postListRect.left;
            const baseY = postRect.top - postListRect.top;

            this.activeHoverBase = {x: baseX, y: baseY};
            this.activeHoverKey = postKey;

            this.updateHoverTarget(
                {
                    width: postRect.width + 10,
                    height: postRect.height,
                    x: baseX,
                    y: baseY,
                    opacity: 1,
                },
                {animate: true}
            );
        }

        if (customOnPostHover) {
            customOnPostHover(post);
        } else if (onPostHover) {
            const mediaPayload = post.media ?? null;
            onPostHover(mediaPayload);
        }
    };

    handleMouseLeave = () => {
        const {customOnPostHover, onPostHover, lockedPostId} = this.props;

        if (!lockedPostId) {
            this.updateHoverTarget({opacity: 0}, {animate: true});
        } else {
            this.syncHoverToCurrentFocus({animate: false});
        }

        this.activeHoverKey = null;
        this.activeHoverBase = {x: 0, y: 0};

        if (customOnPostHover) {
            customOnPostHover(null);
        } else if (onPostHover) {
            onPostHover(null);
        }
    };

    handleMouseMove = (e, postKey) => {
        if (this.prefersReducedMotion || this.activeHoverKey !== postKey) {
            return;
        }

        const listElement = this.postListRef.current;

        if (!listElement) {
            return;
        }

        const rect = e.currentTarget.getBoundingClientRect();
        const listRect = listElement.getBoundingClientRect();

        this.activeHoverBase = {
            x: rect.left - 10 - listRect.left,
            y: rect.top - listRect.top,
        };

        if (!rect.width || !rect.height) {
            return;
        }

        const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
        const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
        const offsetX = Math.max(Math.min(relativeX * 6, 6), -6);
        const offsetY = Math.max(Math.min(relativeY * 4, 4), -4);

        this.updateHoverTarget(
            {
                width: rect.width + 10,
                height: rect.height,
                x: this.activeHoverBase.x + offsetX,
                y: this.activeHoverBase.y + offsetY,
            },
            {animate: true}
        );
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
        const {
            posts,
            positionIndex = 0,
            snakeEffectProps = {},
            getPostClassName,
            lockedPostId,
            forceMultiline = false,
        } = this.props;
        const {isMobile} = this.state;

        const {
            duration = 0.2,
            delayIncrement = 0.1,
            initialDelayRatio = 2,
        } = snakeEffectProps;

        const initialDelay = positionIndex * initialDelayRatio;
        const shouldStack = isMobile || forceMultiline;

        return (
            <div className="post__list" ref={this.postListRef}>
                <div
                    ref={this.hoverSquareRef}
                    className={[
                        "post__hover-square",
                        lockedPostId ? "post__hover-square--locked" : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                ></div>
                <SnakeEffectContainer
                    duration={duration}
                    delayIncrement={delayIncrement}
                    initialDelay={initialDelay}
                    parentStyle="parent-container post__snake-container"
                >
                    {posts.map((post, index) => {
                        const postKey = post.id || `index-${index}`;

                        return (
                            <div
                                className={[
                                    "post__container",
                                    getPostClassName ? getPostClassName(post, index) : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                                key={postKey}
                                ref={(element) => this.setPostRef(postKey, element)}
                                onMouseEnter={(e) => this.handleMouseEnter(e, post, postKey)}
                                onMouseMove={(e) => this.handleMouseMove(e, postKey)}
                                onMouseLeave={this.handleMouseLeave}
                                onClick={() => this.handlePostClick(post)}
                            >
                                <span className="post__hint-icon" aria-hidden="true">
                                    <TouchAppRoundedIcon className="post__hint-iconGlyph" fontSize="inherit" />
                                </span>
                                <a className="post__link">
                                    {shouldStack ? (
                                        <div
                                            className={[
                                                "post__titles",
                                                forceMultiline && !isMobile
                                                    ? "post__titles--stacked"
                                                    : "",
                                            ]
                                                .filter(Boolean)
                                                .join(" ")}
                                        >
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

                                    {shouldStack ? (
                                        <div
                                            className={[
                                                "post__details-container",
                                                forceMultiline && !isMobile
                                                    ? "post__details-container--stacked"
                                                    : "",
                                            ]
                                                .filter(Boolean)
                                                .join(" ")}
                                        >
                                            {post.details.map((detail, idx) => (
                                                <span
                                                    className={`post__details ${
                                                        idx === 0 ? "primary" : "subsequent"
                                                    }`}
                                                    key={idx}
                                                >
                                                    {this.renderFormattedContent(
                                                        detail,
                                                        `${postKey}-detail-${idx}`
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="post__details-container joined">
                                            <span className="post__details">
                                                {post.details.map((detail, detailIdx) => (
                                                    <React.Fragment
                                                        key={`${postKey}-detail-joined-${detailIdx}`}
                                                    >
                                                        {detailIdx > 0 ? " " : null}
                                                        {this.renderFormattedContent(
                                                            detail,
                                                            `${postKey}-detail-joined-${detailIdx}`
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </span>
                                        </div>
                                    )}
                                </a>
                            </div>
                        );
                    })}
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
            media: PropTypes.oneOfType([
                PropTypes.shape({
                    type: PropTypes.oneOf(["image", "video", "iframe"]).isRequired,
                    src: PropTypes.string.isRequired,
                }),
                PropTypes.oneOf([null]),
            ]),
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
    getPostClassName: PropTypes.func,
    lockedPostId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    activePostId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    forceMultiline: PropTypes.bool,
};

export default PostList;
