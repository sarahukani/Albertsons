import React, { useState, useRef, useEffect } from "react";
import html2pdf from "html2pdf.js";
import "./createPlaylist.css";
import Gallery from "../uploadWidget/Gallery";
import TextFieldsIcon from "@mui/icons-material/TextFields"; // Add this import
import Icon from '../mainComp/Icon.js';
import '../mainComp/Icon.css';
import '../mainComp/Main.css';
import Schedule from './Schedule.js';
import './Schedule.css';


function CreatePlaylist() {
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); 


  const handlePopupOpen = () => {
    setIsPopupOpen(!isPopupOpen);
    console.log(isPopupOpen)
  };


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setImageSrc(fileReader.result);
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  const handleExport = async () => {
    if (imageSrc || selectedImages.length > 0) {
      const content = document.createElement("div");

      // Add the uploaded image if available
      if (imageSrc) {
        const imageElement = document.createElement("img");
        imageElement.src = imageSrc;
        imageElement.style.width = "100%";
        content.appendChild(imageElement);
      }

      // Add selected images from the gallery
      const galleryImages = document.querySelectorAll(
        ".image-item.selected img"
      );
      const galleryImageElements = await Promise.all(
        Array.from(galleryImages).map((img) => {
          return new Promise((resolve, reject) => {
            const imageElement = document.createElement("img");
            imageElement.src = img.src;
            imageElement.style.width = "100%";
            imageElement.onload = () => resolve(imageElement);
            imageElement.onerror = () => reject();
          });
        })
      );

      galleryImageElements.forEach((img) => {
        content.appendChild(img);

        // Add the text overlay to the images
        const textOverlay = document.createElement("div");
        textOverlay.innerText = text;
        textOverlay.style.position = "absolute";
        textOverlay.style.top = "50%";
        textOverlay.style.left = "50%";
        textOverlay.style.transform = "translate(-50%, -50%)";
        textOverlay.style.fontSize = "20px";
        textOverlay.style.fontWeight = "bold";
        textOverlay.style.color = "white";
        textOverlay.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.8)";
        img.parentElement.appendChild(textOverlay);
      });

      html2pdf().from(content).save("exported_image.pdf");
    } else {
      alert("Please upload an image or select images from the gallery.");
    }
  };

  useEffect(() => {
    if (selectedImages.length > 0) {
      handleExport();
    }
  }, [text]);

  const handleImageSelect = (imageUrl) => {
    if (selectedImages.includes(imageUrl)) {
      setSelectedImages(selectedImages.filter((image) => image !== imageUrl));
    } else {
      setSelectedImages([...selectedImages, imageUrl]);
    }
  };

  return (
    <div>
      <div className="wrapper">
      <div className="icon-container">
      <Icon></Icon>
      </div>
      <div className="create-section">
      <img
          src="https://th.bing.com/th/id/R.86aff27675b3c44f1ba9bcef9e9ab268?rik=AjaxIZSY%2f%2b0pHQ&riu=http%3a%2f%2fthehealthgardener.com%2fwp-content%2fuploads%2f2018%2f11%2fcolour-wheel.png&ehk=d1uaGkz9InPVRYv%2b%2fZWTJTVTk%2fE%2bOtOIPj6NhxBJCww%3d&risl=&pid=ImgRaw&r=0"
          alt="Color Wheel"
          style={{ width: "30px", height: "30px", marginRight: "10px" }}
        />
        Independence day
        <TextFieldsIcon
          onClick={() => {
            const textInput = window.prompt("Enter your text:");
            setText(textInput);
          }}
        />

        <button className="Schedulebtn" onClick={handlePopupOpen}>
          Schedule Button
        </button>
        {isPopupOpen && (
          <div className="popup">
          <Schedule></Schedule>
          </div>

        )}
      

        <button className="Exportbtn" onClick={handleExport}>
          Export
        </button>
      </div>

      <div className="text-icon">
        <div className="container">
          <Gallery
            selectedImages={selectedImages}
            onImageSelect={handleImageSelect}
          />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePlaylist;
