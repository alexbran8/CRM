import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    if(error.message.indexOf('Loading chunk') >= 0)
    { 
      return { hasError: true };
    }
    return { hasError: false }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div> Network Error Occurred! Try to refresha nd start again! </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.object,
};

export default ErrorBoundary;