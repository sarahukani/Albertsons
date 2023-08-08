
import '../mainComp/Main.css';

import "./EditPopup.css"
import { useState } from "react"
import DatePicker from 'react-datepicker';
import Database from '../data/database.js';

import 'react-datepicker/dist/react-datepicker.css';
 

const EditPopup = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [newName, setNewName] = useState(props.playlist.name)
  const [showModal, setShowModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  function getFormattedDate(bigNum){
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

  const padWithZero = (value) => (value < 10 ? `0${value}` : value);

  async function handleSave(){

    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth()+1;
    const startDay = startDate.getDate();

    const startHour = startTime.getUTCHours();
    const startMin = startTime.getMinutes();
    const startSecs = startTime.getSeconds();
    const estStartHours = (startHour - 8 + 24) % 24; // Adjusting for 4-hour offset and handling wraparound
    // let startStr = (startYear+"-"+padWithZero(startMonth)+"-"+padWithZero(startDay)+"T"+ padWithZero(estStartHours)+":"+padWithZero(startMin)+":00+00:00");
    let startStr = (startYear+"-"+startMonth+"-"+startDay+" "+ padWithZero(estStartHours)+":"+padWithZero(startMin)+":00");
    console.log("START", startStr);

    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth()+1;
    const endDay = endDate.getDate();

    const endHour = endTime.getUTCHours();
    const endMin = endTime.getMinutes();
    const endSecs = endTime.getSeconds();
    const estEndHours = (endHour - 8 + 24) % 24; //init minus 4
    let endStr = (endYear+"-"+endMonth+"-"+endDay+" "+ padWithZero(estEndHours)+":"+padWithZero(endMin)+":00");
    console.log('END',endStr);

    try{
        let editSched = await Database.editPlaylist(props.playlist.id, newName, startStr, endStr);
        props.onClose();
    }
    catch{
        console.error('Error');

    }

    //output

    
  };


  return (
    <div className="schedule-container">
      <div className="section1">
        <div className="playlist-title"><b>Current Playlist:</b>
            <input
                className='edit-playlist-name'
                placeholder={props.playlist.name}
                onChange={(event) => setNewName(event.target.value)}
            ></input> 
        </div>
      </div>
    <div className='start-headers'>
      <div className="section2">
        <div className="section2-heading">Starting Date & Time</div>
        <div className="input1-container">
          <p className="start-date">Enter Start Date:</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MM-dd-yyyy"
            id="start-date"
            maxLength="2"
            placeholder="MM"
            className="start-date-chooser"
            placeholderText={getFormattedDate(props.playlist.startDate)}
          />
        </div>

        <div className="input1-container">
          <p className="start-time">Enter Start Time:</p>
          <DatePicker
            selected={startTime}
            onChange={(time) => setStartTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            id="start-time"
            className='start-time-chooser'
            placeholderText={getFormattedTime(props.playlist.startDate) }
          />
        </div>
        </div>
      </div>
        <div className='end-headers'>
      <div className="section3">
        <div className="section3-heading">Ending Date & Time</div>
        <div className="input1-container">
          <p className="end-date">Enter End Date:</p>
          <DatePicker
            dayAriaLabel="day"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="MM-dd-yyyy"
            id="end-date"
            className="end-date-chooser"
            placeholderText={getFormattedDate(props.playlist.endDate)}
          />
        </div>

        <div className="input1-container">
          <p className="end-time">Enter End Time:</p>
          <DatePicker
            selected={endTime}
            onChange={(time) => setEndTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            id="end-time"
            className="end-time-chooser"
            placeholderText={getFormattedTime(props.playlist.endDate)}
          />
        </div>
        </div>
      </div>

    <button className="save-button" onClick={handleSave}>
        Save
    </button>

    <button className="cancel-button" onClick={props.onClose}>
        Cancel
    </button>
    </div>
  );
};

export default EditPopup;