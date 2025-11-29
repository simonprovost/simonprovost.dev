import React from "react";
import PropTypes from "prop-types";
import AcademiaHeader from "../../components/academiaHeader/academiaHeader";
import PostList from "../../components/postList/postList";
import openSourceConfig from "../../configs/openSourceConfig";
import withNavigation from "../../utils/withNavigation";
import "./openSource.css";

let hasMountedOpenSourcePreviously = false;

class OpenSource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            media: null,
        };

        this.avatarLink = null;
        this.avatarNode = null;
        this.reduceMotionMedia = null;
        this.prefersReducedMotion = false;
        this.spinState = {
            rotation: 0,
            velocity: 0,
            targetVelocity: 0,
            animationFrameId: null,
            lastTimestamp: null,
        };

        this.restState = {
            animationFrameId: null,
            startTimestamp: null,
            startRotation: 0,
            endRotation: 0,
            startScale: 1,
        };

        this.spinConfig = {
            cruiseVelocity: 540, // degrees per second once at cruising speed
            acceleration: 720, // degrees per second squared when spinning up
            deceleration: 360, // degrees per second squared when spinning down
            maxScale: 1.05,
            minimumVelocityThreshold: 6,
            restDuration: 0.6,
        };

        this.initialHoverDelay = 3000;
        this.initialHoverSuppressed = hasMountedOpenSourcePreviously;
        this.initialHoverTimerId = null;
        this.isAvatarHovered = false;

        this.preloadedVideos = new Map();

        hasMountedOpenSourcePreviously = true;
    }

    handleCompassClick = () => {
        const {navigate} = this.props;
        navigate("/about");
    };

    updateMedia = (media) => {
        this.setState({media});
    };

    componentDidMount() {
        if (typeof window !== "undefined" && window.matchMedia) {
            this.reduceMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
            this.prefersReducedMotion = this.reduceMotionMedia.matches;

            if (this.reduceMotionMedia.addEventListener) {
                this.reduceMotionMedia.addEventListener(
                    "change",
                    this.handleMotionPreferenceChange
                );
            } else {
                this.reduceMotionMedia.addListener(this.handleMotionPreferenceChange);
            }
        }

        this.preloadVideoSources(this.props.posts);

        if (!this.prefersReducedMotion) {
            this.attachAvatarAnimation();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.posts !== this.props.posts) {
            this.preloadVideoSources(this.props.posts);
        }

        if (!this.prefersReducedMotion) {
            this.attachAvatarAnimation();
        } else {
            this.detachAvatarAnimation();
        }
    }

    componentWillUnmount() {
        this.detachAvatarAnimation();

        if (this.reduceMotionMedia) {
            if (this.reduceMotionMedia.removeEventListener) {
                this.reduceMotionMedia.removeEventListener(
                    "change",
                    this.handleMotionPreferenceChange
                );
            } else {
                this.reduceMotionMedia.removeListener(this.handleMotionPreferenceChange);
            }
        }

        this.teardownPreloadedVideos();
    }

    preloadVideoSources = (posts) => {
        if (!Array.isArray(posts) || typeof document === "undefined") {
            return;
        }

        posts.forEach(({media}) => {
            if (!media || media.type !== "video" || !media.src) {
                return;
            }

            if (this.preloadedVideos.has(media.src)) {
                return;
            }

            const linkEl = document.createElement("link");
            linkEl.rel = "preload";
            linkEl.as = "video";
            linkEl.fetchPriority = "high";
            linkEl.href = media.src;

            const videoEl = document.createElement("video");
            videoEl.src = media.src;
            videoEl.preload = "auto";
            videoEl.muted = true;
            videoEl.playsInline = true;
            videoEl.load();

            const warmBuffer = () => {
                const playPromise = videoEl.play();

                if (playPromise?.then) {
                    playPromise
                        .then(() => {
                            videoEl.pause();
                            videoEl.currentTime = 0;
                        })
                        .catch(() => {
                            // Ignore autoplay rejections caused by browser policies.
                        });
                }
            };

            videoEl.addEventListener("canplaythrough", warmBuffer, {once: true});
            if (window.requestIdleCallback) {
                window.requestIdleCallback(() => {
                    if (videoEl.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
                        warmBuffer();
                    }
                });
            }

            document.head.appendChild(linkEl);
            this.preloadedVideos.set(media.src, {linkEl, videoEl});
        });
    };

    teardownPreloadedVideos = () => {
        this.preloadedVideos.forEach(({linkEl, videoEl}) => {
            if (linkEl?.parentNode) {
                linkEl.parentNode.removeChild(linkEl);
            }

            if (videoEl) {
                videoEl.pause();
                videoEl.removeAttribute("src");
                videoEl.load();
            }
        });

        this.preloadedVideos.clear();
    };

    handleMotionPreferenceChange = (event) => {
        this.prefersReducedMotion = event.matches;

        if (this.prefersReducedMotion) {
            this.detachAvatarAnimation();
        } else {
            this.attachAvatarAnimation();
        }
    };

    attachAvatarAnimation = () => {
        if (this.prefersReducedMotion) {
            return;
        }

        if (this.avatarLink && document.body.contains(this.avatarLink)) {
            return;
        }

        const link = document.querySelector(
            ".opensource__header .academiaHeader__logo-link"
        );

        if (!link) {
            return;
        }

        this.detachAvatarAnimation();

        const avatar = link.querySelector(".academiaHeader__avatar");

        if (!avatar) {
            return;
        }

        this.avatarLink = link;
        this.avatarNode = avatar;

        link.addEventListener("mouseenter", this.handleAvatarEnter);
        link.addEventListener("mouseleave", this.handleAvatarLeave);
        link.addEventListener("focus", this.handleAvatarEnter);
        link.addEventListener("blur", this.handleAvatarLeave);
        link.addEventListener("touchstart", this.handleAvatarEnter, {passive: true});
        link.addEventListener("touchend", this.handleAvatarLeave, {passive: true});
        link.addEventListener("touchcancel", this.handleAvatarLeave, {passive: true});
    };

    detachAvatarAnimation = () => {
        if (!this.avatarLink) {
            return;
        }

        this.avatarLink.removeEventListener("mouseenter", this.handleAvatarEnter);
        this.avatarLink.removeEventListener("mouseleave", this.handleAvatarLeave);
        this.avatarLink.removeEventListener("focus", this.handleAvatarEnter);
        this.avatarLink.removeEventListener("blur", this.handleAvatarLeave);
        this.avatarLink.removeEventListener("touchstart", this.handleAvatarEnter);
        this.avatarLink.removeEventListener("touchend", this.handleAvatarLeave);
        this.avatarLink.removeEventListener("touchcancel", this.handleAvatarLeave);

        this.stopSpinAnimationLoop(true);
        this.clearInitialHoverTimer();
        this.isAvatarHovered = false;

        this.avatarLink = null;
        this.avatarNode = null;
    };

    handleAvatarEnter = () => {
        if (this.prefersReducedMotion) {
            return;
        }

        this.isAvatarHovered = true;

        if (this.initialHoverSuppressed) {
            if (!this.initialHoverTimerId) {
                this.initialHoverTimerId = window.setTimeout(
                    this.handleInitialHoverTimeout,
                    this.initialHoverDelay
                );
            }
            return;
        }

        this.setSpinTarget(this.spinConfig.cruiseVelocity);
    };

    handleAvatarLeave = () => {
        if (this.prefersReducedMotion) {
            return;
        }

        this.isAvatarHovered = false;

        if (this.initialHoverSuppressed) {
            this.initialHoverSuppressed = false;
            this.clearInitialHoverTimer();
            return;
        }

        this.setSpinTarget(0);
    };

    handleInitialHoverTimeout = () => {
        this.initialHoverTimerId = null;

        if (!this.initialHoverSuppressed) {
            return;
        }

        this.initialHoverSuppressed = false;

        if (this.isAvatarHovered && this.avatarNode) {
            this.setSpinTarget(this.spinConfig.cruiseVelocity);
        }
    };

    clearInitialHoverTimer = () => {
        if (this.initialHoverTimerId) {
            window.clearTimeout(this.initialHoverTimerId);
            this.initialHoverTimerId = null;
        }
    };

    setSpinTarget = (targetVelocity) => {
        const state = this.spinState;

        if (!this.avatarNode) {
            return;
        }

        if (state.targetVelocity === targetVelocity) {
            return;
        }

        this.stopRestAnimation();

        state.targetVelocity = targetVelocity;

        if (targetVelocity > 0 && this.avatarNode) {
            this.avatarNode.style.transition = "";
        }

        if (!state.animationFrameId) {
            state.animationFrameId = window.requestAnimationFrame(this.updateSpinFrame);
        }
    };

    stopSpinAnimationLoop = (resetTransform = false) => {
        const state = this.spinState;

        if (state.animationFrameId) {
            window.cancelAnimationFrame(state.animationFrameId);
            state.animationFrameId = null;
        }

        state.lastTimestamp = null;
        state.velocity = 0;
        state.targetVelocity = 0;
        state.rotation = resetTransform ? 0 : state.rotation;

        this.stopRestAnimation(resetTransform);

        if (resetTransform && this.avatarNode) {
            this.avatarNode.style.transition = "";
            this.avatarNode.style.transform = "";
        }
    };

    updateSpinFrame = (timestamp) => {
        const state = this.spinState;
        const config = this.spinConfig;

        if (!this.avatarNode) {
            this.stopSpinAnimationLoop();
            return;
        }

        if (state.lastTimestamp == null) {
            state.lastTimestamp = timestamp;
            state.animationFrameId = window.requestAnimationFrame(this.updateSpinFrame);
            return;
        }

        const deltaSeconds = Math.min(
            Math.max((timestamp - state.lastTimestamp) / 1000, 0),
            0.12
        );
        state.lastTimestamp = timestamp;

        if (state.targetVelocity > state.velocity) {
            state.velocity = Math.min(
                state.velocity + config.acceleration * deltaSeconds,
                state.targetVelocity
            );
        } else if (state.targetVelocity < state.velocity) {
            state.velocity = Math.max(
                state.velocity - config.deceleration * deltaSeconds,
                state.targetVelocity
            );
        }

        if (Math.abs(state.velocity) > 0.01) {
            state.rotation += state.velocity * deltaSeconds;
        }

        if (this.avatarNode) {
            const speedRatio = config.cruiseVelocity
                ? Math.min(Math.max(Math.abs(state.velocity) / config.cruiseVelocity, 0), 1)
                : 0;
            const scale = 1 + (config.maxScale - 1) * speedRatio;

            this.avatarNode.style.transform = `scale(${scale}) rotate(${state.rotation}deg)`;
        }

        const shouldContinue =
            state.targetVelocity !== 0 ||
            Math.abs(state.velocity) > config.minimumVelocityThreshold;

        if (!shouldContinue) {
            this.easeAvatarToRest();
            return;
        }

        state.animationFrameId = window.requestAnimationFrame(this.updateSpinFrame);
    };

    easeAvatarToRest = () => {
        if (!this.avatarNode) {
            this.stopSpinAnimationLoop();
            return;
        }

        const state = this.spinState;
        const config = this.spinConfig;
        const restState = this.restState;

        const normalizedRotation = ((state.rotation % 360) + 360) % 360;
        const remainingRotation = (360 - normalizedRotation) % 360;
        const needsFullRotation =
            remainingRotation === 0 &&
            Math.abs(state.velocity) > config.minimumVelocityThreshold;
        const targetRotation = needsFullRotation
            ? state.rotation + 360
            : state.rotation + remainingRotation;

        const speedRatio = config.cruiseVelocity
            ? Math.min(Math.max(Math.abs(state.velocity) / config.cruiseVelocity, 0), 1)
            : 0;
        const startScale = 1 + (config.maxScale - 1) * speedRatio;

        if (this.spinState.animationFrameId) {
            window.cancelAnimationFrame(this.spinState.animationFrameId);
            this.spinState.animationFrameId = null;
        }

        this.stopRestAnimation();

        restState.startRotation = state.rotation;
        restState.endRotation = targetRotation;
        restState.startScale = startScale;
        restState.startTimestamp = null;

        state.velocity = 0;
        state.targetVelocity = 0;
        state.lastTimestamp = null;

        restState.animationFrameId = window.requestAnimationFrame(this.updateRestFrame);
    };

    stopRestAnimation = (resetTransform = false) => {
        const restState = this.restState;

        if (restState.animationFrameId) {
            window.cancelAnimationFrame(restState.animationFrameId);
            restState.animationFrameId = null;
        }

        restState.startTimestamp = null;
        restState.startRotation = 0;
        restState.endRotation = 0;
        restState.startScale = 1;

        if (resetTransform && this.avatarNode) {
            this.avatarNode.style.transform = "";
        }

        if (resetTransform) {
            this.spinState.rotation = 0;
        }
    };

    updateRestFrame = (timestamp) => {
        const restState = this.restState;
        const state = this.spinState;

        if (!this.avatarNode) {
            this.stopRestAnimation(true);
            return;
        }

        if (restState.startTimestamp == null) {
            restState.startTimestamp = timestamp;
        }

        const config = this.spinConfig;
        const elapsedSeconds = (timestamp - restState.startTimestamp) / 1000;
        const progress = Math.min(elapsedSeconds / Math.max(config.restDuration, 0.0001), 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        const rotation =
            restState.startRotation +
            (restState.endRotation - restState.startRotation) * easedProgress;
        const scale =
            restState.startScale + (1 - restState.startScale) * easedProgress;

        state.rotation = rotation;

        this.avatarNode.style.transform = `scale(${scale}) rotate(${rotation}deg)`;

        if (progress < 1) {
            restState.animationFrameId = window.requestAnimationFrame(this.updateRestFrame);
            return;
        }

        state.rotation = restState.endRotation;

        restState.animationFrameId = null;
        restState.startTimestamp = null;

        window.requestAnimationFrame(() => {
            if (!this.avatarNode) {
                return;
            }

            this.avatarNode.style.transform = "";
            this.spinState.rotation = 0;
        });
    };

    render() {
        const {name, positions, tabs, posts, navigate} = this.props;
        const {media} = this.state;

        const getPlaybackSrc = (mediaToRender) => {
            if (!mediaToRender) {
                return null;
            }

            const preloadedVideo = this.preloadedVideos.get(mediaToRender.src);
            if (preloadedVideo?.videoEl?.currentSrc) {
                return preloadedVideo.videoEl.currentSrc;
            }

            return mediaToRender.src;
        };

        return (
            <div className="opensource__container">
                <div className="opensource__header">
                    <AcademiaHeader
                        name={name}
                        positions={positions}
                        tabs={tabs.map((tab) => tab.name)}
                        onCompassClick={this.handleCompassClick}
                        onTabClick={(tabName) => {
                            const matchedTab = tabs.find((tab) => tab.name === tabName);

                            if (matchedTab?.path) {
                                navigate(matchedTab.path);
                            } else {
                                navigate(`/${tabName.toLowerCase()}`);
                            }
                        }}
                        positionIndex={0}
                        snakeEffectProps={{
                            duration: 0.3,
                            delayIncrement: 0.08,
                            initialDelayRatio: 1,
                        }}
                    />
                </div>
                <div className="opensource__content">
                    <div className="opensource__list-column">
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
                    <div className="opensource__media-preview-column">
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
                                        src={getPlaybackSrc(media)}
                                        className="opensource__media-content"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="auto"
                                        controls={false}
                                        disablePictureInPicture
                                        controlsList="nodownload noremoteplayback"
                                    />
                                )}
                            </div>
                        )}
                    </div>
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
    navigate: PropTypes.func.isRequired,
};

OpenSource.defaultProps = {
    ...openSourceConfig,
};

export default withNavigation(OpenSource);