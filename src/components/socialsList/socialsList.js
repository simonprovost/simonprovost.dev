import React from "react";
import PropTypes from "prop-types";
import SnakeEffectContainer from "../snakeEffect/snakeEffect";
import "./socialsList.css";

const SocialsList = ({socials, positionIndex = 0, snakeEffectProps = {}}) => {
    const {
        duration = 0.2,
        delayIncrement = 0.1,
        initialDelayRatio = 2,
    } = snakeEffectProps;

    const initialDelay = positionIndex * initialDelayRatio;

    return (
        <div className="socials-list">
            <SnakeEffectContainer
                duration={duration}
                delayIncrement={delayIncrement}
                initialDelay={initialDelay}
                applyToSubchildren={false}
            >
                {socials.map((social, index) => (
                    <div className="social-container" key={index}>
                        <a
                            href={social.url}
                            className="social-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="social-title">{social.title}</span>
                        </a>
                    </div>
                ))}
            </SnakeEffectContainer>
        </div>
    );
};

SocialsList.propTypes = {
    socials: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
    positionIndex: PropTypes.number,
    snakeEffectProps: PropTypes.shape({
        duration: PropTypes.number,
        delayIncrement: PropTypes.number,
        initialDelayRatio: PropTypes.number,
    }),
};

export default SocialsList;
