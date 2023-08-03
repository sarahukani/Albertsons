import './Banner.css'
import Database from '../data/database';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Banner(){
    const navigate = useNavigate()
    let { state } = useLocation()

    const [index, setIndex] = useState(0)
    const [stores, setStores] = useState([])
    
    let storeIds = ["1086", "9187", "3810", "1011"] //Take out in final product
    let user = "Rashmi"
    if(state && state.user!=="Rashmi"){
        storeIds = state.user.stores
        user = state.user
    }

    useEffect(() => {
        Database.getStoresByStoreIDs(storeIds)
            .then((data) => {
                Promise.all(data)
                    .then((resolvedStores)=> {
                        setStores(resolvedStores);
                    })
                    .catch((error)=> {
                        console.log("Error fetching store");
                    })
            })
            .catch((error) => {
                console.log("Error fetching store data", error)
            })
    }, [])

    const storeList = []
    for(let i = 0; i < stores.length; i++){
        if(!storeList.includes(stores[i].storeName)){
            storeList.push(stores[i].storeName)
        }
    }

    const [choice, setChoice]= useState(
        new Array(storeList.length).fill(false)
    )
    
    function handleBack(){
        navigate('/')
    }
    function handleNext(){
        let choiceStores = []
        for(let i = 0; i < stores.length; i++){
            if(stores[i].storeName === storeList[index]){
                choiceStores.push(stores[i])
            }
        }
        navigate('/sl'
        , {state: {storeName: storeList[index],
                   storeList: choiceStores,
                   user: user
        }})
    }
    function choiceClick(index){
        let newChoice = new Array(storeList.length).fill(false)
        newChoice[index] = true

        setIndex(index)
        setChoice(newChoice)
    }

    return(
        <div className="split-container">
        <div className="left-side">
        </div>
        <div className="right-side">
            {(!state) ? <h1 className="welcome">Welcome!</h1> : <h1 className="welcome">Welcome {state.user.firstName}!</h1>}
            <h1 className="header">Banner Selection</h1>
            <p className="subHeader">Select ONE banner from the list below.</p>
            <ul className="storeList">
                {storeList.map((store, index) =>
                    <li className="storeNames">
                        <label style={{ color: "black" }} className="storeListContainer">
                            <input type="radio" checked={choice[index]} name="radio"  onChange={() => choiceClick(index)}/>
                            {store}
                            <span class="checkmark"></span>
                        </label>
                    </li>
                )}
            </ul>
            <div className="button-container">
                <button className="back-button" onClick={handleBack}>Back</button>
                <button className="next-button" onClick={handleNext}>Next</button>
            </div>
        </div>
      </div>
    )
}