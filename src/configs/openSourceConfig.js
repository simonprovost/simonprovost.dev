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
            details: ["★ 70+ | Sklearn-Like Longitudinal Health-ML Library"],
            media: {
                type: "video",
                src: "videos/sklong.webm",
                aspect: "landscape",
            },
            url: "https://github.com/simonprovost/scikit-longitudinal",
        },
        {
            titles: ["Auto-Sklong"],
            details: ["★ 40+ | AutoML System For Health-Longitudinal ML"],
            media: {
                type: "video",
                src: "videos/auto_sklong.webm",
                aspect: "landscape",
            },
            url: "https://github.com/simonprovost/auto-sklong",
        },
        {
            titles: ["Urban Mapper"],
            details: ["★ 60+ | Sklearn-like Spatio-Urban Analysis Pipeline"],
            media: {
                type: "video",
                src: "videos/urban_mapper.webm",
                aspect: "landscape",
            },
            url: "https://github.com/VIDA-NYU/UrbanMapper",
        },
        {
            titles: ["MCP Stack"],
            details: ["★ 10+ | (M)odel-(C)ontext-(P)rotocols Orchestrator"],
            media: {
                type: "video",
                src: "videos/mcpstack.webm",
                aspect: "landscape",
            },
            url: "https://github.com/MCP-Pipeline/MCPStack",
        },
    ],
};

export default openSourceConfig;
