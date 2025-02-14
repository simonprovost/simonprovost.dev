import React, {useEffect} from "react";
import {Alignment, Fit, Layout, useRive, useStateMachineInput,} from "@rive-app/react-canvas";
import PropTypes from "prop-types";

const RiveHeadTracking = ({src, className, stateMachineName, isSubpage}) => {
    const {rive, RiveComponent} = useRive({
        src,
        autoplay: true,
        stateMachines: stateMachineName,
        layout: new Layout({
            fit: Fit.Contain,
            alignment: Alignment.Center,
        }),
    });

    const xAxisInput = useStateMachineInput(rive, stateMachineName, "xAxis", 0);
    const yAxisInput = useStateMachineInput(rive, stateMachineName, "yAxis", 0);
    const isClicked = useStateMachineInput(rive, stateMachineName, "isClicked");
    const isBack = useStateMachineInput(rive, stateMachineName, "isBack");

    const updateMousePosition = (x, y) => {
        if (xAxisInput && yAxisInput) {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            xAxisInput.value = Math.max(0, Math.min((x / windowWidth) * 100, 100));
            yAxisInput.value = Math.max(0, Math.min(100 - (y / windowHeight) * 100, 100));
        }
    };

    useEffect(() => {
        const handleInitialMousePosition = (e) => {
            const mouseX = e.clientX || window.innerWidth / 2;
            const mouseY = e.clientY || window.innerHeight / 2;

            updateMousePosition(mouseX, mouseY);
        };

        window.addEventListener("mousemove", handleInitialMousePosition, {once: true});
    }, [xAxisInput, yAxisInput]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            updateMousePosition(e.clientX, e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [xAxisInput, yAxisInput]);

    useEffect(() => {
        const handleMouseClick = () => {
            if (isClicked) {
                isClicked.fire();
            }
        };

        window.addEventListener("click", handleMouseClick);
        return () => window.removeEventListener("click", handleMouseClick);
    }, [isClicked]);

    useEffect(() => {
        let timeoutId;

        if (isSubpage && isBack) {
            isBack.value = true;

            timeoutId = setTimeout(() => {
                isBack.value = false;
            }, 8000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isSubpage, isBack]);

    return <RiveComponent className={className}/>;
};

RiveHeadTracking.propTypes = {
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    stateMachineName: PropTypes.string.isRequired,
    isSubpage: PropTypes.bool,
};

RiveHeadTracking.defaultProps = {
    className: "",
    isSubpage: false,
};

export default RiveHeadTracking;
