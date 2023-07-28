import React from 'react';
import './Playlist.css';
import { useNavigate } from 'react-router-dom';

const Playlister = (props) => {
  const navigate = useNavigate();
  const navigateToPlaylist = () => {
    navigate('/viewplaylist', {state: {storeName: props.storeName}});
  };

  return (
    <main>
      <div className="playlist-button-container">
        <button className="view-playlist-button" onClick={navigateToPlaylist}>
          View Playlists
        </button>
      </div>
    </main>
  );
}

export default Playlister;