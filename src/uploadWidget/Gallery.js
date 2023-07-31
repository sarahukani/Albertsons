import React, { useEffect, useState } from 'react';
import '../uploadWidget/Gallery.css';
import Icon from '../mainComp/Icon.js';

const Gallery = ({ onSelectImage }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); 

  useEffect(() => {
    const uploadedImages = JSON.parse(localStorage.getItem('uploadedImages'));
    console.log('Retrieved images:', uploadedImages);
    if (uploadedImages) {
      setImages(uploadedImages);
    }
  }, []);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    onSelectImage(image); // Notify the parent component with the selected image
  };

  return (
    <div className="gallery-container">
      All uploads
      <Icon />
      <div className="image-grid">
        {images.map((image, index) => (
          <div
            className={`image-item ${image === selectedImage ? 'selected' : ''}`}
            key={index}
            onClick={() => handleImageSelect(image)}
          >
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
