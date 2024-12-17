import React from 'react';
import PropTypes from 'prop-types';
import AcademiaHeader from '../../components/academiaHeader/academiaHeader';
import PostList from '../../components/postList/postList';
import useNotionDatabase from '../../hooks/useNotionDatabase';
import './blog.css';
import RiveLoader from "../../components/riveLoader/riveLoader";

const Blog = () => {
    const {posts, isLoading, error} = useNotionDatabase();
    const [media, setMedia] = React.useState(null);

    const handlePostClick = (id, title) => {
        console.log(id, title);
        const formattedTitle = encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'));
        window.location.href = `/blog/${id}/${formattedTitle}`;
    };

    const updateMedia = (mediaItem) => {
        setMedia(mediaItem);
    };

    if (isLoading) {
        return (
            <div className="blog__loader-container">
                <RiveLoader src="rive/loader.riv" className={"blog__loader"}/>
                <p className="loader-text">Fetching posts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">An error occurred while loading posts.</p>
                <p className="error-details">{error.message}</p>
            </div>
        );
    }

    return (
        <div className="blog__container">
            <div className="blog__header-and-content-container">
                <div className="blog__header-and-content">
                    <AcademiaHeader
                        name="Blog"
                        positions={[]}
                        tabs={[]}
                        showInfo={false}
                        showTabs={false}
                        showTitle="Blog"
                        onCompassClick={() => (window.location.href = '/')}
                        positionIndex={0}
                        snakeEffectProps={{
                            duration: 0.3,
                            delayIncrement: 0.08,
                            initialDelayRatio: 1,
                        }}
                        onTabClick={() => {
                        }}
                        customSrc="/rive/head_sub_pages.riv"
                        isSubpage={true}
                    />
                    <div className="blog__content-container">
                        <PostList
                            posts={posts}
                            onPostHover={updateMedia}
                            customOnPostClick={(post) => handlePostClick(post.id, post.titles.join(" ") || "Untitled")}
                            positionIndex={2}
                            snakeEffectProps={{
                                duration: 0.5,
                                delayIncrement: 0.1,
                                initialDelayRatio: 0.2,
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="blog__media-preview-container">
                {media && (
                    <div
                        className={`blog__media-preview ${
                            media.aspect === 'portrait' ? 'portrait' : 'landscape'
                        }`}
                    >
                        {media.type === 'image' ? (
                            <img
                                src={media.src}
                                alt="Preview"
                                className="blog__media-content"
                            />
                        ) : (
                            <video
                                src={media.src}
                                className="blog__media-content"
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
};

Blog.propTypes = {
    posts: PropTypes.array,
};

export default Blog;
