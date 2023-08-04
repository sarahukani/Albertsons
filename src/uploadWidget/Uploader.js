import React, { useState, useRef, useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import '../uploadWidget/Uploader.css';
import { MdCloudUpload } from 'react-icons/md';
import { RiCheckLine } from 'react-icons/ri';
import Database from '../data/database';
import Gallery from '../uploadWidget/Gallery.js';
import backendOrigin from '../config/origin';


export default function Uploader( props ) {
  const [images, setImages] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [data, setData] = useState("");


  const handleImageUpload = async (event) => {
    const files = event.target.files;
    setLoading(false);
    console.log("images uploaded");
  
    try {
      setLoading(true);
      const pids = await Database.uploadProductImages(files);
      console.log('The response is:', pids);
  
      // Rest of the logic that depends on the pids
      let pIDs = pids.split(",").filter(pid => pid.trim() !== ""); // Filter out empty strings
      console.log(pIDs);

      let urls = pIDs.map(pid => {
        return `https://storage.googleapis.com/product_images_albertsons/${pid}`;
      });
        
      console.log(urls);
  
      for (var i = 0; i < urls.length; i++) {
          let productName = "Andrew";
          let price = "1000.11";
          await Database.createProduct(pIDs[i], productName, price, urls[i]);
          await Database.pushStoreProductsList(props.storeList[0].id, pIDs[i]);
      }

      setLoading(false);
      setSuccessMessage('Images uploaded successfully!');

      // ...
    } catch (error) {
      console.error('Error uploading product images:', error);
      // Handle the error, if any
    }
  }



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
    console.log("This is from uploader.js: ", props.storeList);
    navigate('/gallery', 
    {state: {
      storeName: props.storeName,
      storeIds: props.storeList,
      user: props.user
    }});
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <main>
      {!successMessage && ( // Only show the upload widget if there's no success message
        <div className={`upload-widget ${loading ? 'loading' : ''}`}>
          {(images.length === 0 || images.length > 0) && !loading && (
            <>
              <MdCloudUpload color="#0C5497" size={60} />
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

      {successMessage && ( // Show the success message if there is one
        <div className="success-message">
          <RiCheckLine color="green" size={40} /> {successMessage}
        </div>
      )}

      {loading && ( // Show the loading bar only if loading is true
        <div className="loading-container">
          <div className="loading-bar"></div>
          <div className="loading-text">Uploading...</div>
        </div>
      )}

      <div className="gallery-button-container">
        <button
        className="view-gallery-button"
        onClick={navigateToGallery}
        disabled={loading || successMessage}
        style={{ color: 'white' }}
        >
        View All Uploads
        </button>
      {/* {showGallery && <Gallery />} Conditionally render the Gallery component */}
    </div>
    </main>
  );
}