import React, { useEffect, useState } from 'react';
import '../uploadWidget/Gallery.css';
import Icon from '../mainComp/Icon.js';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Retrieve the uploaded images from local storage or through state management
    const uploadedImages = JSON.parse(localStorage.getItem('uploadedImages'));
    console.log('Retrieved images:', uploadedImages);
    if (uploadedImages) {
      setImages(uploadedImages);
    }
  }, []);

  return (
    <div className="gallery-container">All uploads
      <Icon></Icon>
     {/* <div className="text">All uploads</div> */}
      <div className="image-grid">
        {images.map((image, index) => (
          <div className="image-item" key={index}>
            {image.url ? (
              <img src={image.url} alt={image.name} />
            ) : (
              <div className="image-placeholder">Image Not Available</div>
            )}
          </div>
        ))}
        </div>
      </div>
  );
};

export default Gallery;
