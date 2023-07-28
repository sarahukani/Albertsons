import React, { useState, useRef } from 'react';
import './ViewSchedulePopup.css';
import { left } from '@popperjs/core';
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import EditIcon from '@mui/icons-material/Edit';

const data = [
    {
      id: 1,
      title: "Mother's Day",
      location: '777 Butcher Ave, Los Angeles, CA',
      startingDate: '3/14/24',
      startTime: '6:00',
      endDate: '2/15/24',
      endTime: '23:59'
    },
    {
      id: 2,
      title: 'Halloween',
      location: '423 Roycroft Ave, Los Angeles, CA',
      startingDate: '5/7/23',
      startTime: '11:00',
      endDate: '6/15/24',
      endTime: '11:00'
    },
    {
      id: 3,
      title: "Father's Day",
      location: '123 Lotus Ave, Los Angeles, CA',
      startingDate: '3/14/24',
      startTime: '5:00',
      endDate: '4/15/24',
      endTime: '5:00'
    }, 
    {
        id: 4,
        title: 'Halloween',
        location: '423 Roycroft Ave, Los Angeles, CA',
        startingDate: '5/7/23',
        startTime: '11:00',
        endDate: '6/15/24',
        endTime: '11:00'
      },
      {
        id: 5,
        title: "Father's Day",
        location: '123 Lotus Ave, Los Angeles, CA',
        startingDate: '3/14/24',
        startTime: '5:00',
        endDate: '4/15/24',
        endTime: '5:00'
      }, 
  ];

  //integrate below w Idris' stuff
  const newScheduling = {
    id: data[data.length-1].id,
    title: "Mother's Day",
    location: '123 Elm St, New York, NY',
    startingDate: '7/1/25',
    startTime: '9:00',
    endDate: '7/5/25',
    endTime: '18:00'
  }
  data.push(newScheduling);

const convertToDateTime = (dateStr, timeStr) => {
    const startDateTime = `${dateStr} ${timeStr}`;
    return new Date(startDateTime);
  };
  
  const sortEventsByDate = (events) => {
    return events.sort((a, b) => {
        const aDateTime = convertToDateTime(a.startingDate, a.startTime);
        const bDateTime = convertToDateTime(b.startingDate, b.startTime);
        return aDateTime - bDateTime;
    });
  };

const ViewSchedulePopup = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  const sortedData = sortEventsByDate(data);

  return (
    <div className="popup-overlay">
      <div className='popup'>
        <HighlightOffIcon className='x-out' onClick={onClose}/>
        <div className="scrollable">
            {sortedData.map((item) => (
            <div className="sched-info-box" key={item.id}>
                <div className="title">{item.title}</div>
                <div className="headers" style={{ left: '1%' }}>
                Location
                </div>
                <div className="headers" style={{ left: '50%' }}>
                Date & Time
                </div>
                <div className="headers-info" style={{ left: '1%' }}>
                {item.location}
                </div>
                <div className="headers-info" style={{ left: '50%' }}>
                {item.startingDate +' ' +item.startTime+ ' - '+ item.endDate+ ' '+ item.endTime}
                </div>
                <EditIcon className="edit-icon"/>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewSchedulePopup;