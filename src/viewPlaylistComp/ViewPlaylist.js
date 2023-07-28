import * as React from 'react';
import Card from '@mui/material/Card';
import Icon from '../mainComp/Icon.js'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom'
import './ViewPlaylist.css'; // Import the CSS file for component-specific styles

export default function ViewPlaylist(props) {
  const [showImage1, setShowImage1] = React.useState(true);
  const { state } = useLocation()

  React.useEffect(() => {
    const timer = setInterval(() => {
      setShowImage1((prevShowImage1) => !prevShowImage1);
    }, 5000); // Change the image every 5 seconds

    return () => {
      clearInterval(timer);
    };
  }, []);

  const campaigns = [
    {
      title: 'Independence Day',
      imageURLs: [
        'https://th.bing.com/th?id=OIP.72FkqQ1Qnib6yKGfpq_nqAHaJQ&w=223&h=279&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
        'https://th.bing.com/th/id/OIP.XWLAfrBwUP7DGMYDOcNJHwAAAA?w=203&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.Ytt18POZ5DK30KyaMuWe3AHaFj?w=202&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.faXoLu4X0FqWqccRcOJVAwAAAA?w=118&h=191&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.BAPlSkYYsgHPTQOmWRMWBQHaFj?w=257&h=193&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      ],
    },
    {
      title: 'Valentine Chocolate Sale',
      imageURLs: [
        'https://th.bing.com/th/id/OIP.awtxZe5rZqDCvcbEsgkBmQHaFT?w=263&h=188&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.lHfnd7DlNztIkHKli-OkvAHaHa?w=171&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.pK2XdBdluwIWO6IbmSGjNQHaED?w=309&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.BYPIV7Q6MhkKmATWe2AVhwHaGF?w=214&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.IZHETVyPKIWJi3lLtE9YvgHaKd?w=203&h=287&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      ],
    },
    {
      title: 'Memorial Day',
      imageURLs: [
        'https://th.bing.com/th/id/OIP.1TbPzV1OkW23HB7jJ-Q57gHaEK?w=298&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.dskebpCC-bsieu-_aojZnQHaEK?w=282&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.dC1KnR7JdD903Hb4Fz1pqwHaEK?w=266&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.igdpQI7Px8-qK-3VCJy36AHaHa?w=210&h=184&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.OfZJ0_uceNyEFGB8M3wbagHaC1?w=278&h=133&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      ],
    },
    {
      title: 'Big Sale',
      imageURLs: [
        'https://th.bing.com/th/id/OIP.DeekCWN6SnLURHamS3LidAHaGW?w=206&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.gI4xCF41cjQCEHuddHXHmAHaGW?w=242&h=208&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.3nfK7NQWRDYal6PFc6HXFwHaGV?w=228&h=195&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP._qvBvyz9PjXF0D5du7sXLgHaGW?w=231&h=198&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.8EFUpqPo67DaxcLwOBypHwHaGW?w=180&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      ],
    },
    {
      title: 'Whole Store Discount',
      imageURLs: [
        'https://th.bing.com/th/id/OIP._xPlgCFC9JODmWeOPwOtcQHaCp?w=333&h=125&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.n_3z_kqyuw4DeTLTruIMlQHaIY?w=136&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.yZgKbWMn99GmbU_cjIhWZQHaFj?w=199&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.rlbU0-Y19dyx-Gli3MwylwHaFj?w=239&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.D-0b8gvhMmVnCa3uHI0bcwAAAA?w=133&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      ],
    },
    {
      title: '1 Month Campaign',
      imageURLs: [
        'https://th.bing.com/th/id/OIP.4DENtJjm11xIKSh8VbbosQHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.lwGHEdxVMRMxJX0D_HTP0QHaGV?w=200&h=171&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.GkcmDTv9DPWeR8x6aw5x9gHaGV?w=200&h=171&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.I0aKHbgzNW7Gzxslp2VrmAHaFj?w=212&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://th.bing.com/th/id/OIP.0mXPE50WMRrf2WN_qTQRswHaE7?w=184&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      ],
    },
  ];

  const topCampaigns = campaigns.slice(0, 3); // Select the first three campaigns
  const bottomCampaigns = campaigns.slice(3, 6); // Select the last three campaigns

  return (
    <div className="card-container">
      <Icon storeName={props.storeName}></Icon>
      <div className="top-cards">
        {topCampaigns.map((campaign, index) => (
          <Card key={index} className="card" sx={{ height: 250, width: 260 }}>
            <div className="image-container">
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
                  image={campaign.imageURLs[2]}
                  alt={campaign.title}
                />
              </div>
              <div className={`image ${showImage1 ? 'show-image2' : 'show-image1'}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={campaign.imageURLs[1]}
                  alt={campaign.title}
                />
                <CardMedia
                  component="img"
                  height="140"
                  image={campaign.imageURLs[3]}
                  alt={campaign.title}
                />
              </div>
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" className="card-title">
                {campaign.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="bottom-cards">
        {bottomCampaigns.map((campaign, index) => (
          <Card key={index} className="card" sx={{ height: '100%', maxWidth: 345 }}>
            <div className="image-container">
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
                  image={campaign.imageURLs[2]}
                  alt={campaign.title}
                />
              </div>
              <div className={`image ${showImage1 ? 'show-image2' : 'show-image1'}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={campaign.imageURLs[1]}
                  alt={campaign.title}
                />
                <CardMedia
                  component="img"
                  height="140"
                  image={campaign.imageURLs[3]}
                  alt={campaign.title}
                />
              </div>
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" className="card-title">
                {campaign.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
