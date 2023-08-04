import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { SketchPicker } from 'react-color';
import jsPDF from 'jspdf'; // Import jsPDF library
import './createPlaylist.css';
import Gallery from '../uploadWidget/Gallery';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import Database from '../data/database';
import Schedule from './Schedule';
import { useLocation } from 'react-router-dom';

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
  const { state } = useLocation();

  console.log("This is our storelist prop that was passed in: ", state.storeList);

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
      const imageData = canvas.toDataURL('image/jpeg', 1.0);

      // Create a new jsPDF instance
      const pdf = new jsPDF('p', 'mm', 'a4');

      // Add the image to the PDF
      pdf.addImage(imageData, 'JPEG', 10, 10, 190, 100);

      // Get the text overlay elements and add them to the PDF
      const textOverlays = content.querySelectorAll('.text-overlay');
      const defaultFontSize = 12; // Set a default font size for the text

      textOverlays.forEach((overlay) => {
        const text = overlay.innerText;
        const x = parseInt(overlay.style.left); // Parse the x coordinate as an integer
        const y = parseInt(overlay.style.top); // Parse the y coordinate as an integer
        pdf.text(text, x, y, { fontSize: defaultFontSize });
      });

      // Save the PDF
      const pdfData = pdf.output('blob');
      const file = new File([pdfData], 'playlist.pdf', { type: 'application/pdf' });
      const fileList = [file];
      await Database.uploadProductImages(fileList);

      console.log('PDF uploaded successfully!');
    } catch (error) {
      console.error('Error exporting and uploading PDF:', error);
    }
  };

  const handleExport = () => {
    handleExportAndUpload();
  };

  const handleEnterTitle = () => {
    const textInput = window.prompt('Enter your title:', title);
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
    let playlist = {};
    try {
      const imageUrls = selectedGalleryItems.map((item) => item.url);
      console.log(title, imageUrls);
      playlist = await Database.createPlaylist(title, imageUrls, startDate, endDate);
      console.log(playlist);
      console.log('Playlist created successfully!');
    } catch (error) {
      console.error('Error while saving playlist:', error);
    }

    try {
      const storeID = state.storeList[0].id;
      const playlistID = playlist.id;
      let store = await Database.pushStorePlaylist(storeID, playlistID);
    } catch (error) {
      console.error('Error while linking playlist to store: ', error);
    }


  };

  const enterTitleText = title === 'Enter a title' ? title : null;

  return (
    <div className="create-playlist-container">
      <div className="gallery-section">
        <Gallery onSelectImage={(image) => setSelectedGalleryItems([...selectedGalleryItems, { ...image, text: '' }])} />
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

        <div className="text-icon" ref={textOverlayRef} onMouseDown={handleTextDragStart} onMouseMove={handleTextDrag}>
          {selectedGalleryItems.map((item) => (
            <div className="selected-gallery-image" key={item.id} style={{ position: 'relative', marginBottom: '16px' }}>
              <img src={item.url} alt={item.name} style={{ maxWidth: '100%', borderRadius: '10px' }} />
              {item.text && (
                <div
                  className="text-overlay"
                  style={{
                    color: textColor,
                    top: textPosition.y,
                    left: textPosition.x,
                    position: 'absolute',
                    width: '100%',
                    transform: 'translate(-20%, -30%)',
                    top: '50%',
                    left: '50%',
                  }}
                >
                  {item.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button className="Schedulebtn" onClick={handlePopupOpen}>Schedule</button>

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

                          <button className="close-btn" onClick={handleClosePopup}>X</button>

                        </div>

                      </div>

                    )}

    </div>
  );
}

export default CreatePlaylist;
