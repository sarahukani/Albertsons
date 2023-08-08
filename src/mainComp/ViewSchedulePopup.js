import React, { useState, useRef, useEffect } from 'react';
import './ViewSchedulePopup.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import EditIcon from '@mui/icons-material/Edit';
import EditPopup from "./EditPopup.js"
import Database from '../data/database.js';
import { useLocation } from 'react-router-dom'

  const convertToDateTime = (dateStr, timeStr, meridiem) => {
    // Split the time string into hours and minutes
    const [time, meridiemValue] = timeStr.split(' ');
  
    // Split hours and minutes further
    const [hours, minutes] = time.split(':');
  
    // Calculate the actual hours based on the meridiem (AM/PM)
    let actualHours = parseInt(hours, 10);
    if (meridiem === 'pm' && meridiemValue === 'pm') {
      actualHours += 12;
    } else if (meridiem === 'am' && meridiemValue === 'am') {
      // Handle midnight (12:00 AM) as 00:00
      actualHours %= 12;
    }
    // Create a new Date object with the updated time
    const dateTimeStr = `${dateStr} ${actualHours.toString().padStart(2, '0')}:${minutes}`;
    console.log(dateTimeStr);
    return new Date(dateTimeStr);
};
  
  const sortEventsByDate = (events) => {
    return events.sort((a, b) => {
      const aDateTime = convertToDateTime(a.startDate, a.startTime, a.startMeridiem);
      const bDateTime = convertToDateTime(b.startDate, b.startTime, b.startMeridiem);
      return aDateTime - bDateTime;
    });
  };

const ViewSchedulePopup = ({ storeList, isOpen, onClose, content, user}) => {
  const { state } = useLocation();
  const [playlists, setPlaylists] = useState([]); // State to hold fetched playlists
  const [playlistObj, setPlaylistObj] = useState({})
  const [updatedStoreList, setUpdatedStoreList] = useState(storeList);

  useEffect(() => {
    // Fetch playlist data from the database for each store in storeList
    const fetchPlaylistData = async () => {
      try {
        let fetchedPlaylists = [];
        let playlistIds = [];
        let temp = await Database.getStoresByStoreIDs(user.stores);
        setUpdatedStoreList(temp);
        for (const store of storeList) {
          const play = await Database.getCurrentLocationPlaylists(store.id);
          for(let i=0; i<play.length; i++){
            if( !(playlistIds.includes(play[i].id))){
              fetchedPlaylists.push(play[i]);
              playlistIds.push(play[i].id)
            }
          }
        }

        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error('Error fetching playlist data:', error);
      }
    };

    fetchPlaylistData();
  }, []);

  const [saveOpen, setSaveOpen] = useState(false);
  // const [saveClose, setSaveClose] = useState(false);

  if (!isOpen) return null;


  async function handleEditClick(event) {
    const buttonId=event.target.id;

    try {
      let playlistInfo = await Database.getPlaylistbyID(buttonId);
      console.log(playlistInfo);
      setPlaylistObj(playlistInfo); 
      setSaveOpen(true);
    } catch (error) {
      console.error('Error getting playlist by ID:', error);
    }

  };
 
  function closeSavePopup(){
    setSaveOpen(false)
  }

  function getFormattedDate(bigNum){
    // const date=new Date(fetchedPlaylists[0].startDate );
    const date=new Date(bigNum);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = date.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return (formattedDate);
  }

  function getFormattedTime(bigNum){
    const date=new Date(bigNum);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return (formattedTime);
  }

  function getLocations(currentPlayID){
    let stores=[];
    // console.log(currentPlayID)
    for(let i=0; i<updatedStoreList.length;i++){
      let currPlays=updatedStoreList[i].playlists;
      // console.log(currPlays);

      if ((currPlays.includes(currentPlayID))){
        // console.log('hi');
        let currLocation={
          address:updatedStoreList[i].location.address,
          city:updatedStoreList[i].location.city,
          state:updatedStoreList[i].location.state,
          zip:updatedStoreList[i].location.zip,
        }
        stores.push(currLocation);
      }
    }
    console.log(`The stores for this playlists: ${currentPlayID} `, stores);

    return stores;
  }

  function delayedFunction() {
    setTimeout(() => {
      // Code to be executed after the time delay
      console.log('Delayed code executed from delayedFunction');
    }, 3000); // Delay of 3000 milliseconds (3 seconds)
  }

  return (
    <div className="popup-overlay">
      <div className='popup-view-sched'>
        <HighlightOffIcon 
          className='x-out' 
          sx={{height:'2vw', width:'2vw'}}
          onClick={onClose}/>
        <div className="scrollable">
            {playlists
            .sort((a, b) => a.startDate - b.startDate) 
            .map((item) => (
            <div className="sched-info-box" key={item.id} sx={{display:'grid'}}>
                <div className="title-view-sched">{item.name}</div>
                <div className="headers" style={{ left: '1%', top: '2.2vw' }}>
                Date & Time
                </div>
                <div className="headers-info" style={{ left: '1%' }}>
                {/* const date=new Date(fetchedPlaylists[0].startDate ); */}
                {/* {item.startDate +' ' +item.startTime+ item.startMeridiem +' - '+ item.endDate+ ' '+ item.endTime + item.endMeridiem} */}
                {getFormattedDate(item.startDate)+ " "} 
                {getFormattedTime(item.startDate)+ " to "}
                <br/>
                {getFormattedDate(item.endDate)+ " "}
                {getFormattedTime(item.endDate)}
                </div>
                <div className="headers" style={{ left: '50%', top:'2.2vw' }}>
                Locations
                </div>
                <div className='scrollable-locations'>
                    {/* {delayedFunction} */}
                    {getLocations(item.id).map((store) => 
                      <div className='location-item'>
                        {store.address+" "}{store.city}{", "+store.state+" "}{store.zip}
                      </div>
                    )
                    }
                
                </div>
                <EditIcon 
                  id={item.id} 
                  sx={{width:'2vw', height:'2vw'}}
                  className="edit-icon" 
                  onClick={handleEditClick}
                  />
            </div>
            ))}

            {saveOpen && (
                  <div className="popup">
                  <div className="popup-content">
                  <EditPopup playlist={playlistObj} onClose={closeSavePopup}/>
                    <button className="close-btn" onClick={closeSavePopup}>X</button>
                  </div>
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default ViewSchedulePopup;