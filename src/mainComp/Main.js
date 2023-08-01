import React from 'react'
import './Main.css'
import Uploader from '../uploadWidget/Uploader.js'
import Playlist from '../playlistWidget/Playlist.js'
import AiComp from '../aiWidget/AiComp.js'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon.js';
import { Link, useLocation } from 'react-router-dom';

export default function Main(){
    const { state } = useLocation()
    
    let storeName=""
    let user = "Rashmi" 
    let storeList = []
    if (state){
        storeName= state.storeName
        user = state.user
        storeList = state.storeList
    }

    return(
        <div className="mainDiv">
            <Icon storeName={storeName} storeList={storeList} user={user}/>
            <div className='AI_GenBox'>
                <AiComp storeName={storeName} storeList={storeList} user={user}></AiComp>
            </div>
            <div className="Upload">
                <Uploader storeName={storeName} storeList={storeList} user={user}></Uploader> 
            </div>

            <div className='viewPlaylist'>
                <Playlist storeName={storeName} storeList={storeList} user={user}></Playlist>
            </div>
            {/* <div className='Schedule'>
              <Popup></Popup>
            </div> */}
        </div>
    )
}