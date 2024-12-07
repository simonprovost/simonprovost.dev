import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import "./snakeEffect.css";

const SnakeEffectContainer = ({
                                  children,
                                  duration = 0.8,
                                  delayIncrement = 0.1,
                                  initialDelay = 0,
                                  applyToSubchildren = false,
                                  parentStyle = "parent-container",
                                  childStyle = "child",
                              }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    let totalDuration = initialDelay;

    const applySnakeEffect = (elements, parentDelay) => {
        let delay = parentDelay;
        const newElements = [];

        React.Children.forEach(elements, (child) => {
            if (!React.isValidElement(child)) {
                newElements.push(child);
                return;
            }

            delay += delayIncrement;
            const currentDelay = delay;

            let newChild = React.cloneElement(child, {
                style: {
                    ...child.props.style,
                    animationDelay: `${currentDelay}s`,
                    animationDuration: `${duration}s`,
                },
                className: `${child.props.className || ""} ${childStyle}`,
            });

            if (applyToSubchildren) {
                const childElements = React.Children.toArray(child.props.children);
                if (childElements.length > 0) {
                    const [childrenWithEffects, updatedDelay] = applySnakeEffect(
                        childElements,
                        delay
                    );
                    delay = updatedDelay;

                    newChild = React.cloneElement(newChild, {
                        children: childrenWithEffects,
                    });
                }
            }

            newElements.push(newChild);
        });

        totalDuration = delay + duration;

        return [newElements, delay];
    };

    const [animatedChildren] = applySnakeEffect(children, initialDelay);

    const containerStyle = {
        animationName: 'blurFade',
        animationDuration: `${totalDuration}s`,
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-out',
        willChange: 'filter',
    };

    return (
        <div
            className={`${parentStyle} ${isVisible ? "visible" : ""}`}
            style={containerStyle}
        >
            {animatedChildren}
        </div>
    );
};

SnakeEffectContainer.propTypes = {
    children: PropTypes.node.isRequired,
    duration: PropTypes.number,
    delayIncrement: PropTypes.number,
    initialDelay: PropTypes.number,
    applyToSubchildren: PropTypes.bool,
    parentStyle: PropTypes.string,
    childStyle: PropTypes.string,
};

export default SnakeEffectContainer;
