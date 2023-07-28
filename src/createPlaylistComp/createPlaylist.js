import React, { useState, useRef, useEffect } from "react";

import html2pdf from "html2pdf.js";

import { SketchPicker } from "react-color";

import "./createPlaylist.css";

import Gallery from "../uploadWidget/Gallery";

import TextFieldsIcon from "@mui/icons-material/TextFields";

function CreatePlaylist() {
  const [text, setText] = useState({ text: "", color: "#ffffff" });

  const [showColorPicker, setShowColorPicker] = useState(false);

  const [dragging, setDragging] = useState(false);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [title, setTitle] = useState("Enter a title");

  const contentRef = useRef();

  const textOverlayRef = useRef();

  const handleExport = () => {
    const content = contentRef.current;

    if (content && content.childNodes.length > 0) {
      // Add the text overlay to the images

      const textOverlay = document.createElement("div");

      textOverlay.innerText = text.text;

      textOverlay.style.position = "absolute";

      textOverlay.style.top = `${position.y}px`;

      textOverlay.style.left = `${position.x}px`;

      textOverlay.style.transform = "translate(-50%, -50%)";

      textOverlay.style.fontSize = "20px";

      textOverlay.style.fontWeight = "bold";

      textOverlay.style.color = text.color || "white"; // Set default color to white

      textOverlay.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.8)";

      content.childNodes.forEach((child) => {
        if (child.tagName === "IMG") {
          child.parentElement.appendChild(textOverlay.cloneNode(true));
        }
      });

      html2pdf().from(content).save("exported_image.pdf");

      const textOverlays = document.querySelectorAll(".image-item div");

      textOverlays.forEach((overlay) => overlay.remove());
    } else {
      alert("Please add images to the gallery before exporting.");
    }
  };

  const handleColorChange = (color) => {
    const newColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;

    setText((prevText) => ({ ...prevText, color: newColor }));
  };

  const handleTextDragStart = (e) => {
    setDragging(true);
  };

  const handleTextDragEnd = (e) => {
    setDragging(false);
  };

  const handleTextDrag = (e) => {
    if (dragging) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleEnterTitle = () => {
    const textInput = window.prompt("Enter your title:", title);

    if (textInput !== null) {
      setTitle(textInput);
    }
  };

  // Clear images from localStorage on page refresh

  useEffect(() => {
    const clearImagesFromLocalStorage = () => {
      localStorage.removeItem("galleryImages");
    };

    window.addEventListener("beforeunload", clearImagesFromLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", clearImagesFromLocalStorage);
    };
  }, []);

  return (
    <div>
      <div className="title">PAVILIONS</div>

      <div className="create-section">
        <div style={{ position: "relative" }}>
          <img
           // src="https://th.bing.com/th/id/R.86aff27675b3c44f1ba9bcef9e9ab268%3Frik=AjaxIZSY%252f%252b0pHQ&riu=http%253a%252f%252fthehealthgardener.com%252fwp-content%252fuploads%252f2018%252f11%252fcolour-wheel.png&ehk=d1uaGkz9InPVRYv%252b%252fZWTJTVTk%252fE%252bOtOIPj6NhxBJCww%253d&risl=&pid=ImgRaw&r=0%22"
            alt="Color Wheel"
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
            onClick={() => setShowColorPicker(!showColorPicker)}
          />

          {showColorPicker && (
            <div
              style={{
                position: "absolute",

                top: "100%",

                left: "0",

                zIndex: "1",
              }}
            >
              <SketchPicker
                color={text.color || "#ffffff"}
                onChange={handleColorChange}
              />
            </div>
          )}
        </div>

        <span onClick={handleEnterTitle} style={{ cursor: "pointer" }}>
          {title}
        </span>

        <TextFieldsIcon
          onClick={() => {
            const textInput = window.prompt("Enter your text:", text.text);

            if (textInput !== null) {
              setText((prevText) => ({ ...prevText, text: textInput }));
            }
          }}
        />

        <button className="Schedulebtn">Schedule</button>

        <button className="Exportbtn" onClick={handleExport}>
          Export
        </button>
      </div>

      <div
        className="text-icon"
        ref={contentRef}
        onMouseUp={handleTextDragEnd}
        onMouseMove={handleTextDrag}
      >
        <div className="container">
        <div className="editimg">   <h1> for edit images   </h1></div>

          <Gallery />

          {text.text && (
            <div
              ref={textOverlayRef}
              className="text-overlay"
              style={{
                position: "absolute",

                top: `${position.y}px`,

                left: `${position.x}px`,

                transform: "translate(-50%, -50%)",

                fontSize: "20px",

                fontWeight: "bold",

                color: text.color || "white",

                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",

                cursor: dragging ? "grabbing" : "grab",
              }}
              onMouseDown={handleTextDragStart}
            >
              {text.text}
            </div>
          )}
          
        </div>
              
      </div>
    </div>
  );
}

export default CreatePlaylist;
