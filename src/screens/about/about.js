import React, {Component} from "react";
import PropTypes from "prop-types";
import "./about.css";
import aboutConfig from "../../configs/aboutConfig";
import DownloadCV from "../../components/riveDownloadCV/riveDownloadCV";
import AcademiaHeader from "../../components/academiaHeader/academiaHeader";
import SnakeEffectContainer from "../../components/snakeEffect/snakeEffect";

class About extends Component {
    static defaultProps = {
        professional_positions: aboutConfig.professional_positions,
    };

    handleDownload = () => {
        window.location.href = this.props.cv_link;
    };

    personalisedAbout = (professional_positions) => {
        return (
            <div className="about__container">
                <section className="about__intro-section">
                    <p><em>In the complex interplay</em></p>
                    <p><em>between information and insight,</em></p>
                    <p><em>I architect Automated Machine Learning systems</em></p>
                    <p><em>that venture into unraveled scenarios.</em></p>
                    <p><em>From Bayesian Optimisation to Evolutionary Algorithms,</em></p>
                    <p><em>my work thrives on curiosity and bold exploration.</em></p>
                    <br/>
                    <p><em>But it is more than research.</em></p>
                    <p><em>It is about the tools we craft,</em></p>
                    <p><em>the models we deploy,</em></p>
                    <p><em>the open-source contributions that outlive the printed paper.</em></p>
                    <br/>
                    <p><em>From robustly typed Python libraries,</em></p>
                    <p><em>to seamless workflows for domain-experts,</em></p>
                    <p><em>my mission is to democratise innovation—</em></p>
                    <p><em>one line of code at a time.</em></p>
                </section>

                <section className="about__personal-section">
                    <div className="about__personal-content">
                        <p>
                            Beyond research, I love cycling around London—and soon, New York City.
                        </p>
                        <p>
                            Born in the sunny <em>South of France</em>, I often wonder how I swapped
                            360 days of sun a year for London's drizzle.
                        </p>
                    </div>
                    <div className="about__personal-content">
                        <p>
                            I like reading <em>useful</em> books and enjoy playing African percussion (for decades!). I
                            also play
                            Kendama, used to practice martial
                            arts, as well as to compete in Slackline and Jumpline.
                        </p>
                        <p>
                            These hobbies keep my mind sharp and my curiosity alive.
                        </p>
                    </div>
                </section>

                <section className="about__positions-container">
                    {professional_positions.map((position, index) => (
                        <div key={index} className="about__position-grid">
                            <div className="about__position-container">
                                <h2 className="about__position">
                                    <span>{position.title}</span>
                                    <span
                                        className="about__supervised-container"
                                        style={{
                                            top: `-${0.5 + position.supervisors.length * 0.2}em`,
                                        }}
                                    >
                    <span className="about__supervisor-line">Supervised by:</span>
                                        {position.supervisors.map((supervisor, idx) => (
                                            <span key={idx} className="about__supervisor-name">
                        <a
                            href={supervisor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="about__supervisor-link"
                        >
                          {supervisor.name}
                        </a>
                      </span>
                                        ))}
                  </span>
                                    <a href={position.companyLink} className="about__company-link">
                                        {position.companyName}
                                    </a>
                                </h2>
                            </div>
                        </div>
                    ))}
                </section>

                <div className="about__download-cv-container">
                    <DownloadCV onDownload={this.handleDownload}/>
                </div>

                <footer className="about__closing-thoughts">
                    <p>
                        ``My work resides at the convergence of inquiry and creativity, perpetually probing the
                        boundaries
                        of possibility and rethinking the function of machine learning in helping Fellow
                        beings.`` <br/> - Simon Provost, 2024
                    </p>
                </footer>
            </div>
        )
    };

    handleCompassClick = () => {
        window.open("/", "_self");
    }

    render() {
        const {showTitle, professional_positions} = this.props;

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
                                parentStyle="parent-container-absolute"
                                childStyle="child-without-transform"
                            >
                                {this.personalisedAbout(professional_positions)}
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
