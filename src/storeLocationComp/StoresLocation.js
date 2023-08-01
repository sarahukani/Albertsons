import React, { useState } from 'react';
import { getStates } from './States.js'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import './StoresLocation.css';

const StoreLocation = () => {
  const { state } = useLocation()
  const [selectedState, setSelectedState] = useState(null);
  const [stateOptions, setStateOptions] = useState(getStates(state.storeList));
  
  let storeN = "Pavilions"
  if(state){
    storeN = state.storeName
  }

  const [storeList, setStoreList] = useState([]);
  const navigate = useNavigate();

  const handleOnChange = (storeId) => {
    setCheckedState(prevState => ({
      ...prevState, 
      [storeId]: !prevState[storeId]
    }))

  }

  const handleStateSelection = (event, newValue) => {
    if (newValue) {
      setSelectedState(newValue);
      fetchStores(newValue.value);
    }
  };

  const fetchStores = (selectedStateValue) => {
    const stores = []
    for (let i = 0; i < state.storeList.length; i++){
      if(state.storeList[i].storeName === state.storeName && state.storeList[i].location.state === selectedStateValue){
        stores.push(state.storeList[i])
      }
    }
    setStoreList(stores);
  };

  const initializeCheckedState = (storeList) => {
    const initialState = {};
    for (const store of storeList) {
      initialState[store.id] = false;
    }
    return initialState;
  };

  const getStores = () =>{
    var chosenStores = []
    for(let i = 0; i < state.storeList.length; i++){
      if(checkedState[state.storeList[i].id]){
        chosenStores.push(state.storeList[i])
      }
    }
    return chosenStores
  }

  const [checkedState, setCheckedState] = useState(() =>
    initializeCheckedState(state.storeList)
  );

  const handleBack = () => {
    navigate('/banner', {state: {user: state.user}})
  };

  const handleNext = () => {
    const chosenLoc = getStores()
    if (chosenLoc.length !== 0) {
      navigate(`/verification`
      ,
      {state: {storeList: state.storeList, 
               chosenLoc: chosenLoc, 
               storeName: storeN,
               user: state.user}}
      );
    } else {
      alert("Please choose a location!")
    }
  };

  return (
    <div className="split-container">
      <div className="left-side">
      </div>
      <div className="right-side">
        <div className="search-bar-wrapper">
        <h3 className="locSelect">Location Selection</h3>
          <p className="subheader">Search for banner locations. You may select multiple locations.</p>
          <div className="search-bar">
            <Autocomplete
              options={stateOptions}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <div className="search-input-container">
                  <SearchIcon className="search-icon" />
                  <TextField
                    {...params}
                    variant="outlined"
                    className="search-input"
                    sx={{
                      width:600,
                      backgroundColor: "#EAEAEA",
                      borderRadius: '7px',
                      boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.2)'
                    }}
                  />
                </div>
              )}
              value={selectedState}
              onChange={handleStateSelection}
              filterOptions={(options, { inputValue }) =>
                options.filter((option) =>
                  option.label.toLowerCase().includes(inputValue.toLowerCase())
                )
              }
            />
          </div>
        </div>
        <div className="store-list">
          <ul className="s-list">
            {(storeList.length === 0) ? <h4 className="invalidMess">You have no stores available to you in this state</h4>:
            storeList.map((store, index) => (
              <li key={index} className="listEle">
                <label>
                  <input 
                    type="checkbox"
                    className="check"
                    id={`custom-checkbox-${index}`}
                    name={store}
                    value={store}
                    checked={checkedState[store.id]}
                    onChange={() => handleOnChange(store.id)}
                  />  
                  <span class="checktext"> {store.location.address}, {store.location.city}, {store.location.state} {store.location.zip}   (SID: {store.id})</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="button-container">
          <button className="back-button" onClick={handleBack}>Back</button>
          <button className="next-button" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default StoreLocation;
