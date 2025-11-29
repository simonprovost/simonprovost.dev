import React from "react";
import PropTypes from "prop-types";
import { ReactLenis } from "@studio-freight/react-lenis";

const SmoothScroll = ({ children }) => (
    <ReactLenis
        root
        options={{
            lerp: 0.1,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        }}
    >
        {children}
    </ReactLenis>
);

SmoothScroll.propTypes = {
    children: PropTypes.node,
};

export default SmoothScroll;
