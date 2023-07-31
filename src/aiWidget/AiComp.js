import "./AiComp.css"
import { useState } from 'react'

export default function AiComp(props){
    const [location, setLocation] = useState("")
    const [age, setAge] = useState("")
    const [productCat, setProductCat] = useState("")
    const [weather, setWeather] = useState("")
    const [holiday, setHoliday] = useState("")
    const [rec, setRec] = useState("")

    const handleLocationChange = (event) => {
        let city = ""
        let state = ""
        for(let i = 0; i < props.storeList.length; i++){
            let target = props.storeList[i].location.address + ", " + props.storeList[i].location.city + " " + props.storeList[i].location.state
            // console.log(event.target.value)
            // console.log(target) 
            if(target === event.target.value){
                city = props.storeList[i].location.city
                state = props.storeList[i].location.state
            }
        }

        const city_state = city + " " + state

        setLocation(city_state);
    };
    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };
    const handleProductChange = (event) => {
        setProductCat(event.target.value);
    };
    const handleWeatherChange = (event) => {
        setWeather(event.target.value);
    };
    const handleHolidayChange = (event) => {
        setHoliday(event.target.value);
    };

    function clickGen(){
        if(location === "" || location === " "){
            alert("Please choose a location")
        } else{
            // const result = "This will be the reccomendation for the left choices"
            // setRec(result)

            var myHeaders = new Headers();
            myHeaders.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7");
            myHeaders.append("Accept-Language", "en-US,en;q=0.9");
            myHeaders.append("Cache-Control", "max-age=0");
            myHeaders.append("Connection", "keep-alive");
            myHeaders.append("Upgrade-Insecure-Requests", "1");
            myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36");
            
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch("http://34.123.247.7:2002/getrec/script-call/?category=icecream&location=nyc&demographic=20s&weather=sunny&name=Rashmi", requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
                    }
    }

    return(
        <div className="scroll-div">
            <p className="firstText">Start by <b><i>inputting the following fields:</i></b></p>
            <p className="secondText">Here are some <b>relevant images:</b></p>
            <div className="detailedDescrip">
                <h3 className="locName">Location:</h3>
                <select className="location" onChange={handleLocationChange}>
                    <option value="">-- Select a location --</option>
                    {props.storeList.map((store, index) =>
                        <option>{store.location.address}, {store.location.city} {store.location.state}</option>
                    )}
                </select>
                <br></br>
                <h3 className="ageName">Age:</h3>
                <input className="age" onChange={handleAgeChange}></input>
                <h3 className="productName">Product<br></br> Category:</h3>
                <input className="productCategory" onChange={handleProductChange}></input>
                <h3 className="weatherName">Weather:</h3>
                <input className="weather" onChange={handleWeatherChange}></input>
                <h3 className="holidayName">Holiday:</h3>
                <input className="holiday" onChange={handleHolidayChange}></input>
            </div>
            <button className="generateBtn" onClick={clickGen}>Generate</button>
            <div className="reccomendations">
                <img src="https://images.albertsons-media.com/is/image/ABS/960109087?$ecom-product-card-desktop-jpg$&defaultImage=Not_Available"/>
                <img src="https://images.albertsons-media.com/is/image/ABS/960109087?$ecom-product-card-desktop-jpg$&defaultImage=Not_Available"/>
                <img src="https://images.albertsons-media.com/is/image/ABS/960109087?$ecom-product-card-desktop-jpg$&defaultImage=Not_Available"/>
            </div>
            <div className="imgRecs">
                <p className="thirdText">Here are some <b>product recommendations:</b></p>
            </div>  
        </div>
    )
}