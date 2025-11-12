import React from "react";
import {useNavigate} from "react-router-dom";

const withNavigation = (Component) => {
    const ComponentWithNavigation = (props) => {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };

    const componentName = Component.displayName || Component.name || "Component";
    ComponentWithNavigation.displayName = `withNavigation(${componentName})`;

    return ComponentWithNavigation;
};

export default withNavigation;
