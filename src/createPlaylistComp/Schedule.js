import React, { useState } from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import '../mainComp/Main.css';

import "./Schedule.css"

 

const Schedule = ({ onSave }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleSchedule = () => {
    console.log("in handle schedule")
    if (!startDate || !endDate || !startTime || !endTime) {
      console.error('Please select both start and end dates and times.');
      return;
    }

    const startDateTime = new Date(startDate);
    startDateTime.setHours(startTime.getHours());
    startDateTime.setMinutes(startTime.getMinutes());

    const endDateTime = new Date(endDate);
    endDateTime.setHours(endTime.getHours());
    endDateTime.setMinutes(endTime.getMinutes());
    setUploadSuccess(true);
    setShowModal(true);
    // onSave(startDateTime, endDateTime);
    
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const sl = [{id: "8010", location: {address:"1 Main Street"}}, {id: "9010", location: {address:"2 Main Street"}}, {id: "9210", location: {address:"3 Main Street"}}]
  
  //refactor this code (this is repetitive with the store location page)
  const initializeCheckedState = (storeList) => {
    const initialState = {};
    for (const store of storeList) {
      initialState[store.id] = false;
    }
    return initialState;
  };

  const [checkedState, setCheckedState] = useState(() =>
    initializeCheckedState(sl)
  );

  const handleOnChange = (storeId) => {
    setCheckedState(prevState => ({
      ...prevState, 
      [storeId]: !prevState[storeId]
    }))
  }

  return (
    <div className="schedule-container">
      <div className="section1">
        <div className="section1-heading">Choose Your Playlist:</div>
        <select className="playlistSelection">
          <option>Playlist 1</option>
          <option>Playlist 2</option>
          <option>Playlist 3</option>
          <option>Playlist 4</option>
          <option>Playlist 5</option>
        </select>
        <div className="locationChoice">Choose Locations:</div>
        <div className="storeList-container">
          <ul className="storeListPopup">
            {sl.map((store, index) =>
            <li className="storeNameList">
              <label>
                <input 
                    type="checkbox"
                    className="check"
                    id={`custom-checkbox-${index}`}
                    name={store}
                    value={store}
                    checked={checkedState[store.id]}
                    onChange={() => handleOnChange(store.id)}
                  />  
                  <span class="checktext">{store.location.address}</span>
              </label>
            </li>
            )}
          </ul>
        </div>
      </div>

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
          />
        </div>
      </div>

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
          />
        </div>
      </div>

      <div className="schedule-button-container">
        <button className="schedule-button" onClick={handleSchedule}>
          Schedule
        </button>
      </div>

      {showModal && (
  <div className={`modal ${uploadSuccess ? 'success' : 'failure'}`}>
    {uploadSuccess ? (
      <>
        <div className="modal-content">
          <span className="modal-icon">&#x2714;</span>
          <h3>Schedule Successful</h3>
          <button className="modal-close" onClick={closeModal}>X</button>
        </div>
      </>
    ) : (
      <>
        <div className="modal-content">
          <span className="modal-icon">&#x2716;</span>
          <h3>Schedule Failed</h3>
        </div>
        <button className="modal-close" onClick={closeModal}>
          Close
        </button>
      </>
    )}
  </div>
)}
    </div>
  );
};

export default Schedule;