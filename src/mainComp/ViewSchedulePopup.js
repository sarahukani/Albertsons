import React, { useState, useRef } from 'react';
import './ViewSchedulePopup.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import EditIcon from '@mui/icons-material/Edit';

const data = [
    {
      id: 0,
      title: "Mother's Day",
      location: ['777 Butcher Ave, Los Angeles, CA','777 Butcher Ave, Los Angeles, CA','777 Butcher Ave, Los Angeles, CA','777 Butcher Ave, Los Angeles, CA'],
      startingDate: '3/14/24',
      startTime: '6:00',
      startMeridiem: 'am',
      endDate: '2/15/24',
      endTime: '11:59',
      endMeridiem: 'pm'
    },
    {
      id: 1,
      title: 'Halloween',
      location: '423 Roycroft Ave, Los Angeles, CA',
      startingDate: '5/7/23',
      startTime: '11:00',
      startMeridiem: "pm",
      endDate: '6/15/24',
      endTime: '11:00',
      endMeridiem: 'pm'
    },
    {
      id: 2,
      title: "Father's Day",
      location: '123 Lotus Ave, Los Angeles, CA',
      startingDate: '3/15/24',
      startTime: '5:00',
      startMeridiem: 'am',
      endDate: '4/15/24',
      endTime: '5:00',
      endMeridiem: 'pm'
    },
    {
      id: 3,
      title: 'Halloween',
      location: '423 Roycroft Ave, Los Angeles, CA',
      startingDate: '5/7/23',
      startTime: '11:00',
      startMeridiem: "pm",
      endDate: '6/15/24',
      endTime: '11:00',
      endMeridiem: 'pm'
    },
    {
      id: 4,
      title: "Father's Day",
      location: '123 Lotus Ave, Los Angeles, CA',
      startingDate: '3/15/24',
      startTime: '5:00',
      startMeridiem: 'am',
      endDate: '4/15/24',
      endTime: '5:00',
      endMeridiem: 'pm'
    },
    {
      id: 5,
      title: 'Halloween',
      location: '423 Roycroft Ave, Los Angeles, CA',
      startingDate: '5/7/23',
      startTime: '11:00',
      startMeridiem: "pm",
      endDate: '6/15/24',
      endTime: '11:00',
      endMeridiem: 'pm'
    },
    {
      id: 6,
      title: "Father's Day",
      location: '123 Lotus Ave, Los Angeles, CA',
      startingDate: '3/15/24',
      startTime: '5:00',
      startMeridiem: 'am',
      endDate: '4/15/24',
      endTime: '5:00',
      endMeridiem: 'pm'
    }
    ,
    {
      id: 7,
      title: 'Halloween',
      location: '423 Roycroft Ave, Los Angeles, CA',
      startingDate: '5/7/23',
      startTime: '11:00',
      startMeridiem: "pm",
      endDate: '6/15/24',
      endTime: '11:00',
      endMeridiem: 'pm'
    },
    {
      id: 8,
      title: "Father's Day",
      location: '123 Lotus Ave, Los Angeles, CA',
      startingDate: '3/15/24',
      startTime: '5:00',
      startMeridiem: 'am',
      endDate: '4/15/24',
      endTime: '5:00',
      endMeridiem: 'pm'
    }
    ,
    {
      id: 9,
      title: 'Halloween',
      location: '423 Roycroft Ave, Los Angeles, CA',
      startingDate: '5/7/23',
      startTime: '11:00',
      startMeridiem: "pm",
      endDate: '6/15/24',
      endTime: '11:00',
      endMeridiem: 'pm'
    },
    {
      id: 10,
      title: "Father's Day",
      location: '123 Lotus Ave, Los Angeles, CA',
      startingDate: '3/15/24',
      startTime: '5:00',
      startMeridiem: 'am',
      endDate: '4/15/24',
      endTime: '5:00',
      endMeridiem: 'pm'
    }
  ];

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
    return new Date(dateTimeStr);
};
  
  const sortEventsByDate = (events) => {
    return events.sort((a, b) => {
      const aDateTime = convertToDateTime(a.startingDate, a.startTime, a.startMeridiem);
      const bDateTime = convertToDateTime(b.startingDate, b.startTime, b.startMeridiem);
      return aDateTime - bDateTime;
    });
  };

  //this will be called in Idris' code
  const addNewPlaylist = (newEntry) => {
    data.push(newEntry);
  };

const ViewSchedulePopup = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  const sortedData = sortEventsByDate(data);

  const handleEditClick = (event) => {
    const buttonId=event.target.id;
    console.log(data[buttonId]);

    //when hitting this, i need to route to create schedule, open up that page, fill in the info associated
    //with the edit button, and pass along a flag or something that says that we came from the edit page
    //if the user hits the x button, go back to my code and change nothing (if edit and x out)
    //if user hits schedule, send that info back to my code and update it
  };
 
  return (
    <div className="popup-overlay">
      <div className='popup-view-sched'>
        <HighlightOffIcon 
          className='x-out' 
          sx={{height:'2vw', width:'2vw'}}
          onClick={onClose}/>
        <div className="scrollable">
            {sortedData.map((item) => (
            <div className="sched-info-box" key={item.id}>
                <div className="title-view-sched">{item.title}</div>
                <div className="headers" style={{ left: '1%', top: '2.2vw' }}>
                Date & Time
                </div>
                <div className="headers-info" style={{ left: '1%' }}>
                {item.startingDate +' ' +item.startTime+ item.startMeridiem +' - '+ item.endDate+ ' '+ item.endTime + item.endMeridiem}
                </div>
                <div className="headers" style={{ left: '50%', top:'2.2vw' }}>
                Locations
                </div>
                <div className='scrollable-locations'>
                  {Array.isArray(item.location)
                      ? item.location.map((location, index) => (
                          <div key={index} className="location-item">
                            {location}
                          </div>
                        ))
                      : <div className="location-item">{item.location}</div>
                    }
                </div>
                <EditIcon 
                  id={item.id} 
                  sx={{width:'2vw', height:'2vw'}}
                  className="edit-icon" 
                  onClick={handleEditClick}/>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewSchedulePopup;