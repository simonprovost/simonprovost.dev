
import React from "react";
import PropTypes from "prop-types";
import AcademiaHeader from "../../components/academiaHeader/academiaHeader";
import SocialsList from "../../components/socialsList/socialsList";
import connectConfig from "../../configs/connectConfig";
import "./connect.css";

class Connect extends React.Component {
  handleCompassClick = () => {
    window.open("/", "_self");
  };

  render() {
    const { showTitle, contactMethods } = this.props;

    return (
      <div className="connect__container">
        <div className="connect__header-and-content-container">
          <div className="connect__header-and-content">
            <AcademiaHeader
              name="Connect"
              positions={[]}
              tabs={[]}
              showInfo={false}
              showTabs={false}
              showTitle={showTitle}
              onCompassClick={this.handleCompassClick}
              onTabClick={() => {}}
              positionIndex={0}
              snakeEffectProps={{
                duration: 0.3,
                delayIncrement: 0.08,
                initialDelayRatio: 1,
              }}
              customSrc="/rive/head_sub_pages.riv"
              isSubpage={true}
            />
            <div className="connect__content-container">
              <SocialsList
                socials={contactMethods}
                positionIndex={1}
                snakeEffectProps={{
                  duration: 0.5,
                  delayIncrement: 0.1,
                  initialDelayRatio: 0.2,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Connect.propTypes = {
  showTitle: PropTypes.string.isRequired,
  contactMethods: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Connect.defaultProps = {
  ...connectConfig,
};

export default Connect;
