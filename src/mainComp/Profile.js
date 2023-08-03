import React from 'react'
import './Main.css'
import Icon from './Icon.js';
import './Profile.css'
import { Link, useLocation } from 'react-router-dom';

export default function Profile(){
    const { state } = useLocation()
    
    let storeName=""
    let user = "Rashmi" 
    let storeList = []
    if (state){
        storeName= state.storeName
        user = state.user
        storeList = state.storeList
    }

    const data = [
        {
            banner:"albertsons",
            id:"123",
            location:"777 Butcher Ave, Los Angeles, CA"
        },
        {
            banner:"acme",
            id:"182",
            location:"777 Butcher Ave, Los Angeles, CA"
        },
        {
            banner:"pavilions",
            id:"114",
            location:"777 Butcher Ave, Los Angeles, CA"
        },
        {
            banner:"pavilions",
            id:"391",
            location:"777 Butcher Ave, Los Angeles, CA"
        },
        {
            banner:"acme",
            id:"3950",
            location:"777 Butcher Ave, Los Angeles, CA"
        },
        {
            banner:"acme",
            id:"1",
            location:"777 Butcher Ave, Los Angeles, CA"
        },
        {
            banner:"pavilions",
            id:"123",
            location:"777 Butcher Ave, Los Angeles, CA"
        },
        {
            banner:"jewel osco",
            id:"1522",
            location:"777 Butcher Ave, Los Angeles, CA"
        },
        {
            banner:"jewel osco",
            id:"12",
            location:"777 Butcher Ave, Los Angeles, CA"
        },
        {
            banner:"acme",
            id:"11",
            location:"777 Butcher Ave, Los Angeles, CA"
        },
        {
            banner:"jewel osco",
            id:"984",
            location:"777 Butcher Ave, Los Angeles, CA"
        }
    ]

    data.sort((a, b) => {
        if (a.banner < b.banner) return -1;
        if (a.banner > b.banner) return 1;
    
        // If the banners are the same, sort by "id" field numerically
        return parseInt(a.id) - parseInt(b.id);
    });

    const storeInfoContent = data.map((item, index) => (
        <div className="entry" key={item.id}>
            <div className="entry-text">
                {`${item.banner}(id: ${item.id}) ${item.location}`}
            </div>
            {index !== data.length - 1 && <hr className="line" />}
        </div>
    ));

    return(
        <div className="profile-page-container">
            <Icon storeName={storeName} storeList={storeList} user={user}></Icon>
            <div className='profile-container'>
                <div className='image-container-profile'>
                    <img 
                        className='user-image'
                        src="https://th.bing.com/th/id/R.ea0d38e91f172b985c948f989e98c39f?rik=NR0pbQNo1c8XMw&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_357118.png&ehk=cUAdriibLw7xEDkfIXfwIR3GAAijwWJWZIpc7ctVbmo%3d&risl=&pid=ImgRaw&r=0"
                        alt='User profile image'
                    />
                </div>
                <div className='user-email'>emily.greene@publicissapient.com</div>
                <div className='your-stores'>Your stores:</div>
                <div className='scrollable-store-info'>
                    {storeInfoContent}
                </div>

            </div>
        </div>
    )
}