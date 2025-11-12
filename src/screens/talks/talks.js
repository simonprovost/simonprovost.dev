import React from "react";
import PropTypes from "prop-types";
import AcademiaHeader from "../../components/academiaHeader/academiaHeader";
import PostList from "../../components/postList/postList";
import talksConfig from "../../configs/talksConfig";
import withNavigation from "../../utils/withNavigation";
import "./talks.css";

class Talks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePost: null,
            lockedPostId: null,
            hoveredPostId: null,
            showLockHint: true,
            isMediaExpanded: false,
        };
        this.hoverUnlockTimeout = null;
        this.originalBodyOverflow = null;
    }

    componentWillUnmount() {
        if (this.hoverUnlockTimeout) {
            clearTimeout(this.hoverUnlockTimeout);
        }

        if (this.state.isMediaExpanded) {
            document.removeEventListener("keydown", this.handleKeyDown);
            document.body.style.overflow = this.originalBodyOverflow || "";
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isMediaExpanded !== this.state.isMediaExpanded) {
            if (this.state.isMediaExpanded) {
                this.originalBodyOverflow = document.body.style.overflow;
                document.body.style.overflow = "hidden";
                document.addEventListener("keydown", this.handleKeyDown);
            } else {
                document.body.style.overflow = this.originalBodyOverflow || "";
                document.removeEventListener("keydown", this.handleKeyDown);
            }
        }
    }

    handleCompassClick = () => {
        const {navigate} = this.props;
        navigate("/");
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
                    isMediaExpanded: false,
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
                            isMediaExpanded: false,
                        };
                    });
                    this.hoverUnlockTimeout = null;
                }, 3000);
            }
        } else {
            this.setState((prevState) => ({
                hoveredPostId: null,
                activePost: prevState.lockedPostId ? prevState.activePost : null,
                isMediaExpanded: prevState.lockedPostId ? prevState.isMediaExpanded : false,
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
                isMediaExpanded: false,
            };
        });
    };

    handleKeyDown = (event) => {
        if (event.key === "Escape") {
            this.setState({isMediaExpanded: false});
        }
    };

    handleExpandToggle = () => {
        this.setState((prevState) => ({
            isMediaExpanded: !prevState.isMediaExpanded,
        }));
    };

    openExternalLink = (link) => {
        if (!link) {
            return;
        }

        window.open(link, "_blank", "noopener,noreferrer");
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
        const {activePost, isMediaExpanded} = this.state;

        if (!activePost) {
            return null;
        }

        const {media} = activePost;
        if (!media) {
            return null;
        }

        const previewClass = `talks__media-preview ${media.aspect === "portrait" ? "portrait" : "landscape"}`;
        const wrapperClass = `talks__media-preview-wrapper${isMediaExpanded ? " talks__media-preview-wrapper--expanded" : ""}`;
        const figmaLink = media.figmaLink || media.src;
        const pdfLink = media.pdfLink || "";
        const hasPdfLink = Boolean(pdfLink);
        const enlargeLabel = isMediaExpanded ? "Exit full-screen preview" : "Enlarge preview";

        const renderMediaContent = () => {
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

        const mediaContent = renderMediaContent();

        if (!mediaContent) {
            return null;
        }

        return (
            <>
                {isMediaExpanded && <div className="talks__media-overlay" aria-hidden="true" />}
                <div className={wrapperClass}>
                    {mediaContent}
                    <div className="talks__media-toolbar">
                        <button
                            type="button"
                            className="talks__media-toolbar-button"
                            onClick={() => this.openExternalLink(figmaLink)}
                            aria-label="Open slides in Figma"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="talks__media-toolbar-icon">
                                <path d="M7.5 2.5h4a3.5 3.5 0 0 1 0 7h-4z" fill="currentColor" />
                                <path d="M11.5 9.5a3.5 3.5 0 1 1 0 7h-4v-3.5a3.5 3.5 0 0 1 3.5-3.5z" fill="currentColor" />
                                <path d="M7.5 2.5a3.5 3.5 0 1 0 0 7z" fill="currentColor" />
                                <circle cx="7.5" cy="16" r="3.5" fill="currentColor" />
                                <path d="M11.5 2.5H15A3.5 3.5 0 1 1 15 9h-3.5z" fill="currentColor" />
                            </svg>
                            <span className="talks__sr-only">Open in Figma</span>
                        </button>
                        <button
                            type="button"
                            className={`talks__media-toolbar-button${
                                isMediaExpanded ? " talks__media-toolbar-button--active" : ""
                            }`}
                            onClick={this.handleExpandToggle}
                            aria-label={enlargeLabel}
                            aria-pressed={isMediaExpanded}
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="talks__media-toolbar-icon">
                                <path
                                    d="M5 5h6v2H7v4H5zm14 0v6h-2V7h-4V5zm-6 14h6v-6h-2v4h-4zm-2-6H5v6h6v-2H7v-4z"
                                    fill="currentColor"
                                />
                            </svg>
                            <span className="talks__sr-only">{enlargeLabel}</span>
                        </button>
                        <button
                            type="button"
                            className={`talks__media-toolbar-button${
                                hasPdfLink ? "" : " talks__media-toolbar-button--disabled"
                            }`}
                            onClick={() => this.openExternalLink(pdfLink)}
                            aria-label={hasPdfLink ? "Download PDF" : "PDF unavailable"}
                            disabled={!hasPdfLink}
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="talks__media-toolbar-icon">
                                <path
                                    d="M6 3h9l4 4v14H6z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M15 3v4h4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9 11.5h1.25a1.75 1.75 0 0 1 0 3.5H9zm3.5 0h1a1.5 1.5 0 0 1 0 3h-1zM9 13.25h1"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <span className="talks__sr-only">Download PDF</span>
                        </button>
                    </div>
                </div>
            </>
        );
    };

    render() {
        const {name, positions, tabs, posts, showTitle, navigate} = this.props;
        const {lockedPostId, activePost, showLockHint, isMediaExpanded} = this.state;
        const contentContainerClassName = `talks__content-container${
            showLockHint ? " talks__content-container--hint-visible" : ""
        }`;
        const mediaPreview = this.renderMediaPreview();

        return (
            <div className="talks__container">
                <div className="talks__header">
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
                        showInfo={false}
                        showTabs={false}
                        showTitle={showTitle}
                    />
                </div>
                <div className="talks__content">
                    <div className="talks__list-column">
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
                    <div className="talks__media-preview-column">{mediaPreview}</div>
                </div>
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
    navigate: PropTypes.func.isRequired,
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
                figmaLink: PropTypes.string,
                pdfLink: PropTypes.string,
            }),
        })
    ).isRequired,
};

Talks.defaultProps = {
    ...talksConfig,
    theme: "light",
};

export default withNavigation(Talks);
