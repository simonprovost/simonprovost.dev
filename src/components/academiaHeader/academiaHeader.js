import React from "react";
import PropTypes from "prop-types";
import "./academiaHeader.css";
import RiveHeadTracking from "../riveHeadTracking/riveHeadTracking";
import SnakeEffectContainer from "../snakeEffect/snakeEffect";

const AcademiaHeader = ({
                            name,
                            positions,
                            tabs,
                            onCompassClick,
                            onTabClick,
                            showTabs = true,
                            showInfo = true,
                            showTitle = null,
                            positionIndex = 0,
                            snakeEffectProps = {},
                            customSrc = null,
                            isSubpage = false,
                        }) => {
    const {
        duration = 0.2,
        delayIncrement = 0.1,
        initialDelayRatio = 2,
    } = snakeEffectProps;

    const initialDelay = positionIndex * initialDelayRatio;

    return (
        <header className="academiaHeader__header-container">
            <div className="academiaHeader__logo-container">
                <a
                    aria-label="Compass"
                    role="button"
                    tabIndex="0"
                    onClick={onCompassClick}
                    onTouchStart={onCompassClick}
                >
                    <RiveHeadTracking
                        className="academiaHeader__logo"
                        src={process.env.PUBLIC_URL + `${customSrc || "/rive/head.riv"}`}
                        stateMachineName="LookAround"
                        isSubpage={isSubpage}
                    />
                </a>
            </div>

            <SnakeEffectContainer
                duration={duration}
                delayIncrement={delayIncrement}
                initialDelay={initialDelay}
            >
                {showTitle && <div className="academiaHeader__static-title">{showTitle}</div>}

                {showInfo && (
                    <div className="academiaHeader__info-container">
                        <h1 className="academiaHeader__name">{name}</h1>
                        <div className="academiaHeader__positions-container">
                            {positions.map((position, index) => (
                                <div key={index} className="academiaHeader__position-container">
                                    <h2 className="academiaHeader__position">
                                        <span>{position.title}</span>
                                        <span
                                            className="academiaHeader__supervised-container"
                                            style={{
                                                top: `-${0.5 + position.supervisors.length * 0.2}em`,
                                            }}
                                        >
                      <span className="academiaHeader__supervisor-line">Supervised by</span>
                                            {position.supervisors.map((supervisor, idx) => (
                                                <span key={idx} className="academiaHeader__supervisor-name">
                          <a
                              href={supervisor.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="academiaHeader__supervisor-link"
                          >
                            {supervisor.name}
                          </a>
                        </span>
                                            ))}
                    </span>
                                        <span> at </span>
                                        <a
                                            href={position.companyLink}
                                            className="academiaHeader__company-link"
                                        >
                                            {position.companyName}
                                        </a>
                                    </h2>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {showTabs && (
                    <nav className="academiaHeader__tabs-container">
                        {tabs.map((tab, index) => (
                            <a
                                key={index}
                                className="academiaHeader__tab-link"
                                onClick={() => onTabClick(tab)}
                            >
                                {tab}
                            </a>
                        ))}
                    </nav>
                )}
            </SnakeEffectContainer>
        </header>
    );
};

AcademiaHeader.propTypes = {
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
    tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
    onCompassClick: PropTypes.func.isRequired,
    onTabClick: PropTypes.func.isRequired,
    showTabs: PropTypes.bool,
    showInfo: PropTypes.bool,
    showTitle: PropTypes.string,
    positionIndex: PropTypes.number,
    snakeEffectProps: PropTypes.shape({
        duration: PropTypes.number,
        delayIncrement: PropTypes.number,
        initialDelayRatio: PropTypes.number,
    }),
    customSrc: PropTypes.string,
};

export default AcademiaHeader;
