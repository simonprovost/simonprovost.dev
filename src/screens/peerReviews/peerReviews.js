import React from "react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import AcademiaHeader from "../../components/academiaHeader/academiaHeader";
import PostList from "../../components/postList/postList";
import peerReviewsConfig from "../../configs/peerReviewsConfig";
import "./peerReviews.css";

const PeerReviews = ({showTitle, posts}) => {
    const navigate = useNavigate();

    return (
        <div className="peerReviews__container">
            <div className="peerReviews__header">
                <AcademiaHeader
                    name="Peer Reviews"
                    positions={[]}
                    tabs={[]}
                    showInfo={false}
                    showTabs={false}
                    showTitle={showTitle}
                    onCompassClick={() => {
                        navigate("/");
                    }}
                    onTabClick={() => {}}
                    positionIndex={0}
                    snakeEffectProps={{
                        duration: 0.3,
                        delayIncrement: 0.08,
                        initialDelayRatio: 1,
                    }}
                />
            </div>
            <div className="peerReviews__content">
                <div className="peerReviews__list-column">
                    <PostList
                        posts={posts}
                        positionIndex={1}
                        snakeEffectProps={{
                            duration: 0.5,
                            delayIncrement: 0.1,
                            initialDelayRatio: 0.2,
                        }}
                        forceMultiline
                    />
                </div>
            </div>
        </div>
    );
};

PeerReviews.propTypes = {
    showTitle: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            titles: PropTypes.arrayOf(PropTypes.string).isRequired,
            details: PropTypes.arrayOf(PropTypes.string).isRequired,
            url: PropTypes.string,
        })
    ).isRequired,
};

PeerReviews.defaultProps = {
    ...peerReviewsConfig,
};

export default PeerReviews;
