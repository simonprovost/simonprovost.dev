import React, {Component} from "react";
import PropTypes from "prop-types";
import "./about.css";
import aboutConfig from "../../configs/aboutConfig";
import AcademiaHeader from "../../components/academiaHeader/academiaHeader";
import SnakeEffectContainer from "../../components/snakeEffect/snakeEffect";
import GradientCard from "../../components/GradientCard/GradientCard";

class About extends Component {
    static defaultProps = {
        professional_positions: aboutConfig.professional_positions,
    };

    handleDownload = () => {
        window.location.href = this.props.cv_link;
    };

    personalisedAbout = () => {
        return (
            <div className="about__container">
                <section className="about__intro-section">
                    <p>
                        <em>In the complex interplay</em>
                    </p>
                    <p>
                        <em>between information and insight,</em>
                    </p>
                    <p>
                        <em>I architect Automated Machine Learning systems</em>
                    </p>
                    <p>
                        <em>that venture into unraveled scenarios.</em>
                    </p>
                    <p>
                        <em>From Bayesian Optimisation to Evolutionary Algorithms,</em>
                    </p>
                    <p>
                        <em>my work thrives on curiosity and bold exploration.</em>
                    </p>
                    <br/>
                    <p>
                        <em>But it is more than research.</em>
                    </p>
                    <p>
                        <em>It is about the tools we craft,</em>
                    </p>
                    <p>
                        <em>the models we deploy,</em>
                    </p>
                    <p>
                        <em>the open-source contributions that outlive the printed paper.</em>
                    </p>
                    <br/>
                    <p>
                        <em>From robustly typed Python libraries,</em>
                    </p>
                    <p>
                        <em>to seamless workflows for domain-experts,</em>
                    </p>
                    <p>
                        <em>my mission is to democratise innovation—</em>
                    </p>
                    <p>
                        <em>one line of code at a time.</em>
                    </p>
                </section>

                <section className="about__personal-section">
                    <div className="about__personal-content">
                        <p>Beyond research, I love cycling around London!</p>
                        <p>
                            Born in the sunny <em>South of France</em>, I often wonder how I
                            swapped 360 days of sun a year for London's drizzle.
                        </p>
                    </div>
                    <div className="about__personal-content">
                        <p>
                            I like reading <em>useful</em> books and enjoy playing African
                            percussion (for decades!). I also play Kendama, used to practice
                            martial arts, as well as to compete in Slackline and Jumpline.
                        </p>
                        <p>These hobbies keep my mind sharp and curiosity alive.</p>
                    </div>
                </section>

                <section className="about__gradient-card-container">
                    <SnakeEffectContainer
                        duration={0.5}
                        delayIncrement={0.05}
                        initialDelay={0.1}
                        applyToSubchildren={false}
                        parentStyle="about__gradient-card-wrapper"
                        childStyle="child-without-transform"
                    >
                        <GradientCard/>
                    </SnakeEffectContainer>
                </section>

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

                <footer className="about__closing-thoughts">
                    <p>
                        ``My work resides at the convergence of inquiry and creativity,
                        perpetually probing the boundaries of possibility and rethinking the
                        function of machine learning in helping Fellow beings.`` <br/> - Simon
                        Provost, 2024
                    </p>
                </footer>
            </div>
        );
    };

    handleCompassClick = () => {
        window.open("/", "_self");
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
                            customSrc="/rive/head_sub_pages.riv"
                            isSubpage={true}
                        />
                        <div className="about__content-container">
                            <SnakeEffectContainer
                                duration={0.5}
                                delayIncrement={0.05}
                                initialDelay={0.1}
                                applyToSubchildren={true}
                                parentStyle="parent-container-absolute"
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
    professional_positions: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            companyName: PropTypes.string.isRequired,
            companyLink: PropTypes.string.isRequired,
            supervisors: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    link: PropTypes.string.isRequired,
                })
            ).isRequired,
        })
    ),
};

export default About;