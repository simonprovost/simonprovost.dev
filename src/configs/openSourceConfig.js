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
        {name: "Research", path: "/research"},
        {name: "Connect", path: "/connect"},
        {name: "Blog", path: "/blog"},
    ],
    posts: [
        {
            titles: ["Urban Mapper"],
            details: ["2025 · Spatio Urban Analysis"],
            media: {
                type: "video",
                src: "videos/urban_mapper.webm",
                aspect: "landscape",
            },
            url: "https://github.com/VIDA-NYU/UrbanMapper",
        },
        {
            titles: ["Auto-Sklong"],
            details: ["2024 · AutoML for Longitudinal Data"],
            media: {
                type: "video",
                src: "videos/auto_sklong.webm",
                aspect: "landscape",
            },
            url: "https://github.com/simonprovost/auto-sklong",
        },
        {
            titles: ["Scikit-Longitudinal"],
            details: ["2023 · ML for Longitudinal Data"],
            media: {
                type: "video",
                src: "videos/sklong.webm",
                aspect: "landscape",
            },
            url: "https://github.com/simonprovost/scikit-longitudinal",
        },
        {
            titles: ["GAMA x SMAC3"],
            details: ["2023 · Open-Source Contributions"],
            media: {
                type: "video",
                src: "videos/github_1.webm",
                aspect: "landscape",
            },
            url: "https://github.com/openml-labs/gama/pull/212",
        },
        {
            titles: ["GAMA x ConfigSpace"],
            details: ["2022 · Open-Source Contributions"],
            media: {
                type: "video",
                src: "videos/github_2.webm",
                aspect: "landscape",
            },
            url: "https://github.com/openml-labs/gama/pull/210",
        },
    ],
};

export default openSourceConfig;
