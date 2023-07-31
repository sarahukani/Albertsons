import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import { SketchPicker } from 'react-color';
import './createPlaylist.css';
import Gallery from '../uploadWidget/Gallery';
import TextFieldsIcon from '@mui/icons-material/TextFields';

function CreatePlaylist() {
  const [text, setText] = useState({ text: '', color: '#ffffff' });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [title, setTitle] = useState('Enter a title');
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);

  const contentRef = useRef();
  const textOverlayRef = useRef();

  const handleExport = () => {
    const content = contentRef.current;
    // Implementation for exporting playlist to PDF
    const opt = {
      margin: 0.2,
      filename: 'playlist.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().from(content).set(opt).save();
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
    const textInput = window.prompt('Enter your title:', title);
    if (textInput !== null) {
      setTitle(textInput);
    }
  };

  useEffect(() => {
    const clearImagesFromLocalStorage = () => {
      localStorage.removeItem('galleryImages');
    };
    window.addEventListener('beforeunload', clearImagesFromLocalStorage);
    return () => {
      window.removeEventListener('beforeunload', clearImagesFromLocalStorage);
    };
  }, []);

  const handleImageSelect = (image) => {
    setSelectedGalleryImage(image);
  };

  return (
    <div className="create-playlist-container">
      <div className="gallery-section">
        <div className="title">PAVILIONS</div>

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
                <SketchPicker color={text.color || '#ffffff'} onChange={handleColorChange} />
              </div>
            )}
          </div>

          <span onClick={handleEnterTitle} style={{ cursor: 'pointer' }}>
            {title}
          </span>

          <TextFieldsIcon
            onClick={() => {
              const textInput = window.prompt('Enter your text:', text.text);
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

        <div className="text-icon" ref={contentRef} onMouseUp={handleTextDragEnd} onMouseMove={handleTextDrag}>
          <Gallery onSelectImage={handleImageSelect} />
        </div>
      </div>

      <div className="playlist-section">
        {selectedGalleryImage && (
          <div className="selected-gallery-image">
            <img src={selectedGalleryImage.url} alt={selectedGalleryImage.name} />
            {/* Display the text overlay */}
            {text.text && (
              <div
                className="text-overlay"
                style={{
                  color: text.color,
                }}
              >
                {text.text}
              </div>
            )}
            <button>Add to Playlist</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePlaylist;
