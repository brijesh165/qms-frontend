import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
    //   logErrorToMyService(error, errorInfo);
        this.state.hasError(error);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
}

const mapStateToProps = ({Login, dashboardManagement}) => {
    return {
        error: Login.loginError || dashboardManagement.dashboardError
    }
}

export default withRouter(connect(mapStateToProps)(ErrorBoundary));