import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../uploadWidget/Uploader.css';
import { MdCloudUpload } from 'react-icons/md';
import { RiCheckLine } from 'react-icons/ri';
import Database from '../data/database';

export default function Uploader() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = async (event) => {
    const files = event.target.files;

    const file = Array.from(files)[0];
    await Database.uploadProductImages(file);

    setLoading(true);
    try {
      const newImages = await Promise.all(
        Array.from(files).map(async (file) => ({
          name: file.name,
          url: await uploadImage(file),
        }))
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
      setSuccessMessage('Image uploaded successfully');
      const fileInputValue = fileInputRef.current.value;
      setTimeout(() => {
        if (fileInputRef.current) {
          fileInputRef.current.value = null; // Reset file input value
        }
      }, 2000); // Clear success message and reset file input value after 15 seconds
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      // Simulating image upload delay with setTimeout
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file);
        resolve(imageUrl);
      }, 2000);
    });
  };

  const navigateToGallery = () => {
    localStorage.setItem('uploadedImages', JSON.stringify(images));
    navigate('/gallery');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <main>
    {successMessage ? (
      <div className="success-message">
          <RiCheckLine color="green" size={40} />{successMessage}</div>
    ) : (
        <div className={`upload-widget ${loading ? 'loading' : ''}`}>
          {(images.length === 0 || images.length > 0) && !loading && (
            <>
              <MdCloudUpload color="#FFFFFF" size={60} />
              <label htmlFor="file-input" className="form">
                Select Images to Upload
              </label>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="picture-input"
            ref={fileInputRef}
            onChange={handleImageUpload}
            multiple
            disabled={loading}
            style={{ display: 'none' }}
            id="file-input"
          />
        </div>
      )}

      {loading && (
        <div className="loading-container">
          <div className="loading-bar"></div>
          <div className="loading-text">
            Uploading...</div>
        </div>
      )}

      <div className="gallery-button-container">
        <button
          className="view-gallery-button"
          onClick={navigateToGallery}
          disabled={loading || successMessage}
        >
          View All Uploads
        </button>
      </div>
    </main>
  );
}