import React, { useCallback, useEffect, useMemo, useState } from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import publicationsConfig from "./configs/publicationsConfig";
import peerReviewsConfig from "./configs/peerReviewsConfig";
import connectConfig from "./configs/connectConfig";
import aboutConfig from "./configs/aboutConfig";
import openSourceConfig from "./configs/openSourceConfig";
import talksConfig from "./configs/talksConfig";
import OpenSource from "./screens/openSource/openSource";
import Talks from "./screens/talks/talks";
import About from "./screens/about/about";
import Publications from "./screens/publications/publications";
import PeerReviews from "./screens/peerReviews/peerReviews";
import Connect from "./screens/connect/connect";
import { injectSpeedInsights } from "@vercel/speed-insights";
import ThemeToggle from "./components/themeToggle/themeToggle";

const applyBodyClass = (theme) => {
    if (typeof document === "undefined") {
        return;
    }

    const {body} = document;
    body.classList.remove("theme-light", "theme-dark");
    body.classList.add(`theme-${theme}`);
};

const getInitialTheme = () => {
    if (typeof window === "undefined") {
        return "light";
    }

    let storedTheme = null;

    try {
        storedTheme = window.localStorage.getItem("theme");
    } catch (error) {
        storedTheme = null;
    }

    if (storedTheme === "light" || storedTheme === "dark") {
        applyBodyClass(storedTheme);
        return storedTheme;
    }

    const defaultTheme = "light";
    applyBodyClass(defaultTheme);
    return defaultTheme;
};

const App = () => {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        injectSpeedInsights();
    }, []);

    useEffect(() => {
        applyBodyClass(theme);
        try {
            window.localStorage.setItem("theme", theme);
        } catch (error) {
            // ignore storage access issues
        }
    }, [theme]);

    useEffect(() => {
        if (typeof window.matchMedia !== "function") {
            return () => undefined;
        }

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (event) => {
            let storedTheme = null;

            try {
                storedTheme = window.localStorage.getItem("theme");
            } catch (error) {
                storedTheme = null;
            }
            if (storedTheme === "light" || storedTheme === "dark") {
                return;
            }
            setTheme(event.matches ? "dark" : "light");
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handleChange);
        } else {
            mediaQuery.addListener(handleChange);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener("change", handleChange);
            } else {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((current) => (current === "dark" ? "light" : "dark"));
    }, []);

    const routerRoutes = useMemo(() => (
        <Routes>
                <Route path="/" element={<OpenSource {...openSourceConfig} />} />
                <Route path="/talks" element={<Talks {...talksConfig} theme={theme} />} />
                <Route path="/about" element={<About {...aboutConfig} />} />
                <Route path="/publications" element={<Publications {...publicationsConfig} />} />
                <Route path="/research" element={<Navigate to="/publications" replace />} />
                <Route path="/peer-reviews" element={<PeerReviews {...peerReviewsConfig} />} />
                <Route path="/connect" element={<Connect {...connectConfig} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    ), [theme]);

    return (
        <Router>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            {routerRoutes}
            <Analytics />
        </Router>
    );
};

export default App;
