import React from 'react';
import GalleryItem from './galleryItem.js';
import PropTypes from 'prop-types';

const Gallery = props => {

  const results = props.data;
  let photos = results.map(photo =>
    <GalleryItem url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />
  );

  return (
    <ul>
      {photos}
      <li className="not-found">
        <h3>No Results Found</h3>
        <p>You search did not return any results. Please try again.</p>
      </li>
    </ul>
  );
}

  Gallery.propTypes = {
    data: PropTypes.array
  }

export default Gallery;
