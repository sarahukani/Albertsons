import React, { useState, useRef } from 'react';
import './ViewSchedule.css';
import Icon from '../mainComp/Icon.js';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

export default function ViewSchedule(){
    const { state } = useLocation()
    let storeName="Acme"
    let user = "Emily" 
    if (state){
        storeName= state.storeName
        user = state.user
    }

    return (
        <div>
            {/* Fixed header with Icon */}
            {/* <div className="icon-header"> */}
                <Icon storeName={storeName} user={user} />
            {/* </div> */}

            <div className="scrollable-content">
                {/* Your content goes here */}
                {/* <div className="box-container"> */}
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                {/* </div> */}
            </div>
        </div>
      );
}

