// Import modules
import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

// Import components
import Form from './search.js';
import Nav from './nav.js';

// This function passes the functions through to the Nav and Search box.
const Header = props =>
  <div>
    <Form submit={props.onSubmit} search={props.onSearch} />
    <Nav search={props.search} />
  </div>;

// Declaring propTypes.
Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired
}

export default withRouter(Header);
