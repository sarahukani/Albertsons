import React, { useState, useRef, useEffect } from "react";
import html2pdf from "html2pdf.js";
import { SketchPicker } from "react-color";
import "./createPlaylist.css";
import Gallery from "../uploadWidget/Gallery";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import Schedule from "./Schedule.js";
import "./Schedule.css";
import { useNavigate } from "react-router-dom";



function CreatePlaylist() {
  const [title, setTitle] = useState('Enter a title');
  const [selectedGalleryItems, setSelectedGalleryItems] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [textColor, setTextColor] = useState('#ffffff');
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [popupContent, setPopupContent] = useState(false);
  const textOverlayRef = useRef();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleExport = () => {
    const content = textOverlayRef.current;
    const opt = {
      margin: 0.2,
      filename: 'playlist.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    const navigate = useNavigate()
    const [popupContent, setPopupContent] = useState(false);

    const handleClosePopup = () => {
        setPopupContent(false);
    const handlePopupOpen = () => {
        setPopupContent(true);
    }

    const [text, setText] = useState({ text: "", color: "#ffffff" });

    const [showColorPicker, setShowColorPicker] = useState(false);

    const [dragging, setDragging] = useState(false);


  const handleSavePlaylist = async () => {
    try {
      const imageUrls = selectedGalleryItems.map((item) => item.url);

      await Database.createPlaylist(title, imageUrls, startDate, endDate);

      console.log('Playlist created successfully!');
    } catch (error) {
      console.error('Error while saving playlist:', error);
    }
  };

  const enterTitleText = title === 'Enter a title' ? title : null;

  return (
    <div className="create-playlist-container">
      <div className="gallery-section">
        <Gallery
          onSelectImage={(image) => setSelectedGalleryItems([...selectedGalleryItems, { ...image, text: '' }])}
        />
      </div>

      <div className="playlist-section">
        <div className="title">
          <span onClick={handleEnterTitle} style={{ cursor: 'pointer' }}>
            {enterTitleText}
          </span>
        </div>

        <div className="create-section" style={{ background: 'black' }}>
          <div style={{ position: 'relative' }}>
            <img
              src="https://3.bp.blogspot.com/-twz3yfFATFY/T3SRLKVd-yI/AAAAAAAAAKo/xFSYgRIcwrc/s1600/COLOUR-WHEEL.jpg"
              alt="Color Wheel"
              style={{ width: '30px', height: '30px', marginRight: '10px' }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            />

            {showColorPicker && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  zIndex: '1',
                }}
              >
                <SketchPicker color={textColor} onChange={handleColorChange} />
              </div>
            )}
          </div>

          <span onClick={handleEnterTitle} style={{ cursor: 'pointer', color: 'white' }}>
            {title !== 'Enter a title' && title}
          </span>

          <TextFieldsIcon
            style={{ color: 'white' }}
            onClick={() => {
              const textInput = window.prompt('Enter your text:', '');
              if (textInput !== null) {
                setSelectedGalleryItems([...selectedGalleryItems, { text: textInput }]);
              }
            }}
          />

          <button className="Schedulebtn" onClick={() => setPopupContent(true)}>
            Schedule
          </button>
          <button className="Exportbtn" onClick={handleExport}>
            Export
          </button>

          {selectedGalleryItems.length > 0 && (
            <button className="SavePlaylistbtn" onClick={handleSavePlaylist}>
              Save
            </button>
          )}
        </div>

        <div
          className="text-icon"
          ref={textOverlayRef}
          onMouseDown={handleTextDragStart}
          onMouseMove={handleTextDrag}
        >
          {selectedGalleryItems.map((item) => (
            <div
              className="selected-gallery-image"
              key={item.id}
              style={{ position: 'relative', marginBottom: '16px' }}
            >
              <img
                src={item.url}
                alt={item.name}
                style={{ maxWidth: '100%', borderRadius: '10px' }}
              />
              {item.text && (
                <div
                  className="text-overlay"
                  style={{
                    color: textColor,
                    top: textPosition.y,
                    left: textPosition.x,
                    position: 'absolute',
                    width: '100%',
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    left: '50%',
                  }}
                >
                  {item.text}

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

                        src="https://th.bing.com/th/id/R.86aff27675b3c44f1ba9bcef9e9ab268?rik=AjaxIZSY%2f%2b0pHQ&riu=http%3a%2f%2fthehealthgardener.com%2fwp-content%2fuploads%2f2018%2f11%2fcolour-wheel.png&ehk=d1uaGkz9InPVRYv%2b%2fZWTJTVTk%2fE%2bOtOIPj6NhxBJCww%3d&risl=&pid=ImgRaw&r=0"

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

                <button className="Schedulebtn" onClick={handlePopupOpen}>Schedule</button>
                    {popupContent && (
                        <div className="popup">
                        <div className="popup-content">
                          <Schedule />
                          <button className="close-btn" onClick={handleClosePopup}>Close</button>
                        </div>
                      </div>
                    )}
               

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
          ))}
        </div>
      </div>

      {popupContent && (
        <div className="popup">
          <div className="popup-content">
            <Schedule
              onSave={(start, end) => {
                setStartDate(start);
                setEndDate(end);
                setPopupContent(false);
              }}
            />
            <button className="close-btn" onClick={() => setPopupContent(false)}>
              Close
            </button>
          </div>
        </div>

    );

}



export default CreatePlaylist;