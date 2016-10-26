import React from 'react';

function App({ children }) {
  return (
    <div className="container">
      {children}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
