// Import module.
import React from 'react';

// This component is displayed when the fetch response does not contain any
// photos.
const NoPhotos = () =>
  <li className="not-found">
    <h3>No Results Found</h3>
    <p>You search did not return any results. Please try again.</p>
  </li>;

export default NoPhotos;
