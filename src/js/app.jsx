import React from 'react';

import '../assets/fonts/fonts.css';

function App({ children }) {
  return (
    <div className="container">
      {children}
    </div>
  );
}

export default App;
