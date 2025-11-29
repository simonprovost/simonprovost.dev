const openSourceConfig = {
    name: "Simon Provost",
    positions: [
        {
            title: "Ph.D.",
            supervisors: [
                {
                    name: "Prof. Alex A. Freitas",
                    link: "https://scholar.google.co.uk/citations?user=NEP3RPYAAAAJ",
                },
            ],
            companyName: "UKC",
            companyLink: "https://www.kent.ac.uk/",
        },
    ],
    tabs: [
        {name: "About", path: "/about"},
        {name: "Publications", path: "/publications"},
        {name: "Peer-Reviews", path: "/peer-reviews"},
        {name: "Talks", path: "/talks"},
        {name: "Connect", path: "/connect"},
    ],
    posts: [
        {
            titles: ["Scikit-Longitudinal"],
            details: ["70+ stars | Sklearn-like Longitudinal ML Library"],
            media: {
                type: "video",
                src: "videos/sklong.webm",
                aspect: "landscape",
            },
            url: "https://github.com/simonprovost/scikit-longitudinal",
        },
        {
            titles: ["Auto-Sklong"],
            details: ["40+ stars | AutoML system for Longitudinal ML"],
            media: {
                type: "video",
                src: "videos/auto_sklong.webm",
                aspect: "landscape",
            },
            url: "https://github.com/simonprovost/auto-sklong",
        },
        {
            titles: ["Urban Mapper"],
            details: ["60+ stars | Sklearn-like Spatio-Urban Analysis"],
            media: {
                type: "video",
                src: "videos/urban_mapper.webm",
                aspect: "landscape",
            },
            url: "https://github.com/VIDA-NYU/UrbanMapper",
        },
        {
            titles: ["(M)odel-(C)ontext-(P)rotocols Orchestrator"],
            details: ["10+ stars | Stack your fav. MCPs"],
            media: {
                type: "video",
                src: "videos/mcpstack.webm",
                aspect: "landscape",
            },
            url: "https://github.com/MCP-Pipeline/MCPStack",
        },
        {
            titles: ["AutoDDG: From POC to Modern Python Library"],
            details: ["Accepted | Open-Source @ NYU (VIDA)"],
            media: {
                type: "video",
                src: "videos/github_3.tiny.webm",
                aspect: "landscape",
            },
            url: "https://github.com/VIDA-NYU/AutoDDG/pull/4",
        },
        {
            titles: ["AutoDDG: Multi-LLM Providers & Generators"],
            details: ["In-Review | Open-Source @ NYU (VIDA)"],
            media: {
                type: "video",
                src: "videos/github_4.tiny.webm",
                aspect: "landscape",
            },
            url: "https://github.com/VIDA-NYU/AutoDDG/pull/6",
        },
        {
            titles: ["GAMA x SMAC3"],
            details: ["In-Review | Open-Source @ TU/e (AMORE)"],
            media: {
                type: "video",
                src: "videos/github_1.tiny.webm",
                aspect: "landscape",
            },
            url: "https://github.com/openml-labs/gama/pull/212",
        },
        {
            titles: ["GAMA x ConfigSpace"],
            details: ["In-Review | Open-Source @ TU/e (AMORE)"],
            media: {
                type: "video",
                src: "videos/github_2.tiny.webm",
                aspect: "landscape",
            },
            url: "https://github.com/openml-labs/gama/pull/210",
        },
    ],
};

export default openSourceConfig;
