import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '50px',
          textAlign: 'center',
          backgroundColor: '#fff5f5',
          minHeight: '100vh'
        }}>
          <h1 style={{ color: '#e53e3e' }}>Oops! Something went wrong.</h1>
          <p style={{ color: '#718096', marginTop: '20px' }}>
            We're sorry for the inconvenience. Please refresh the page and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '20px',
              fontSize: '16px'
            }}
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ marginTop: '30px', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', color: '#e53e3e' }}>Error Details</summary>
              <pre style={{ 
                backgroundColor: '#2d3748', 
                color: '#e2e8f0',
                padding: '20px',
                borderRadius: '4px',
                marginTop: '10px',
                overflow: 'auto'
              }}>
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo && (
                  <>
                    <br />
                    {this.state.errorInfo.componentStack}
                  </>
                )}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
