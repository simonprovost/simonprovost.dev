import externalContributionsLink from "./externalContributionsLink";

const aboutConfig = {
    showTitle: "About",
    cv_link: "https://drive.google.com/file/d/109UYJLIJ0qp2km9WtfPm5HEbb4O5voiD/view?usp=sharing",
    externalContributionsLink,
    professional_positions: [
        {
            role: "PhD student",
            organization: "University of Kent",
            organizationLink: "https://www.kent.ac.uk/",
            gradientLines: [
                {text: "PhD student"},
                {text: "@ UKC, AIDA lab", italic: true},
            ],
        },
        {
            role: "Inc. Research Intern",
            organization: "University of Edinburgh",
            organizationLink: "https://life-epi-psych.github.io/",
            gradientLines: [
                {text: "Inc. Research Intern"},
                {text: "@ University of Edinburgh, LEAP group", italic: true},
            ],
        },
        {
            role: "Former Researcher",
            organization: "NYU, VIDA Lab",
            organizationLink: "https://engineering.nyu.edu/vida",
            gradientLines: [
                {text: "Former Researcher"},
                {text: "@ NYU, VIDA lab", italic: true},
            ],
        },
        {
            role: "Former Researcher",
            organization: "NHS (via University of Kent)",
            organizationLink: "https://www.england.nhs.uk/",
            gradientLines: [
                {text: "Former Researcher"},
                {text: "@ NHS, via UoK", italic: true},
            ],
        },
    ],
};

export default aboutConfig;
