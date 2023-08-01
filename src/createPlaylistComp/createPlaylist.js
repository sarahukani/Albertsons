import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { SketchPicker } from 'react-color';
import './createPlaylist.css';
import Gallery from '../uploadWidget/Gallery';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import Database from '../data/database';
import Schedule from './Schedule';

function CreatePlaylist() {
  const [title, setTitle] = useState('Enter a title');
  const [selectedGalleryImages, setSelectedGalleryImages] = useState([]);
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
    html2pdf().from(content).set(opt).save();
  };

  const handleEnterTitle = () => {
    const textInput = window.prompt('Enter your title:', title);
    if (textInput !== null) {
      setTitle(textInput);
    }
  };

  const handleImageSelect = (image) => {
    const isSelected = selectedGalleryImages.some((selectedImage) => selectedImage.id === image.id);

    if (isSelected) {
      setSelectedGalleryImages(selectedGalleryImages.filter((selectedImage) => selectedImage.id !== image.id));
    } else {
      const textInput = window.prompt('Enter your text for this image:', '');
      if (textInput !== null) {
        setSelectedGalleryImages([...selectedGalleryImages, { ...image, text: textInput }]);
      }
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
    try {
      const imageUrls = selectedGalleryImages.map((image) => image.url);

      await Database.createPlaylist(1, title, imageUrls, startDate, endDate);

      console.log('Playlist created successfully!');
    } catch (error) {
      console.error('Error while saving playlist:', error);
    }
  };

  return (
    <div className="create-playlist-container">
      <div className="gallery-section">
        <Gallery
          onSelectImage={handleImageSelect}
          selectedGalleryImages={selectedGalleryImages}
        />
      </div>

      <div className="playlist-section">
        <div className="title">
          <span onClick={handleEnterTitle} style={{ cursor: 'pointer' }}>
            {title}
          </span>
        </div>

        <div className="create-section">
          <div style={{ position: 'relative' }}>
            <img
              alt="Color Wheel"
              style={{ width: '30px', height: '30px', marginRight: '10px' }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            />

            {showColorPicker && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  zIndex: '1',
                }}
              >
                <SketchPicker color={textColor} onChange={handleColorChange} />
              </div>
            )}
          </div>

          <span onClick={handleEnterTitle} style={{ cursor: 'pointer' }}>
            {title}
          </span>

          <TextFieldsIcon
            onClick={() => {
              const textInput = window.prompt('Enter your text:', '');
              if (textInput !== null) {
                setSelectedGalleryImages([...selectedGalleryImages, { text: textInput }]);
              }
            }}
          />

          <button className="Schedulebtn" onClick={() => setPopupContent(true)}>
            Schedule
          </button>
          <button className="Exportbtn" onClick={handleExport}>
            Export
          </button>

          {/* Save Playlist button */}
          {selectedGalleryImages.length > 0 && (
            <button className="SavePlaylistbtn" onClick={handleSavePlaylist}>
              Save Playlist
            </button>
          )}
        </div>

        <div className="text-icon" ref={textOverlayRef} onMouseDown={handleTextDragStart} onMouseMove={handleTextDrag}>
          {selectedGalleryImages.map((image) => (
            <div
              className="selected-gallery-image"
              key={image.id}
              style={{ position: 'relative', marginBottom: '16px' }}
            >
              <img src={image.url} alt={image.name} style={{ maxWidth: '100%', borderRadius: '10px' }} />
              {image.text && (
                <div
                  className="text-overlay"
                  style={{
                    color: textColor,
                    top: textPosition.y,
                    left: textPosition.x,
                  }}
                >
                  {image.text}
                </div>
              )}
              <button>Add to Playlist</button>
            </div>
          ))}
        </div>
      </div>

      {popupContent && (
        <div className="popup">
          <div className="popup-content">
            <Schedule onSave={(start, end) => { setStartDate(start); setEndDate(end); setPopupContent(false); }} />
            <button className="close-btn" onClick={() => setPopupContent(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePlaylist;
