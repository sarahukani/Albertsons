import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
// import { SketchPicker } from "react-color";
import jsPDF from "jspdf";
import "./createPlaylist.css";
import Gallery2 from "../uploadWidget/Gallery2";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import Database from "../data/database";
import Schedule from "./Schedule";
import { useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CreatePlaylist() {
  const [title, setTitle] = useState("Enter a title");
  const [selectedGalleryItems, setSelectedGalleryItems] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [textColor, setTextColor] = useState("#ffffff");
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [popupContent, setPopupContent] = useState(false);
  const textOverlayRef = useRef();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const { state } = useLocation();

  console.log(
    "This is our storelist prop that was passed in: ",
    state.storeList
  );

  const [showSuccessModal, setShowSuccessModal] = useState(false);  

  const handleClosePopup = () => {
    setPopupContent(false);
  };

  const handlePopupOpen = () => {
    setPopupContent(true);
  };

  const handleExportAndUpload = async () => {
    try {
      const content = textOverlayRef.current;
      // Capture the content as an image using html2canvas
      const canvas = await html2canvas(content, { scale: 2 });
      const imageData = canvas.toDataURL("image/jpeg", 1.0);

      // Create a new jsPDF instance
      const pdf = new jsPDF("p", "mm", "a4");

      // Add the image to the PDF
      pdf.addImage(imageData, "JPEG", 10, 10, 190, 100);

      // Get the text overlay elements and add them to the PDF
      const textOverlays = content.querySelectorAll(".text-overlay");
      const defaultFontSize = 12;

      textOverlays.forEach((overlay) => {
        const text = overlay.innerText;
        const x = parseInt(overlay.style.left);
        const y = parseInt(overlay.style.top);
        pdf.text(text, x, y, { fontSize: defaultFontSize });
      });

      // Save the PDF
      const pdfData = pdf.output("blob");
      const file = new File([pdfData], "playlist.pdf", {
        type: "application/pdf",
      });
      const fileList = [file];
      await Database.uploadProductImages(fileList);

      console.log("PDF uploaded successfully!");
    } catch (error) {
      console.error("Error exporting and uploading PDF:", error);
    }
  };

  const handleExport = () => {
    handleExportAndUpload();
  };

  const handleEnterTitle = () => {
    const textInput = window.prompt("Enter your title:", title);
    if (textInput !== null) {
      setTitle(textInput);
    }
  };

  const handleColorChange = (color) => {
    setTextColor(color.hex);
  };

  const handleTextDragStart = (e) => {
    setTextPosition({ x: e.clientX, y: e.clientY });
  };

  const handleTextDrag = (e) => {
    setTextPosition({ x: e.clientX, y: e.clientY });
  };

  const handleSavePlaylist = async () => {
    if (!isScheduled) {
      // Show the modal if the playlist is not scheduled
      setOpenModal(true);
      return;
    }
    setShowSuccessModal(true);
    let playlist = {};
    try {
      const imageUrls = selectedGalleryItems.map((item) => item.imageURL);
      console.log(title, imageUrls, startDate, endDate);
      playlist = await Database.createPlaylist(
        title,
        imageUrls,
        startDate,
        endDate
      );
      console.log("The playlist: ", playlist);
      console.log("Playlist created successfully!");
    } catch (error) {
      console.error("Error while saving playlist:", error);
    }

    try {
      const storeID = state.storeList[0].id;
      const playlistID = playlist.id;
      let store = await Database.pushStorePlaylist(storeID, playlistID);
    } catch (error) {
      console.error("Error while linking playlist to store: ", error);
    }
  };

  const enterTitleText = title === "Enter a title" ? title : null;

  // Modal-related state and handlers
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="create-playlist-container">
      <div className="gallery-section">
        <Gallery2
          storeList={state.storeList}
          onSelectImage={(image) =>
            setSelectedGalleryItems([
              ...selectedGalleryItems,
              { ...image, text: "" },
            ])
          }
        />
      </div>

      <div className="playlist-section">

        <div className="create-section" style={{ background: "white" }}>

          <div className="title">
            <span
              onClick={handleEnterTitle}
              style={{ cursor: "pointer", justifyContent: "center"}}
            >
              {title}
            </span>

            <span
              onClick={handleEnterTitle}
              style={{ cursor: "pointer", color: "black"  }}
            >
              {title !== "Enter a title"}
            </span>
          </div>

          <div style={{ position: "relative" }}>
            <span
              className="titleName"
              onClick={handleEnterTitle}
              style={{ cursor: "pointer", color: "black"}}
            >
              {title !== "Enter a title" && enterTitleText}
            </span>
            {/* <img
              src="https://3.bp.blogspot.com/-twz3yfFATFY/T3SRLKVd-yI/AAAAAAAAAKo/xFSYgRIcwrc/s1600/COLOUR-WHEEL.jpg"
              alt="Color Wheel"
              style={{ width: "30px", height: "30px", marginRight: "10px" }}
              onClick={() => setShowColorPicker(!showColorPicker)} */}
            {/* {showColorPicker && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  zIndex: "1",
                }}
              >
                <SketchPicker color={textColor} onChange={handleColorChange} />
              </div>
            )} */}
          </div>

          {/* <TextFieldsIcon
            style={{ color: "white" }}
            onClick={() => {
              const textInput = window.prompt("Enter your text:", "");
              if (textInput !== null) {
                setSelectedGalleryItems([
                  ...selectedGalleryItems,
                  { text: textInput },
                ]);
              }
            }}
          /> */}

          <button className="Schedulebtn" onClick={() => setPopupContent(true)}>
            Schedule
          </button>
          {/* 
          <button className="Exportbtn" onClick={handleExport}>
            Export
          </button> */}

          {selectedGalleryItems.length > 0 && (
            <button className="SavePlaylistbtn" onClick={handleSavePlaylist}>
              Save
            </button>
          )}
        </div>

        <div
          ref={textOverlayRef}
          onMouseDown={handleTextDragStart}
          onMouseMove={handleTextDrag}
        >
          {selectedGalleryItems.map((item) => (
            <div
              className="selected-gallery-image"
              key={item.id}
              style={{ position: "relative", marginBottom: "16px" }}
            >
              <img
                src={item.imageURL}
                alt={item.name}
                style={{ maxWidth: "100%", borderRadius: "10px" }}
              />
              {item.text && (
                <div
                  className="text-overlay"
                  style={{
                    color: textColor,
                    top: textPosition.y,
                    left: textPosition.x,
                    position: "absolute",
                    width: "100%",
                    transform: "translate(-20%, -30%)",
                    top: "50%",
                    left: "50%",
                  }}
                >
                  {item.text}
                </div>
              )}
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
                setIsScheduled(true); // Mark scheduling status as true
              }}
            />
            <button className="close-btn" onClick={handleClosePopup}>
              X
            </button>
          </div>
        </div>
      )}

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography id="modal-title" variant="h6" component="h2">
              {/* <Alert severity="info">This is an info alert — check it out!</Alert> */}
              <Alert severity="error">
                This is an error alert — check it out!
              </Alert>
              Your playlist is not saved!
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              To save your playlist, please schedule it.
            </Typography>
            <Button onClick={handleCloseModal}>Close</Button>
          </Box>
        </Fade>
      </Modal>
      <Modal

aria-labelledby="success-modal-title"

aria-describedby="success-modal-description"

open={showSuccessModal}

onClose={() => setShowSuccessModal(false)}

closeAfterTransition

BackdropComponent={Backdrop}

BackdropProps={{

  timeout: 500,

}}

>

<Fade in={showSuccessModal}>

  <Box sx={style}>

    <Typography id="success-modal-title" variant="h6" component="h2">

      <Alert severity="success">This is a success alert — check it out!</Alert>

      Playlist successfully saved!

    </Typography>

    <Typography id="success-modal-description" sx={{ mt: 2 }}>

    </Typography>

    <Button onClick={() => setShowSuccessModal(false)}>Close</Button>

  </Box>

</Fade>

</Modal>
    </div>
  );
}

export default CreatePlaylist;
