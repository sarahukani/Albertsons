import "./AiComp.css"
import { useState } from 'react'

export default function AiComp(props){
    const [location, setLocation] = useState("")
    const [age, setAge] = useState("")
    const [productCat, setProductCat] = useState("")
    const [weather, setWeather] = useState("")
    const [holiday, setHoliday] = useState("")

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
            console.log(location)
            console.log(age)
            console.log(productCat)
            console.log(weather)
            console.log(holiday)
        }
    }

    return(
        <div className="scroll-div">
            <p className="firstText">Start with a <b><i>detailed description</i></b></p>
            <p className="secondText">Here are some <b>recommendations:</b></p>
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
                
            </div>
            <div className="imgRecs">
                <p className="thirdText">Here are some <b>relevant images</b> pulled from the website:</p>
            </div>  
        </div>
    )
}