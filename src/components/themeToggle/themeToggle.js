import React from "react";
import PropTypes from "prop-types";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import "./themeToggle.css";

const ThemeToggle = ({theme, onToggle}) => {
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            className="themeToggle__button"
            onClick={onToggle}
            aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <span
                className={`themeToggle__icon themeToggle__icon--${isDark ? "moon" : "sun"}`}
                aria-hidden="true"
            >
                {isDark ? (
                    <DarkModeRoundedIcon className="themeToggle__glyph" fontSize="inherit" />
                ) : (
                    <LightModeRoundedIcon className="themeToggle__glyph" fontSize="inherit" />
                )}
            </span>
        </button>
    );
};

ThemeToggle.propTypes = {
    theme: PropTypes.oneOf(["light", "dark"]).isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default ThemeToggle;
