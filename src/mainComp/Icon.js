import React, { useState, useRef } from 'react';
import './Icon.css';
import ViewSchedulePopup from './ViewSchedulePopup';
import { useNavigate } from 'react-router-dom'

export default function Icon(props){ //props param to pass in store name from main
    const acme = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Acme_Markets_lolo.svg/1200px-Acme_Markets_lolo.svg.png";
    const albertsons = "https://companieslogo.com/img/orig/ACI_BIG-e23b19be.png?t=1597359298";
    const vons = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Vons_logo.svg/1280px-Vons_logo.svg.png";
    const jewelOsco="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Jewel-Osco_logo.svg/1200px-Jewel-Osco_logo.svg.png";
    const marketStreet="https://unitedcloud.relationshop.net/RSData/Store/20200923134659_MSLogo.png";
    const safeway="https://logos-world.net/wp-content/uploads/2022/01/Safeway-Logo.png";
    const shaws="https://assets.stickpng.com/images/62fe5219f31142d937b30c5e.png";
    const tomThumb="https://www.nicepng.com/png/full/139-1394458_tom-thumb-logo-tom-thumb-store-logo.png";
    const unitedSuper="https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/United_Supermarkets_logo.svg/1200px-United_Supermarkets_logo.svg.png";
    const unitedExpress="https://www.theunitedfamily.com/wp-content/uploads/2018/12/unitedexpress_logo.png";
    const randalls="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Randalls_new_logo.svg/2560px-Randalls_new_logo.svg.png";
    const albertsonsMarket="https://www.albertsonsmarket.com/Themes/AlbertsonsMarket5/Content/Images/Default-Logo.png";
    const pavillions="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Pavilions_%28supermarket%29_Logo.svg/2560px-Pavilions_%28supermarket%29_Logo.svg.png";
    const starMarket="https://seeklogo.com/images/S/Star_Market-logo-A2DE79062C-seeklogo.com.png";
    const kings="https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Kings_Food_Markets_logo.svg/1200px-Kings_Food_Markets_logo.svg.png";
    const haggen="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Haggen_logo.svg/1280px-Haggen_logo.svg.png";
    const carrs="https://assets.stickpng.com/thumbs/62fe4dd4f31142d937b30c3f.png";
    const andronico="https://cdn.winsightmedia.com/platform/files/public/gb/News/Andronicos-Community-Markets-Surpasses-1M-in-Instacart-Sales/ACM_logo_CMYK-2.gif";
    const balducci="https://www.purered.net/wp-content/uploads/2019/03/logo_balduccis.png";
    const lucky="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Lucky_Stores_logo.svg/1200px-Lucky_Stores_logo.svg.png";
    const amigos="https://www.amigosunited.com/Themes/Amigos5/Content/Images/Default-Logo.png";
    const albertsonsMarketStreet="https://www.instacart.com/assets/domains/store_configuration/logo/170/white_label_landing_page_d1036021-fe23-404c-b403-b9e7eb3b6750.png";

    const actualStore=props.storeName; //currently selected store
    let storeLink; //correct store link

    if (actualStore === "Albertsons") {
        storeLink = albertsons;
    } else if (actualStore === "Vons") {
        storeLink = vons;
    } else if (actualStore === "JewelOsco") {
        storeLink = jewelOsco;
    } else if (actualStore === "MarketStreet") {
        storeLink = marketStreet;
    } else if (actualStore === "Safeway") {
        storeLink = safeway;
    } else if (actualStore === "Shaws") {
        storeLink = shaws;
    } else if (actualStore === "TomThumb") {
        storeLink = tomThumb;
    } else if (actualStore === "UnitedSuper") {
        storeLink = unitedSuper;
    } else if (actualStore === "UnitedExpress") {
        storeLink = unitedExpress;
    } else if (actualStore === "Randalls") {
        storeLink = randalls;
    } else if (actualStore === "AlbertsonsMarket") {
        storeLink = albertsonsMarket;
    } else if (actualStore === "Pavilions") {
        storeLink = pavillions;
    } else if (actualStore === "StarMarket") {
        storeLink = starMarket;
    } else if (actualStore === "Kings") {
        storeLink = kings;
    } else if (actualStore === "Haggen") {
        storeLink = haggen;
    } else if (actualStore === "Carrs") {
        storeLink = carrs;
    } else if (actualStore === "Andronico") {
        storeLink = andronico;
    } else if (actualStore === "Balducci") {
        storeLink = balducci;
    } else if (actualStore === "Lucky") {
        storeLink = lucky;
    } else if (actualStore === "Amigos") {
        storeLink = amigos;
    } else if(actualStore==="Acme"){
        storeLink=acme;
    } else { 
        storeLink = albertsonsMarketStreet;
    }

    const navigate = useNavigate()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [popupContent, setPopupContent] = useState('');

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleChangeButtonClick = () => {
        navigate('/banner', {state: {user: props.user}});
    }

    const handleViewButtonClick = () => {
        const content = 'This is the content of the popup!';
        setPopupOpen(true);
        setPopupContent(content);
    }
    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const handleProfileButtonClick = () => {
        navigate('/profile', {state: {user: props.user}});
    }

    const handleLogoutButtonClick = () => {
        navigate('/');
    }
    
    const handleLogoClick = () => {
        navigate("/main", {state: {storeList: props.storeList, 
                                    storeName: props.storeName,
                                    user: props.user
        }})
    }


    return (
        <div>
            <div class="logo-container">
                <img
                    className="logo"
                    src = {storeLink}
                    alt="Store Logo"
                    onClick={handleLogoClick}
                />
            </div>
            <img
                className="icon-main"
                src="https://th.bing.com/th/id/R.ea0d38e91f172b985c948f989e98c39f?rik=NR0pbQNo1c8XMw&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_357118.png&ehk=cUAdriibLw7xEDkfIXfwIR3GAAijwWJWZIpc7ctVbmo%3d&risl=&pid=ImgRaw&r=0"
                alt="Icon"
                onClick={toggleDropdown}
            />
            {isDropdownOpen && (
                <div className="dropdown">
                    <div className="option" onClick={handleChangeButtonClick}>
                        <img className="small-icon"
                         src="https://cdn.icon-icons.com/icons2/1883/PNG/512/twocirclingarrows1_120592.png"
                         alt="Change Banner/Location Icon"
                        />
                        <span className="option-text">Change Banner/Location</span>
                    </div>
                    <div className="divider"></div>
                    <div className="option" onClick={handleViewButtonClick}>
                        <img className="small-icon"
                         src="https://cdn-icons-png.flaticon.com/256/2370/2370264.png"
                         alt="View Schedules Icon"
                        />
                        <span className="option-text">View Schedules</span>
                    </div>                    
                    <div className="divider"></div>
                    <div className="option" onClick={handleProfileButtonClick}>
                        <img className="small-icon"
                         src="https://cdn-icons-png.flaticon.com/512/3106/3106773.png"
                         alt="Account/Profile Icon"
                        />
                        <span className="option-text">Account/Profile</span>
                    </div>
                    <div className="divider"></div>
                    <div className="option" onClick={handleLogoutButtonClick}>
                        <img className="small-icon"
                         src="https://www.svgrepo.com/show/132889/logout.svg"
                         alt="Logout Icon"
                        />
                        <span className="option-text">Logout</span>
                    </div>
                    <ViewSchedulePopup isOpen={isPopupOpen} onClose={handleClosePopup} content={popupContent} />
                </div>
            )}
        </div>
      );
}