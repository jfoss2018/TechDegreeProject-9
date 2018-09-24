// Import modules.
import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

// Import Components.
import GalleryItem from './galleryItem.js';
import NoPhotos from './nophotos.js';

// This function determines what to populate in the gallery 'container.'
const Gallery = props => {

  // This variable is populated with the appropriate results line based on if
  // the search was from a nav button or the search field.
  let searchLabel;
  if(props.criteria) {
    searchLabel = <h2>Results for {props.criteria} photos</h2>;
  } else {
    searchLabel = <h2>Results for {props.match.params.criteria} photos</h2>;
  }

  // The following variables are populated with the appropriate component JSX
  // based on if the photos array in state has a length greater than 0. If it
  // does, a results line and images will be displayed. If it does not, no
  // results line will be displayed and the NoPhotos component will be displayed.
  let photos;
  let header;
  const results = props.data;
  if (results.length > 0) {
    header = searchLabel;
    photos = results.map(photo =>
      <GalleryItem url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />
    );
  } else {
    header = null;
    photos = <NoPhotos />
  }

  // This will populate what gets rendered based on if the performSearch
  // function is fetching pictures from Flickr. When a new search is initiated
  // and before receiving a response, there will be a loading paragraph displayed.
  // When a response has been received, the galleryItem JSX will be displayed.
  let returnData;
  if (props.loading) {
    returnData = <p>Loading...</p>
  } else {
    returnData =
      <div>
        {header}
        <ul>
          {photos}
        </ul>
      </div>
  }

  // Renders the returnData.
  return (
    returnData
  );
}

// Declaring proptypes.
Gallery.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  criteria: PropTypes.string
}

export default withRouter(Gallery);
