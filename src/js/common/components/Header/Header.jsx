import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends PureComponent {
  render() {
    const { location } = this.props;
    const { pathname } = location;

    const isHome = pathname === '/';
    const isJustAnotherPage = pathname === '/page';

    return (
      <header className="globalHeader">
        <ul>
          <li className={!isHome ? 'active' : ''}>
            {
              isHome
                ? 'Home' : <Link to="/">Home</Link>

            }
          </li>
          <li className={!isJustAnotherPage ? 'active' : ''}>
            {
              isJustAnotherPage
                ? 'Just Another Page' : <Link to="/page">Just Another Page</Link>
            }
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
