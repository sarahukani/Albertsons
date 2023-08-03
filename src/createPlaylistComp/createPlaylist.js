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

  const [selectedGalleryItems, setSelectedGalleryItems] = useState([]);

  const [showColorPicker, setShowColorPicker] = useState(false);

  const [textColor, setTextColor] = useState('#ffffff');

  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

  const [popupContent, setPopupContent] = useState(false);

  const textOverlayRef = useRef();

  const [startDate, setStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);

  const handleClosePopup = () => {
    setPopupContent(false);
  };

  const handlePopupOpen = () => {
      setPopupContent(true);
  }

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