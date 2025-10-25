import React from "react";
import PropTypes from "prop-types";
import AcademiaHeader from "../../components/academiaHeader/academiaHeader";
import PostList from "../../components/postList/postList";
import talksConfig from "../../configs/talksConfig";
import "./talks.css";

class Talks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePost: null,
            lockedPostId: null,
            hoveredPostId: null,
            showLockHint: true,
        };
        this.hoverUnlockTimeout = null;
    }

    componentWillUnmount() {
        if (this.hoverUnlockTimeout) {
            clearTimeout(this.hoverUnlockTimeout);
        }
    }

    handleCompassClick = () => {
        window.open("/", "_self");
    };

    handlePostHover = (post) => {
        const {lockedPostId} = this.state;

        if (this.hoverUnlockTimeout) {
            clearTimeout(this.hoverUnlockTimeout);
            this.hoverUnlockTimeout = null;
        }

        if (post) {
            if (!lockedPostId || lockedPostId === post.id) {
                this.setState({
                    activePost: post,
                    hoveredPostId: post.id,
                });
            } else {
                this.setState({
                    hoveredPostId: post.id,
                });
                this.hoverUnlockTimeout = setTimeout(() => {
                    this.setState((prevState) => {
                        if (prevState.hoveredPostId !== post.id) {
                            return null;
                        }

                        return {
                            lockedPostId: null,
                            activePost: post,
                        };
                    });
                    this.hoverUnlockTimeout = null;
                }, 3000);
            }
        } else {
            this.setState((prevState) => ({
                hoveredPostId: null,
                activePost: prevState.lockedPostId ? prevState.activePost : null,
            }));
        }
    };

    handlePostClick = (post) => {
        if (this.hoverUnlockTimeout) {
            clearTimeout(this.hoverUnlockTimeout);
            this.hoverUnlockTimeout = null;
        }

        this.setState((prevState) => {
            const isSamePostLocked = prevState.lockedPostId === post.id;
            const nextLockedPostId = isSamePostLocked ? null : post.id;
            const shouldHideLockHint = !isSamePostLocked && prevState.showLockHint;

            return {
                lockedPostId: nextLockedPostId,
                activePost: post,
                hoveredPostId: post.id,
                showLockHint: shouldHideLockHint ? false : prevState.showLockHint,
            };
        });
    };

    getIframeSrc = (media) => {
        const {theme} = this.props;

        if (!theme) {
            return media.src;
        }

        try {
            const url = new URL(media.src);
            url.searchParams.set("theme", theme);
            return url.toString();
        } catch (error) {
            const separator = media.src.includes("?") ? "&" : "?";
            return `${media.src}${separator}theme=${theme}`;
        }
    };

    renderMediaPreview = () => {
        const {activePost} = this.state;

        if (!activePost) {
            return null;
        }

        const {media} = activePost;
        if (!media) {
            return null;
        }

        const previewClass = `talks__media-preview ${media.aspect === "portrait" ? "portrait" : "landscape"}`;

        if (media.type === "image") {
            return (
                <div className={previewClass}>
                    <img
                        src={media.src}
                        alt={media.title || activePost.titles.join(" ")}
                        className="talks__media-content"
                    />
                </div>
            );
        }

        if (media.type === "video") {
            return (
                <div className={previewClass}>
                    <video
                        src={media.src}
                        className="talks__media-content"
                        autoPlay
                        muted
                        loop
                    />
                </div>
            );
        }

        if (media.type === "iframe") {
            const iframeSrc = this.getIframeSrc(media);
            return (
                <div className={previewClass}>
                    <iframe
                        src={iframeSrc}
                        title={media.title || activePost.titles.join(" ")}
                        className="talks__media-content"
                        allow="fullscreen"
                        allowFullScreen
                        loading="lazy"
                        style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}
                    ></iframe>
                </div>
            );
        }

        return null;
    };

    render() {
        const {name, positions, tabs, posts, showTitle} = this.props;
        const {lockedPostId, activePost, showLockHint} = this.state;
        const contentContainerClassName = `talks__content-container${
            showLockHint ? " talks__content-container--hint-visible" : ""
        }`;

        return (
            <div className="talks__container">
                <div className="talks__header-and-content-container">
                    <div className="talks__header-and-content">
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
                            showInfo={false}
                            showTabs={false}
                            showTitle={showTitle}
                            customSrc="/rive/head_sub_pages.riv"
                            isSubpage={true}
                        />
                        <div className={contentContainerClassName}>
                            <PostList
                                posts={posts}
                                customOnPostHover={this.handlePostHover}
                                customOnPostClick={this.handlePostClick}
                                lockedPostId={lockedPostId}
                                activePostId={activePost ? activePost.id : null}
                                getPostClassName={(post) => {
                                    if (!lockedPostId) {
                                        return "";
                                    }

                                    if (lockedPostId === post.id) {
                                        return "post__container--locked";
                                    }

                                    return "post__container--dimmed";
                                }}
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
                <div className="talks__media-preview-container">{this.renderMediaPreview()}</div>
            </div>
        );
    }
}

Talks.propTypes = {
    name: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(["light", "dark"]),
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
    showTitle: PropTypes.string,
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            titles: PropTypes.arrayOf(PropTypes.string).isRequired,
            details: PropTypes.arrayOf(PropTypes.string).isRequired,
            media: PropTypes.shape({
                type: PropTypes.oneOf(["image", "video", "iframe"]).isRequired,
                src: PropTypes.string.isRequired,
                aspect: PropTypes.oneOf(["portrait", "landscape"]),
                title: PropTypes.string,
            }),
        })
    ).isRequired,
};

Talks.defaultProps = {
    ...talksConfig,
    theme: "light",
};

export default Talks;
