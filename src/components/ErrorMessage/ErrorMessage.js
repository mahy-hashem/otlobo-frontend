import React from "react";
import "./ErrorMessage.scss";

const withErrorHandling = WrappedComponent => ({
  showError,
  errorMessage,
  children
}) => {
  return (
    <WrappedComponent>
      {showError && <div className="error-message">{errorMessage}</div>}
      {children}
    </WrappedComponent>
  );
};

const DivWithErrorHandling = withErrorHandling(({ children }) => (
  <div>{children}</div>
));

export default DivWithErrorHandling;
