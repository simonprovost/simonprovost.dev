import React, {useEffect, useRef} from "react";
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
    const storedChildStylesRef = useRef(new Map());
    const storedContainerStyleRef = useRef(null);
    const shouldAnimateChildren = !hasAnimatedRef.current;

    useEffect(() => {
        if (!hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
        }
    }, []);

    const applySnakeEffect = (elements, parentDelay, parentKey = "root") => {
        let delay = parentDelay;
        const newElements = [];

        React.Children.forEach(elements, (child, index) => {
            if (!React.isValidElement(child)) {
                newElements.push(child);
                return;
            }

            const childKey = `${parentKey}-${child.key ?? index}`;
            let animationStyle = storedChildStylesRef.current.get(childKey) || null;

            if (shouldAnimateChildren) {
                delay += delayIncrement;
                const currentDelay = delay;
                animationStyle = {
                    animationDelay: `${currentDelay}s`,
                    animationDuration: `${duration}s`,
                };
                storedChildStylesRef.current.set(childKey, animationStyle);
            }

            let newChild = React.cloneElement(child, {
                style: {
                    ...child.props.style,
                    ...(animationStyle || {}),
                },
                className: [
                    child.props.className || "",
                    childStyle && storedChildStylesRef.current.has(childKey) ? childStyle : "",
                ]
                    .filter(Boolean)
                    .join(" "),
            });

            if (applyToSubchildren) {
                const childElements = React.Children.toArray(child.props.children);
                if (childElements.length > 0) {
                    const [childrenWithEffects, updatedDelay] = applySnakeEffect(
                        childElements,
                        delay,
                        childKey
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

    if (shouldAnimateChildren) {
        const totalDuration = lastDelay + duration;
        storedContainerStyleRef.current = {
            animationName: "blurFade",
            animationDuration: `${totalDuration}s`,
            animationFillMode: "forwards",
            animationTimingFunction: "ease-out",
            willChange: "filter",
        };
    }

    const containerStyle = storedContainerStyleRef.current || {
        animationName: "none",
        animationDuration: "0s",
        animationFillMode: "forwards",
        animationTimingFunction: "ease-out",
        willChange: "auto",
    };

    return (
        <div
            className={[parentStyle]
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
