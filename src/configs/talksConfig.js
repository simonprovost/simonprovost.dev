const talksConfig = {
    showTitle: "Talks",
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
        {name: "Talks", path: "/talks"},
        {name: "Connect", path: "/connect"},
        {name: "Blog", path: "/blog"},
    ],
    posts: [
        {
            id: "automated-ml-aida-2025",
            titles: ["Automated Machine Learning For Longitudinal Classification"],
            details: ["University of Kent @ AIDA Lab", "Nov. 2025"],
            media: {
                type: "iframe",
                src: "https://embed.figma.com/slides/87E2IvG37lkmcxHxuUsSHW/Slides-AIDA?node-id=1-288&embed-host=share",
                aspect: "landscape",
                title: "AIDA Slides",
            },
        },
    ],
};

export default talksConfig;
