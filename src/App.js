import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import Blog from "./screens/blog/blog";
import BlogPost from "./components/blogPost/blogPost";
import { injectSpeedInsights } from "@vercel/speed-insights";

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
                <Route path="/blog/" element={<Blog />} />
                <Route path="/blog/:id/:title" element={<BlogPost />} />
            </Routes>
            <Analytics />
        </Router>
    );
};

export default App;
