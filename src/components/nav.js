// Import modules.
import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

// This function passes the search criteria back to the function in App.js and
// links each navigation list item to a particular route.
const Nav = props =>
  <nav className="main-nav">
    <ul>
      <li onClick={() => props.search('cats')}><NavLink to='/cats'>Cats</NavLink></li>
      <li onClick={() => props.search('dogs')}><NavLink to='/dogs'>Dogs</NavLink></li>
      <li onClick={() => props.search('computers')}><NavLink to='/computers'>Computers</NavLink></li>
    </ul>
  </nav>;

// Declaring proptypes.
Nav.propTypes = {
  search: PropTypes.func.isRequired
}

export default Nav;
