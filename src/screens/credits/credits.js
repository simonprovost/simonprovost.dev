import React, { Component } from "react";
import PropTypes from "prop-types";
import "./credits.css";
import AcademiaHeader from "../../components/academiaHeader/academiaHeader";
import creditsConfig from "../../configs/creditsConfig";

class Credits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveredIndex: null,
            isMobile: window.innerWidth <= 768 // Determine if mobile at initial load
        };
    }

    handleMouseEnter = (index) => {
        this.setState({ hoveredIndex: index });
    };

    handleMouseLeave = () => {
        this.setState({ hoveredIndex: null });
    };

    generateSpiralStyles = (index) => {
        const angle = index * 35;
        const radius = 80 + index * 25;
        return {
            transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
        };
    };

    handleCompassClick = () => {
        window.open("/", "_self");
    };

    render() {
        const { items, showTitle } = this.props;
        const { hoveredIndex, isMobile } = this.state;

        return (
            <div className="credits__mainContainer">
                <div className="credits__headerAndContentContainer">
                    <div className="credits__headerAndContent">
                        <div className="credits__header_z_index">
                            <AcademiaHeader
                                name="Credits"
                                positions={[]}
                                tabs={[]}
                                showInfo={false}
                                showTabs={false}
                                showTitle={showTitle}
                                onCompassClick={this.handleCompassClick}
                                onTabClick={() => {}}
                                positionIndex={0}
                                snakeEffectProps={{
                                    duration: 0.1,
                                    delayIncrement: 0.08,
                                    initialDelayRatio: 1,
                                }}
                            />
                        </div>
                        <div className="credits__contentContainer">
                            <div className="credits__container">
                                {items.map((item, index) => {
                                    const style = isMobile ? {} : this.generateSpiralStyles(index);
                                    return (
                                        <div
                                            key={index}
                                            className={`credits__item ${
                                                hoveredIndex !== null && hoveredIndex !== index
                                                    ? "credits__item--faded"
                                                    : ""
                                            }`}
                                            style={style}
                                            onMouseEnter={() => !isMobile && this.handleMouseEnter(index)}
                                            onMouseLeave={() => !isMobile && this.handleMouseLeave()}
                                        >
                                            <span className="credits__name">{item.name}</span>
                                            <div className="credits__details">
                                                <p className="credits__subtitle">{item.subtitle}</p>
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="credits__link"
                                                >
                                                    Learn More
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Credits.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            subtitle: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
    showTitle: PropTypes.string.isRequired,
};

Credits.defaultProps = {
    items: creditsConfig.items,
    showTitle: "Credits",
};

export default Credits;
