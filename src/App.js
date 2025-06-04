import React, { useEffect } from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import researchConfig from "./configs/researchConfig";
import connectConfig from "./configs/connectConfig";
import aboutConfig from "./configs/aboutConfig";
import openSourceConfig from "./configs/openSourceConfig";
import creditsConfig from "./configs/creditsConfig";
import OpenSource from "./screens/openSource/openSource";
import About from "./screens/about/about";
import Research from "./screens/research/research";
import Connect from "./screens/connect/connect";
import Credits from "./screens/credits/credits";
import { injectSpeedInsights } from "@vercel/speed-insights";

function RedirectToSubstack() {
  useEffect(() => {
    window.location.replace("https://simonprovost.substack.com/");
  }, []);

  return null;
}

const App = () => {
    useEffect(() => {
        injectSpeedInsights();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<OpenSource {...openSourceConfig} />} />
                <Route path="/about" element={<About {...aboutConfig} />} />
                <Route path="/research" element={<Research {...researchConfig} />} />
                <Route path="/connect" element={<Connect {...connectConfig} />} />
                <Route path="/credits" element={<Credits {...creditsConfig} />} />
                <Route path="/blog/" element={<RedirectToSubstack />} />
            </Routes>
            <Analytics />
        </Router>
    );
};

export default App;
