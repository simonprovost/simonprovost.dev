import React from "react";
import {useRive, useStateMachineInput} from "@rive-app/react-canvas";
import PropTypes from "prop-types";

const DownloadCV = ({onDownload}) => {
    const {rive, RiveComponent} = useRive({
        src: `${process.env.PUBLIC_URL}/rive/download_cv.riv`,
        stateMachines: ["CV"],
        autoplay: true,
    });

    const downloadInput = useStateMachineInput(rive, "CV", "downloaded");

    const handleClick = () => {
        if (downloadInput) {
            downloadInput.value = true;
        }

        if (onDownload) {
            onDownload();
        }
    };

    return (
        <div onClick={handleClick} style={{width: '100%', height: '100%'}}>
            <RiveComponent/>
        </div>
    );
};

DownloadCV.propTypes = {
    onDownload: PropTypes.func.isRequired,
};

export default DownloadCV;
