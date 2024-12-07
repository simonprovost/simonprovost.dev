import React from "react";
import { useRive } from "@rive-app/react-canvas";
import PropTypes from "prop-types";

const RiveLoader = ({ src, className }) => {
    const { RiveComponent } = useRive({
        src: `${process.env.PUBLIC_URL}/${src}`,
        autoplay: true,
    });

    return (
        <div className={className}>
            <RiveComponent />
        </div>
    );
};

RiveLoader.propTypes = {
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default RiveLoader;
