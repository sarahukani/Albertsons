import Database from "../data/database"
import "./AiComp.css"
import { useState } from 'react'

export default function AiComp(props){
    const [location, setLocation] = useState("")
    const [age, setAge] = useState("")
    const [productCat, setProductCat] = useState("")
    const [weather, setWeather] = useState("")
    const [holiday, setHoliday] = useState("")
    const [rec, setRec] = useState([])

    const handleLocationChange = (event) => {
        let store = {}
        for(let i = 0; i < props.storeList.length; i++){
            let target = props.storeList[i].location.address + ", " + props.storeList[i].location.city + " " + props.storeList[i].location.state 
            if(target === event.target.value){
                store = props.storeList[i]
            }
        }
        setLocation(store);
    };

    const handleAgeChange = (event) => {
        let tempage = event.target.value
        tempage = tempage.replaceAll(" ", "+")
        console.log(tempage)
        setAge(tempage);
    };
    const handleProductChange = (event) => {
        let tempproduct = event.target.value
        tempproduct = tempproduct.replaceAll(" ", "+")
        console.log(tempproduct)
        setProductCat(tempproduct);
    };
    const handleWeatherChange = (event) => {
        let tempweather = event.target.value
        tempweather = tempweather.replaceAll(" ", "+")
        console.log(tempweather)
        setWeather(tempweather);
    };
    const handleHolidayChange = (event) => {
        let tempholiday = event.target.value
        tempholiday = tempholiday.replaceAll(" ", "+")
        console.log(tempholiday)
        setHoliday(tempholiday);
    };

    async function clickGen(){
        if(location === "" || location === " "){
            alert("Please choose a location")
        } else{
            // const result = "This will be the reccomendation for the left choices"
            // setRec(result)
            let products = await Database.getProductRecommendations(location.id, productCat, age, weather, holiday);
            console.log(products);
            
            let url = ``
            let pid = 0
            let name = ``
            let price = ``
            let tempProd = ""
            let tempStore = ""
            let recList = []

            for (let i = 1; i < products.length; i += 3){
                pid = products[i+2]
                name = products[i]
                price = products[i+1]
                url = `https://images.albertsons-media.com/is/image/ABS/${pid}?$ng-ecom-product-card-desktop-jpg$&defaultImage=Not_Available`


                tempProd = await Database.createProduct(pid, name, price, url)
                tempStore = await Database.pushStoreProductsList(location.id, pid)
                recList.push(tempProd)
            }
            // console.log(recList);

            setRec(recList)
        }
    }

    //For the info of each of the fields 
    const [ageOpen, setAgeOpen] = useState(false)
    const openAge = () =>{
        setAgeOpen(true)
    }
    const closeAge = () =>{
        setAgeOpen(false)
    }

    const [productOpen, setProductOpen] = useState(false)
    const openProduct = () =>{
        setProductOpen(true)
    }
    const closeProduct = () =>{
        setProductOpen(false)
    }

    const [weatherOpen, setWeatherOpen] = useState(false)
    const openWeather = () =>{
        setWeatherOpen(true)
    }
    const closeWeather = () =>{
        setWeatherOpen(false)
    }

    const [holidayOpen, setHolidayOpen] = useState(false)
    const openHoliday = () =>{
        setHolidayOpen(true)
    }
    const closeHoliday = () =>{
        setHolidayOpen(false)
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
                
                <img onMouseOver={openAge} onMouseLeave={closeAge} className="ageInfoIcon" src="https://cdn-icons-png.flaticon.com/512/471/471662.png"/>
                <h3 className="ageName">Demographic:</h3>
                <input className="age" onChange={handleAgeChange}></input>
                
                <img onMouseOver={openProduct} onMouseLeave={closeProduct} className="productInfoIcon" src="https://cdn-icons-png.flaticon.com/512/471/471662.png"/>
                <h3 className="productName">Product<br></br> Category:</h3>
                <input className="productCategory" onChange={handleProductChange}></input>
                
                <img onMouseOver={openWeather} onMouseLeave={closeWeather} className="weatherInfoIcon" src="https://cdn-icons-png.flaticon.com/512/471/471662.png"/>
                <h3 className="weatherName">Weather:</h3>
                <input className="weather" onChange={handleWeatherChange}></input>
                
                <img onMouseOver={openHoliday} onMouseLeave={closeHoliday} className="holidayInfoIcon" src="https://cdn-icons-png.flaticon.com/512/471/471662.png"/>
                <h3 className="holidayName">Holiday:</h3>
                <input className="holiday" onChange={handleHolidayChange}></input>
            </div>
            <button className="generateBtn" onClick={clickGen}>Generate</button>
            <div className="reccomendations">
                {rec.map((recommendation) =>
                    <img className="recImg" src={recommendation.imageURL}/>
                )} 
            </div>
            <div className="imgRecs-container">
                <p className="thirdText">Here are some <b>product recommendations:</b></p>
                <ol className="recList">
                    {rec.map((recommendation) =>
                        <li>
                            {recommendation.name}<br />
                            <b>&emsp;Price: ${recommendation.price}</b>
                        </li>
                    )}
                </ol>
            </div>

            {ageOpen && (
                <div className="age-info-container">
                    <i>ex: under 6 months, 21 and over, teens, 19-25</i>
                </div>
            )}

            {productOpen && (
                <div className="product-info-container">
                    <i>ex: charcuterie board, beverages, organic fruit</i>
                </div>
            )}

            {weatherOpen && (
                <div className="weather-info-container">
                    <i>ex: snowy day, sunny day, warm, cold</i>
                </div>
            )}

            {holidayOpen && (
                <div className="holiday-info-container">
                    <i>ex: Valentines Day, Fourth of July</i>
                </div>
            )}  
        </div>
    )
}