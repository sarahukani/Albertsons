import React, { useEffect, useState } from "react";
import "../uploadWidget/Gallery.css";
import Icon from "../mainComp/Icon.js";
import EditIcon from "@mui/icons-material/Edit";
import Uploader from "../uploadWidget/Uploader.js";
import { useLocation } from "react-router-dom";
import Database from "../data/database";
import DeleteIcon from "@mui/icons-material/Delete";

const Gallery = (props) => {
  console.log("im here!");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { state } = useLocation();
  const [isEditIconClicked, setIsEditIconClicked] = useState(false);
  const [imageInfo, setImageInfo] = useState("");
  const [editLink, setEditLink] = useState("");

  const location = useLocation();
  let storeList = [];

  if (location.state) {
    storeList = location.state.storeList;
  } else {
    storeList = props.storeList;
  }

  let title = "Default";
  let price = "5.99";

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(storeList);

    

        let products = [];
        let tempProducts = new Set(); 
        for (let i = 0; i < storeList.length; i++) {
            let currProducts = await Database.getCurrentLocationProducts(storeList[i].id);
            for (let j = 0; j < currProducts.length; j++) {
                if (!tempProducts.has(currProducts[j].id)) {
                    tempProducts.add(currProducts[j].id);
                    products.push(currProducts[j]);
                }
            }
        }

         // let tempProducts = new Set();
        // for (let i = 0; i < storeList.length; i++) {
        //   let currProducts = await Database.getCurrentLocationProducts(
        //     storeList[i].id
        //   );
        //   for (let j = 0; j < currProducts.length; j++) {
        //     if (tempProducts.has(currProducts[j] != tempProducts.has(currProducts[j]))) {
        //       tempProducts.add(currProducts[j]);
        //     }
        //   }
        // }

        // let products = Array.from(tempProducts);

        console.log("Fetched products:", products);

        // Extract the image_url from each product and create a new array
        // const productImages = products.map((product) => product.image_url);

        setImages(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
  }, [storeList]);

  const handleSelectIcon = (EditIcon) => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  const handleImageSelect = (image) => {
    setImageInfo(image);
    // Toggle selection: if the clicked image is already selected, deselect it.
    // Otherwise, set it as the selected image
    setSelectedImage((prevSelectedImage) =>
      prevSelectedImage === image ? null : image
    );
  };

  const handleInputChange = (event) => {
    let tProduct = event.target.value;
    tProduct = tProduct.replaceAll(" ", "+");
    setInputValue(tProduct);
  };

  const handleDeleteImage = (image) => {
    // Implement the logic to delete the selected image here
    // For example, you can use the image ID to delete it from the database
    console.log("Deleting image:", image);
  };

  async function handleSubmit() {
    try {
      setDescription(inputValue);

      if (selectedImage) {
        const pID = imageInfo.id;
        const storeID = storeList[0].id;

        let editLink = await Database.getEditedImage(
          pID,
          title,
          price,
          inputValue,
          storeID
        );
        console.log(editLink);
      }

      setInputValue(""); // Clear the input after submission
      setSelectedImage(null); // Deselect the image after submission
      window.location.reload();
    } catch (error) {
      console.error("Error submitting description:", error);
    }
  }

  const handleInputClick = (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the parent div (handleSelectIcon)
  };

  const labelStyle = {
    marginBottom: "5px",
  };

  const inputStyle = {
    padding: "5px",
    marginBottom: "10px",
  };

  let storeName = "";
  let user = "Rashmi";
  if (state) {
    storeName = state.storeName;
    user = state.user;
    storeList = state.storeList;
  }

  return (
    <div className="gallery-container">
      <div className="gallery-color">Gallery</div>
      <div className="italic-text">
        <br></br>
        To generate customized AI images, click on the selected image and type
        in your requirements.
      </div>
      <div className="icon-dropdown2">
        <Icon storeName={storeName} storeList={storeList} user={user} />
      </div>

      <div className="image-grid">
        {images.map((image, index) => (
          <div className="image-box">
            <div
              className={`image-item ${
                image === selectedImage ? "selected" : ""
              }`}
              key={index}
              onClick={() => handleImageSelect(image)}
            >
              {/* Display the image */}
              {image.imageURL ? (
                <img src={image.imageURL} alt={image.name} />
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
                <div className="containerStyle" onClick={handleInputClick}>
                  <label htmlFor={`userInput${index}`}></label>
                  <input
                    type="text"
                    id={`userInput${index}`}
                    // value={inputValue}
                    onChange={handleInputChange}
                  />
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              )}

              {/* Display the edit icon for all images */}
              {image.imageURL && (
                <div className="edit-container">
                  <div className="edit-button" onClick={handleSelectIcon}>
                    <EditIcon />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Gallery;
