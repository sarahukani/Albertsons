import React, { useState } from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import '../mainComp/Main.css';

 

const Schedule = ({ onSave }) => {

  const [startDate, setStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);

  const [startTime, setStartTime] = useState(null);

  const [endTime, setEndTime] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);

 

  const handleSchedule = () => {

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

 

    onSave(startDateTime, endDateTime);

 

    setUploadSuccess(true);

    setShowModal(true);

  };

 

  const closeModal = () => {

    setShowModal(false);

  };

 

  return (

    <div className="schedule-container">

      <div className="section1">

        <div className="section1-heading">Confirm Location</div>

      </div>

 

      <div className="section2">

        <div className="section2-heading">Starting Date & Time</div>

        <div className="input1-container">

          <label htmlFor="start-date">Enter Start Date:</label>

          <DatePicker

            selected={startDate}

            onChange={(date) => setStartDate(date)}

            dateFormat="yyyy-MM-dd"

            id="start-date"

            maxLength="2"

            placeholder="MM"

          />

        </div>

 

        <div className="input1-container">

          <label htmlFor="start-time">Enter Start Time:</label>

          <DatePicker

            selected={startTime}

            onChange={(time) => setStartTime(time)}

            showTimeSelect

            showTimeSelectOnly

            timeIntervals={15}

            timeCaption="Time"

            dateFormat="HH:mm"

            id="start-time"

          />

        </div>

      </div>

 

      <div className="section">

        <div className="section2-heading">Ending Date & Time</div>

        <div className="input1-container">

          <label htmlFor="end-date">Enter End Date:</label>

          <DatePicker

            dayAriaLabel="day"

            selected={endDate}

            onChange={(date) => setEndDate(date)}

            dateFormat="yyyy-MM-dd"

            id="end-date"

          />

        </div>

        <div className="input1-container">

          <label htmlFor="end-time">Enter End Time:</label>

          <DatePicker

            selected={endTime}

            onChange={(time) => setEndTime(time)}

            showTimeSelect

            showTimeSelectOnly

            timeIntervals={15}

            timeCaption="Time"

            dateFormat="HH:mm"

            id="end-time"

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

              </div>

              <button className="modal-close" onClick={closeModal}>

                Close

              </button>

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

