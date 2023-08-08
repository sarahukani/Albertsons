import * as React from 'react';
import Card from '@mui/material/Card';
import Icon from '../mainComp/Icon.js'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DownloadIcon from '@mui/icons-material/Download';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import './ViewPlaylist.css';
import Schedule from '../createPlaylistComp/Schedule';
import axios from 'axios';
import jsPDF from 'jspdf';
import Database from '../data/database.js';
import ImageCarousel from '../playlistWidget/ImageCarousel.js';

export default function ViewPlaylist(props) {
  const { state } = useLocation();
  const [playlists, setPlaylists] = useState([]); // State to hold fetched playlists

  useEffect(() => {
    // Fetch playlist data from the database for each store in storeList
    const fetchPlaylistData = async () => {
      try {
        const fetchedPlaylists = [];
  
        for (const store of state.storeList) {
          const playlists = await Database.getCurrentLocationPlaylists(store.id);
          fetchedPlaylists.push(...playlists);
        }
  
        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error('Error fetching playlist data:', error);
      }
    };

    fetchPlaylistData();
  }, []);

  const [showImage1, setShowImage1] = React.useState(true);
  const [isDropdownOpenArray, setIsDropdownOpenArray] = useState(Array(playlists.length).fill(false));
  const [isSchedulePopupOpen, setIsSchedulePopupOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [popupContent, setPopupContent] = useState(false);
  const [networkErrorPopup, setNetworkErrorPopup] = useState(false);
  
  const navigate = useNavigate();
  React.useEffect(() => {
    const timer = setInterval(() => {
      setShowImage1((prevShowImage1) => !prevShowImage1);
    }, 5000); // Change the image every 5 seconds

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleMoreOptions = (index) => {
      setIsDropdownOpenArray((prevIsDropdownOpen) => {
      const newIsDropdownOpen = [...prevIsDropdownOpen];
      newIsDropdownOpen[index] = !newIsDropdownOpen[index];
      return newIsDropdownOpen;
    });
  };

  const handleClosePopup = (index) => {
     setIsDropdownOpenArray((prevIsDropdownOpen) => {
      const newIsDropdownOpen = [...prevIsDropdownOpen];
      newIsDropdownOpen[index] = false;
      return newIsDropdownOpen;
    });
  };

  const handleDownload = async (index) => {
    try {
      const images = await Promise.all((playlists[index].images).map(async (link) => {
        const response = await axios.get(link, { responseType: 'arraybuffer' });
        const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
        return URL.createObjectURL(imageBlob);
      }));

      const pdfDoc = new jsPDF();
      images.forEach((image, index) => {
        if (index !== 0) {
          pdfDoc.addPage();
        }
      // Adjust the scale factor to improve image quality
      const scaleFactor = 1; // Experiment with different values (e.g., 1, 1.5, 2)
      const imageWidth = 70;
      const imageHeight = 60;

      pdfDoc.addImage(image, 'JPEG', 10, 10, imageWidth * scaleFactor, imageHeight * scaleFactor);
    });

    pdfDoc.save('playlist.pdf'); //title+playlist
  } catch (error) {
    console.error('Network error:', error);
    setNetworkErrorPopup(true); // Display the network error popup
  }
};

  const handlePopupClose = () => {
    setNetworkErrorPopup(false);
  };

  const handleCloseSchedulePopup = () => {
    setPopupContent(false);
  };

  const handlePopupOpen = () => {
    setPopupContent(true);
  };

  const MoreOptionsPopup = ({ arrayIndex, onClose, onDownload, onSchedule }) => {
    const handleDownloadClick = () => {
      onDownload(arrayIndex); // Pass the arrayIndex to the parent's onDownload handler
    };

    return (
      <div className="more-options-dropdown">
        <div className="dropdown-option" >
            <DownloadIcon 
              id={arrayIndex} 
              sx={{height:'1.25vw', width:'1.25vw', marginRight:'.4vw'}}
              onClick={handleDownloadClick}
            />
            <span onClick={handleDownloadClick} className="dropdown-text">Download Playlist</span>
        </div>
        {/* <div className="divider"></div>
        <div className="dropdown-option">
            <ScheduleSendIcon  sx={{height:'1.25vw', width:'1.25vw', marginRight:'.4vw'}}/>
            <span onClick={onSchedule} className="dropdown-text">Schedule Playlist</span>
        </div>  */}
      </div>
    );
  };


  return (
    <div className="card-container">
      <Icon storeName={state.storeName} storeList={state.storeList} user={state.user}></Icon>
      <div className="view-playlist-header">All Playlists</div>
      <div className="campaign-list">
        {playlists.map((campaign, index) =>
        <Card key={index} className="card" sx={{ height: "37vh", width: "calc(30% - 20px)", backgroundColor:'white', 
                  borderRadius:'10px', boxShadow: '5px 10px 15px darkgray', marginBottom: "20px"}}>
            <div className="image-container">
            <MoreHorizIcon 
              className='etc-icon' 
              sx={{cursor:"pointer"}}
              onClick={() => handleMoreOptions(index)}/>
              {isDropdownOpenArray[index] && (
                <MoreOptionsPopup 
                  arrayIndex={index} 
                  onClose={() => handleClosePopup(index)} 
                  onSchedule={handlePopupOpen} 
                  // onDownload={handleDownload(index)}
                  onDownload={(clickedIndex) => handleDownload(clickedIndex)}
                /> 
              )}

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
                    <button className="close-btn" onClick={handleCloseSchedulePopup}>Close</button>
                  </div>
                </div>
              )}
              {/* Network Error Popup */}
              {networkErrorPopup && (
                <div className="error-popup">
                  <div className="error-popup-content">
                    <div>Network Error: Unable to download the playlist.</div>
                    <button className="error-close-btn" onClick={handlePopupClose}>X</button>
                  </div>
                </div>
              )}
            <div className='image-carousel-wrapper'>
              <ImageCarousel images={playlists[index].images} />
            </div>
            </div>
            <CardContent sx={{paddingBottom:'0px', padding:'0px', paddingTop:'40px'}} >
              <Typography 
                gutterBottom 
                variant="h5" 
                component="div" 
                className="card-title"
                sx={{position:"relative", bottom: '0vh', fontSize:'1.5vw', justifyContent:'center', 
                display:'flex', fontWeight:'bold'}}
                >
                {playlists[index].name}
              </Typography>
            </CardContent>
        </Card>
        )}
        </div>
    </div>
  );
}
