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
            id: "sepwav-stacking-ai-2025",
            titles: ["SepWav w/ Stacking for Longitudinal Classification"],
            details: ["AI-2025 (BCS SGAI), Cambridge, UK", "Dec. 2025"],
            media: {
                type: "iframe",
                src: "https://embed.figma.com/slides/kwRQKCUvF3bhJ5IZEU1CrY/Slides-BCS-SGAI?node-id=1-295&embed-host=share",
                aspect: "landscape",
                title: "AI-2025 Slides",
            },
        },
        {
            id: "automated-ml-aida-2025",
            titles: ["Automated Machine Learning For Longitudinal Classification"],
            details: ["AIDA (UKC), Canterbury, UK", "Nov. 2025"],
            media: {
                type: "iframe",
                src: "https://embed.figma.com/slides/87E2IvG37lkmcxHxuUsSHW/Slides-AIDA?node-id=1-288&embed-host=share",
                aspect: "landscape",
                title: "AIDA Slides",
            },
        },
        {
            id: "auto-sklong-bibm-2024",
            titles: ["Auto-Sklong: A New AutoML System for Longitudinal Classification"],
            details: ["BIBM", "Lisbon, Portugal", "Dec. 2024"],
            media: {
                type: "iframe",
                src: "https://embed.figma.com/slides/hXJUNQENx8LV7jucKDZlR8/BIBM-2024?node-id=1-588&embed-host=share",
                aspect: "landscape",
                title: "BIBM Slides",
            },
        },
    ],
};

export default talksConfig;
