import './header.scss';

import React from 'react';

import { Navbar } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Brand, SearchMeli } from './header-components';

const Header = () => {
  return (
    <div id="meli-header">
      <LoadingBar className="loading-bar" />
      <Navbar expand="md" fixed="top" className="meli-navbar">
        <Brand />
        <SearchMeli></SearchMeli>
      </Navbar>
    </div>
  );
};

export default Header;
