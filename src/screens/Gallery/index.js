import React from 'react';
import LazyLoad from 'react-lazyload';

import './index.css';

const Gallery = ({ imagesData, togglePopup }) => {
  return (
    <div className="gallery__main_container">

      {imagesData.pictures &&
        imagesData.pictures.map(el =>
          <div
            className="gallery__image_container"
            key={el.id}
            onClick={() => togglePopup(el)}
          >
            <LazyLoad height={400}>
              <img alt="description from server" src={el.cropped_picture} />
            </LazyLoad>
          </div>)}
    </div>)
}

export default Gallery;