import React from 'react';
import './App.css';
import Main from './mainComp/Main.js';
import Login from './loginComp/Login.js';
import './loginComp/Login.css';


import { Routes, Route } from "react-router-dom";
import ViewPlaylist from './viewPlaylistComp/ViewPlaylist';
import Schedule from './createPlaylistComp/Schedule.js';
import StoresLocation from './storeLocationComp/StoresLocation'
import Verification from './storeLocationComp/verification';
import Banner from './bannerSelectionComp/Banner'
import Gallery from './uploadWidget/Gallery'
import ViewSchedule from './viewScheduleComp/ViewSchedule'
import CreatePlaylist from './createPlaylistComp/createPlaylist';
import Profile from './mainComp/Profile'
// import {Routes, Route} from "react-router-dom";
// import ViewPlaylist from './ViewPlaylist';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/sl" element={<StoresLocation />} />
        <Route path="/verification" element={<Verification />} /> 
        <Route path="/viewplaylist" element={<ViewPlaylist />} />
        <Route path="/schedule" element={<Schedule />} /> 
        <Route path="/banner" element={ <Banner /> }/>
        <Route path="/gallery" element={ <Gallery /> }/>
        <Route path="/viewschedule" element={ <ViewSchedule /> }/>
        <Route path="/createplaylist" element={ <CreatePlaylist /> }/>
        <Route path="/profile" element={ <Profile /> }/>
      </Routes>
    </div>
  );
}

export default App;