import React from "react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import AcademiaHeader from "../../components/academiaHeader/academiaHeader";
import PostList from "../../components/postList/postList";
import publicationsConfig from "../../configs/publicationsConfig";
import "./publications.css";

const Publications = ({showTitle, posts}) => {
    const navigate = useNavigate();

    return (
        <div className="publications__container">
            <div className="publications__header">
                <AcademiaHeader
                    name="Publications"
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
            <div className="publications__content">
                <div className="publications__list-column">
                    <PostList
                        posts={posts}
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
    );
};

Publications.propTypes = {
    showTitle: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            titles: PropTypes.arrayOf(PropTypes.string).isRequired,
            details: PropTypes.arrayOf(PropTypes.string).isRequired,
            url: PropTypes.string,
        })
    ).isRequired,
};

Publications.defaultProps = {
    ...publicationsConfig,
};

export default Publications;
