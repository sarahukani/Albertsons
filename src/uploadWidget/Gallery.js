import React, { useEffect, useState } from 'react';
import '../uploadWidget/Gallery.css';
import Icon from '../mainComp/Icon.js';
import EditIcon from '@mui/icons-material/Edit';
import Uploader from '../uploadWidget/Uploader.js'

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Retrieve the uploaded images from local storage or through state management
    const uploadedImages = JSON.parse(localStorage.getItem('uploadedImages'));
    console.log('Retrieved images:', uploadedImages);
    if (uploadedImages) {
      setImages(uploadedImages);
    }
  }, []);

  const handleSelectIcon = (EditIcon) => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  const handleImageSelect = (image) => {
    // Toggle selection: if the clicked image is already selected, deselect it.
    // Otherwise, set it as the selected image.

    setSelectedImage((prevSelectedImage) =>
      prevSelectedImage === image ? null : image
    );
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Submitting Description', inputValue, selectedImage);

    const submittedDescription = inputValue;
    console.log('Submitted Description', submittedDescription);

    setDescription(submittedDescription);
    setInputValue(''); // Clear the input after submission
    setShowInput(false); // Hide the input container after submission

    const selectedIndex = images.findIndex((image) => image === selectedImage);
  
  };

  const handleInputClick = (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the parent div (handleSelectIcon)
  };

  const labelStyle = {
    marginBottom: '5px',
  };

  const inputStyle = {
    padding: '5px',
    marginBottom: '10px',
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
            style={{ position: 'relative' }}
          >
            {/* Display the image */}
            {image.url ? (
              <img src={image.url} alt={image.name} />
            ) : (
              <div className="image-placeholder">Image Not Available</div>
            )}

            {/* Display the description of the selected image */}
            {image === selectedImage && (
              <div className="image-description">
                <p>{description}</p>
              </div>
            )}

            {/* Show input container only for the selected image */}
            {image === selectedImage && (
              <div className="containerStyle">
                <label htmlFor="userInput" style={{ marginBottom: '5px' }}></label>
                <input
                  type="text"
                  id="userInput"
                  value={inputValue}
                  onChange={handleInputChange}
                  style={{ padding: '5px', marginBottom: '10px' }}
                />
                <button onClick={handleSubmit}>Submit</button>
              </div>
            )}

            {/* Display the edit icon for all images */}
            {image.url && (
              <div className="edit-container">
                <div className="edit-button" onClick={handleSelectIcon}>
                  <EditIcon />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;




