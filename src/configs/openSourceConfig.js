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
        // { name: "Talks", path: "/talks" },
        {name: "Connect", path: "/connect"},
        {name: "Blog", path: "/blog"},
    ],
    posts: [
        {
            title: "Auto-Sklong",
            details: "2024 · AutoML for Longitudinal Data",
            media: {
                type: "video",
                src: "videos/auto_sklong.mp4",
                aspect: "landscape",
            },
            url: "https://github.com/simonprovost/auto-sklong",
        },
        {
            title: "Scikit-Longitudinal",
            details: "2023 · ML for Longitudinal Data",
            media: {
                type: "video",
                src: "videos/sklong.mp4",
                aspect: "landscape",
            },
            url: "https://github.com/simonprovost/scikit-longitudinal",
        },
        // {
        //   title: "Scikit-Lexicographical-Trees",
        //   details: "2023 · Scikit-learn Implm. of Lexicographical Trees",
        //   media: {
        //     type: "image",
        //     src: "scikit_lexicographical_trees.jpeg",
        //     aspect: "landscape",
        //   },
        //   url: "https://github.com/simonprovost/scikit-lexicographical-trees",
        // },
        {
            title: "GAMA x SMAC3",
            details: "2023 · Open-Source Contributions",
            media: {
                type: "video",
                src: "videos/github_1.mp4",
                aspect: "landscape",
            },
            url: "https://github.com/openml-labs/gama/pull/212",
        },
        {
            title: "GAMA x ConfigSpace",
            details: "2022 · Open-Source Contributions",
            media: {
                type: "video",
                src: "videos/github_2.mp4",
                aspect: "landscape",
            },
            url: "https://github.com/openml-labs/gama/pull/210",
        },
    ],
};

export default openSourceConfig;
