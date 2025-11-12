import React, {Component} from "react";
import PropTypes from "prop-types";
import "./about.css";
import aboutConfig from "../../configs/aboutConfig";
import AcademiaHeader from "../../components/academiaHeader/academiaHeader";
import SnakeEffectContainer from "../../components/snakeEffect/snakeEffect";
import GradientCard from "../../components/GradientCard/GradientCard";
import withNavigation from "../../utils/withNavigation";

class About extends Component {
    static defaultProps = {
        professional_positions: aboutConfig.professional_positions,
    };

    state = {
        isMobile: false,
    };

    componentDidMount() {
        this.updateIsMobile();
        if (typeof window !== "undefined") {
            window.addEventListener("resize", this.updateIsMobile);
        }
    }

    componentWillUnmount() {
        if (typeof window !== "undefined") {
            window.removeEventListener("resize", this.updateIsMobile);
        }

    }

    handleDownload = () => {
        window.location.href = this.props.cv_link;
    };

    updateIsMobile = () => {
        if (typeof window === "undefined") {
            return;
        }

        const width = window.innerWidth;
        const isMobile = width <= 768;

        this.setState((prevState) => (
            prevState.isMobile === isMobile
                ? null
                : {isMobile}
        ));
    };

    personalisedAbout = () => {
        const {isMobile} = this.state;

        return (
            <div className="about__container">
                <section className="about__intro-section">
                    <p>
                        <em>My Research</em> explores the frontiers of <em>(Automated) Machine learning, </em>
                        applied to <em>pressing </em>
                        healthcare challenges, altogether while <em>building & maintaining</em> their open-source scientific discoveries
                    </p>
                </section>
                <section className="about__personal-section">
                    <div className="about__personal-content">
                        <p>
                            My Ph.D. focuses on developing <em>tailored Machine Learning</em> algorithms
                            which can model the <em> temporal dynamics</em> of <em> longitudinal healthcare data</em>.
                        </p>
                        <p>
                            Next, I am designing new search spaces and optimisation strategies for AutoML
                            in order to better capture long-term dependencies within
                            patient records — with the goal to accelerate how machine learning
                            integrates into complex, real-world healthcare environments.
                        </p>
                    </div>

                    <div className="about__personal-content">
                        <p>
                            Today, I am loving how we can tailor ML algorithms to specific
                            data structure at hand, and how <em>AutoML </em>
                            brings many diverse teams together (e.g., ML & Med. experts),
                            to make science more accessible to all.
                        </p>
                        <p>
                            For tomorrow, I’m particularly interested in experiencing co-designing <em>w/ human-in-the-loop </em>
                            (Automated) Machine Learning for healthcare challenges, ideally temporal.
                            Of course, without forgetting to push it <em>open-source</em> for the community!
                        </p>
                    </div>
                </section>

                <section className="about__personal-section">
                    <div className="about__personal-content">
                        <p>
                            Beyond research, I love cycling around <em>London</em>!
                        </p>
                        <p>
                            Born in the sunny <em>South of France</em>, I often wonder why I
                            traded <em>300+ days of sunshine</em> for London’s drizzle. But we love <em>London </em>
                            don't we?
                        </p>
                    </div>

                    <div className="about__personal-content">
                        <p>
                            I enjoy reading <em>thought-provoking</em> books, and have been playing
                            <em> African percussion</em> for decades. Also used to practice <em>Kendama</em>,
                            <em> martial arts</em>, and once competed in
                            <em> Slackline</em> and <em>Jumpline</em>.
                        </p>
                    </div>
                </section>

                {!isMobile && (
                    <section className="about__gradient-card-container">
                        <SnakeEffectContainer
                            duration={0.5}
                            delayIncrement={0.05}
                            initialDelay={0.1}
                            applyToSubchildren={false}
                            parentStyle="about__gradient-card-wrapper"
                            childStyle="child-without-transform"
                        >
                            <GradientCard positions={this.props.professional_positions}/>
                        </SnakeEffectContainer>
                    </section>
                )}

                <div className="about__download-cv-container">
                    <SnakeEffectContainer
                        duration={0.5}
                        delayIncrement={0.05}
                        initialDelay={0.1}
                        applyToSubchildren={false}
                        parentStyle="about__download-cv-wrapper"
                        childStyle="about__download-cv-link"
                    >
                        <a href={this.props.cv_link} onClick={this.handleDownload}>
                            Download CV
                        </a>
                    </SnakeEffectContainer>
                </div>

                {!isMobile && (
                    <footer className="about__closing-thoughts">
                        <p>
                            ``My work resides at the convergence of inquiry and creativity,
                            perpetually probing the boundaries of possibility and rethinking the
                            function of machine learning in helping Fellow beings.`` <br/> - Simon
                            Provost, 2024
                        </p>
                    </footer>
                )}
            </div>
        );
    };

    handleCompassClick = () => {
        const {navigate} = this.props;
        navigate("/");
    };

    render() {
        const {showTitle} = this.props;

        return (
            <div className="about__main_container">
                <div className="about__header-and-content-container">
                    <div className="about__header-and-content">
                        <AcademiaHeader
                            name="About"
                            positions={[]}
                            tabs={[]}
                            showInfo={false}
                            showTabs={false}
                            showTitle={showTitle}
                            onCompassClick={this.handleCompassClick}
                            onTabClick={() => {
                            }}
                            positionIndex={0}
                            snakeEffectProps={{
                                duration: 0.3,
                                delayIncrement: 0.08,
                                initialDelayRatio: 1,
                            }}
                        />
                        <div className="about__content-container">
                            <SnakeEffectContainer
                                duration={0.5}
                                delayIncrement={0.05}
                                initialDelay={0.1}
                                applyToSubchildren={true}
                                parentStyle="parent-container about__content-snake-wrapper"
                                childStyle="child-without-transform"
                            >
                                {this.personalisedAbout()}
                            </SnakeEffectContainer>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

About.propTypes = {
    showTitle: PropTypes.string.isRequired,
    cv_link: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
    professional_positions: PropTypes.arrayOf(
        PropTypes.shape({
            role: PropTypes.string,
            organization: PropTypes.string,
            organizationLink: PropTypes.string,
            gradientLines: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string.isRequired,
                    italic: PropTypes.bool,
                })
            ).isRequired,
        })
    ),
};

export default withNavigation(About);
