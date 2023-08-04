import React from 'react';
import './Playlist.css';
import ImageCarousel from './ImageCarousel';
import { useNavigate } from 'react-router-dom';

const Playlister = (props) => {
  const navigate = useNavigate();
  const navigateToPlaylist = () => {
    navigate('/viewplaylist', {state: {
      storeName: props.storeName,
      storeList: props.storeList,
      user: props.user
    }});
  };
  const navigateToCreatePlaylist = () => {
    navigate('/createplaylist', {state: {
      storeName : props.storeName,
      storeList : props.storeList,
      user : props.user
    }});
  };
  const images = [
    'https://images.albertsons-media.com/is/image/ABS/960306244-ECOM?$ng-ecom-pdp-desktop$&defaultImage=Not_Available',
    'https://images.albertsons-media.com/is/image/ABS/960160211-ECOM?$ng-ecom-pdp-desktop$&defaultImage=Not_Available',
    'https://images.albertsons-media.com/is/image/ABS/960132172?$ng-ecom-pdp-desktop$&defaultImage=Not_Available',
    'https://images.albertsons-media.com/is/image/ABS/128200276-ECOM?$ng-ecom-pdp-desktop$&defaultImage=Not_Available'
  ];

  return (
    <main>
      <div className="carousel-playlist-widget">
        <ImageCarousel  images={images} />
        </div>
      <div className="playlist-button-container">
      <button className="create-playlist-button" onClick={navigateToCreatePlaylist}>
          Create Playlist
        </button>
        <button className="view-playlist-button" onClick={navigateToPlaylist}>
          View Playlists
        </button>
      </div>
    </main>
  );
}

export default Playlister;