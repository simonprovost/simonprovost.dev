import React, { useCallback, useEffect, useMemo, useState } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import researchConfig from "./configs/researchConfig";
import connectConfig from "./configs/connectConfig";
import aboutConfig from "./configs/aboutConfig";
import openSourceConfig from "./configs/openSourceConfig";
import talksConfig from "./configs/talksConfig";
import creditsConfig from "./configs/creditsConfig";
import OpenSource from "./screens/openSource/openSource";
import Talks from "./screens/talks/talks";
import About from "./screens/about/about";
import Research from "./screens/research/research";
import Connect from "./screens/connect/connect";
import Credits from "./screens/credits/credits";
import { injectSpeedInsights } from "@vercel/speed-insights";
import ThemeToggle from "./components/themeToggle/themeToggle";

function RedirectToSubstack() {
  useEffect(() => {
    window.location.replace("https://simonprovost.substack.com/");
  }, []);

  return null;
}

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
                <Route path="/research" element={<Research {...researchConfig} />} />
                <Route path="/connect" element={<Connect {...connectConfig} />} />
                <Route path="/credits" element={<Credits {...creditsConfig} />} />
                <Route path="/blog/" element={<RedirectToSubstack />} />
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
