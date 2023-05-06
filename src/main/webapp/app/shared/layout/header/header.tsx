import './header.scss';

import React from 'react';

import { Navbar } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

const Header = () => {
  return (
    <div id="battle-header">
      <LoadingBar className="loading-bar" />
      <Navbar expand="md" fixed="top" className="battle-navbar"></Navbar>
    </div>
  );
};

export default Header;
