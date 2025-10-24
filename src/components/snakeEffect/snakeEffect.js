import React, {useRef} from "react";
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
    const hasAnimatedRef = useRef(false);
    const shouldAnimateChildren = !hasAnimatedRef.current;
    hasAnimatedRef.current = true;

    const applySnakeEffect = (elements, parentDelay) => {
        let delay = parentDelay;
        const newElements = [];

        React.Children.forEach(elements, (child) => {
            if (!React.isValidElement(child)) {
                newElements.push(child);
                return;
            }

            if (shouldAnimateChildren) {
                delay += delayIncrement;
            }
            const currentDelay = delay;

            let newChild = React.cloneElement(child, {
                style: {
                    ...child.props.style,
                    ...(shouldAnimateChildren
                        ? {
                            animationDelay: `${currentDelay}s`,
                            animationDuration: `${duration}s`,
                        }
                        : {
                            animationDelay: "0s",
                            animationDuration: "0s",
                            animationName: "none",
                        }),
                },
                className: [
                    child.props.className || "",
                    shouldAnimateChildren && childStyle ? childStyle : "",
                    !shouldAnimateChildren ? "snake-effect-child--static" : "",
                ]
                    .filter(Boolean)
                    .join(" "),
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

        return [newElements, delay];
    };

    const [animatedChildren, lastDelay] = applySnakeEffect(children, initialDelay);

    const totalDuration = shouldAnimateChildren ? lastDelay + duration : 0;

    const containerStyle = {
        animationName: shouldAnimateChildren ? "blurFade" : "none",
        animationDuration: shouldAnimateChildren ? `${totalDuration}s` : "0s",
        animationFillMode: "forwards",
        animationTimingFunction: "ease-out",
        willChange: shouldAnimateChildren ? "filter" : "auto",
    };

    return (
        <div
            className={[
                parentStyle,
                !shouldAnimateChildren ? "snake-effect-container--static" : "",
            ]
                .filter(Boolean)
                .join(" ")}
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
