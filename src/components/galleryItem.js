// Import modules.
import React from 'react';
import PropTypes from 'prop-types';

// This component renders an image in a list item based on the url property
// passed to it.
const GalleryItem = props =>
  <li>
    <img src={props.url}  alt="" />
  </li>

// Declaring proptypes.
GalleryItem.propTypes = {
  url: PropTypes.string.isRequired
}

export default GalleryItem
