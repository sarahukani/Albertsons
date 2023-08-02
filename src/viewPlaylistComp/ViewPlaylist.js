import * as React from 'react';
import Card from '@mui/material/Card';
import Icon from '../mainComp/Icon.js'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DownloadIcon from '@mui/icons-material/Download';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './ViewPlaylist.css'; // Import the CSS file for component-specific styles

export default function ViewPlaylist(props) {
  const campaigns = [
    {
      title: 'Independence Day',
      imageURLs: [
        'https://cdn3.vectorstock.com/i/1000x1000/36/82/independence-day-sale-background-4th-of-july-vector-15543682.jpg',
        'https://th.bing.com/th/id/OIP.BAPlSkYYsgHPTQOmWRMWBQHaFj?w=257&h=193&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      ],
    },
    {
      title: 'Valentine Chocolate Sale',
      imageURLs: [
        'https://th.bing.com/th/id/OIP.BYPIV7Q6MhkKmATWe2AVhwHaGF?w=214&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://nypost.com/wp-content/uploads/sites/2/2022/02/v-day-sale.png'
      ],
    },
    {
      title: 'Memorial Day',
      imageURLs: [
        'https://th.bing.com/th/id/OIP.igdpQI7Px8-qK-3VCJy36AHaHa?w=210&h=184&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://media.istockphoto.com/id/473651862/vector/memorial-day-sale-tag-eps-10-vector.jpg?s=612x612&w=0&k=20&c=wbPiBtb-Nj2E8nHoMSCifumKMRDUYOuJ9BBzvCYurhc='
      ],
    },
    {
      title: 'Big Sale',
      imageURLs: [
        'https://th.bing.com/th/id/OIP.gI4xCF41cjQCEHuddHXHmAHaGW?w=242&h=208&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.3nfK7NQWRDYal6PFc6HXFwHaGV?w=228&h=195&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      ],
    },
    {
      title: 'Whole Store Discount',
      imageURLs: [
        'https://th.bing.com/th/id/OIP.rlbU0-Y19dyx-Gli3MwylwHaFj?w=239&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.4DENtJjm11xIKSh8VbbosQHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.5&pid=1.7'
      ],
    },
    {
      title: '1 Month Campaign',
      imageURLs: [
        'https://th.bing.com/th/id/OIP.lwGHEdxVMRMxJX0D_HTP0QHaGV?w=200&h=171&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.GkcmDTv9DPWeR8x6aw5x9gHaGV?w=200&h=171&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      ],
    },
  ];

  const [showImage1, setShowImage1] = React.useState(true);
  const { state } = useLocation();
  const [isDropdownOpenArray, setIsDropdownOpenArray] = useState(Array(campaigns.length).fill(false));
  const navigate = useNavigate();
  React.useEffect(() => {
    const timer = setInterval(() => {
      setShowImage1((prevShowImage1) => !prevShowImage1);
    }, 5000); // Change the image every 5 seconds

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleMoreOptions = (index) => {
      setIsDropdownOpenArray((prevIsDropdownOpen) => {
      const newIsDropdownOpen = [...prevIsDropdownOpen];
      newIsDropdownOpen[index] = !newIsDropdownOpen[index];
      return newIsDropdownOpen;
    });
  };

  const handleClosePopup = (index) => {
     setIsDropdownOpenArray((prevIsDropdownOpen) => {
      const newIsDropdownOpen = [...prevIsDropdownOpen];
      newIsDropdownOpen[index] = false;
      return newIsDropdownOpen;
    });
  };

  const handleDownload = () => {
    console.log('download');
  }

  const handleSchedule = () => {
    navigate("/schedule", {state: {storeList: props.storeList, 
      storeName: props.storeName,
      user: props.user
}})
  }

  const MoreOptionsPopup = ({ onClose, onDownload, onSchedule }) => {
    return (
      <div className="more-options-dropdown">
        <div className="dropdown-option" >
            <DownloadIcon sx={{height:'1.25vw', width:'1.25vw', marginRight:'.4vw'}}/>
            <span onClick={onDownload} className="dropdown-text">Download Playlist</span>
        </div>
        <div className="divider"></div>
        <div className="dropdown-option">
            <ScheduleSendIcon  sx={{height:'1.25vw', width:'1.25vw', marginRight:'.4vw'}}/>
            <span onClick={onSchedule} className="dropdown-text">Schedule Playlist</span>
        </div> 
      </div>
    );
  };

  const topCampaigns = campaigns.slice(0, 3); // Select the first three campaigns
  const bottomCampaigns = campaigns.slice(3, 6); // Select the last three campaigns

  return (
    <div className="card-container">
      <Icon storeName={state.storeName} storeList={state.storeList} user={state.user}></Icon>
      <div className="view-playlist-header">All Playlists</div>
      <div className="top-cards">
        {topCampaigns.map((campaign, index) => (
          <Card key={index} className="card" sx={{ height: "37vh", width: "30.5vw", backgroundColor:'lightgray', 
          borderRadius:'10px', boxShadow: '5px 10px 15px darkgray'}}>
            <div className="image-container">
            <MoreHorizIcon 
              className='etc-icon' 
              sx={{cursor:"pointer"}}
              onClick={() => handleMoreOptions(index)}/>
              {isDropdownOpenArray[index] && (
                <MoreOptionsPopup onClose={() => handleClosePopup(index)} onSchedule={handleSchedule} onDownload={handleDownload}/> 
              )}
              <div className={`image ${showImage1 ? 'show-image1' : 'show-image2'}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={campaign.imageURLs[0]}
                  alt={campaign.title}
                />
                <CardMedia
                  component="img"
                  height="140"
                  image={campaign.imageURLs[1]}
                  alt={campaign.title}
                />
              </div>
              <div className={`image ${showImage1 ? 'show-image2' : 'show-image1'}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={campaign.imageURLs[0]}
                  alt={campaign.title}
                />
                <CardMedia
                  component="img"
                  height="140"
                  image={campaign.imageURLs[1]}
                  alt={campaign.title}
                />
              </div>
            </div>
            <CardContent sx={{paddingBottom:'0px', padding:'0px', paddingTop:'40px'}} >
              <Typography 
                gutterBottom 
                variant="h5" 
                component="div" 
                className="card-title"
                sx={{position:"relative", bottom: '0vh', fontSize:'1.5vw', justifyContent:'center', 
                display:'flex', fontWeight:'bold'}}
                >
                {campaign.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="bottom-cards">
        {bottomCampaigns.map((campaign, index) => (
          <Card key={index} className="card" sx={{  height: "37vh", width: "30.5vw", backgroundColor:'lightgray',
          borderRadius:'10px', boxShadow: '5px 10px 15px darkgray' }}>
            <div className="image-container">
              <MoreHorizIcon 
                className='etc-icon' 
                sx={{cursor:"pointer"}}
                onClick={() => handleMoreOptions(index + topCampaigns.length)}
              />
              {isDropdownOpenArray[index + topCampaigns.length] && (
                <MoreOptionsPopup onClose={() => handleClosePopup(index + topCampaigns.length)} onSchedule={handleSchedule} onDownload={handleDownload} />
              )}
              <div className={`image ${showImage1 ? 'show-image1' : 'show-image2'}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={campaign.imageURLs[0]}
                  alt={campaign.title}
                />
                <CardMedia
                  component="img"
                  height="140"
                  image={campaign.imageURLs[1]}
                  alt={campaign.title}
                />
              </div>
              <div className={`image ${showImage1 ? 'show-image2' : 'show-image1'}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={campaign.imageURLs[0]}
                  alt={campaign.title}
                />
                <CardMedia
                  component="img"
                  height="140"
                  image={campaign.imageURLs[1]}
                  alt={campaign.title}
                />
              </div>
            </div>
            <CardContent sx={{paddingBottom:'0px', padding:'0px', paddingTop:'40px'}}>
              <Typography gutterBottom variant="h5" component="div" className="card-title"
              sx={{position:"relative", bottom: '0vh', fontSize:'1.5vw', justifyContent:'center', 
              display:'flex', fontWeight:'bold'}}
              >
                {campaign.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
