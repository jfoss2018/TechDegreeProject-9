import React from 'react';
import PropTypes from 'prop-types';

const GalleryItem = props =>
  <li>
    <img src={props.url}  alt="" />
  </li>

GalleryItem.propTypes = {
  url: PropTypes.string
}

export default GalleryItem
