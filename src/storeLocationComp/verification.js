import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; // Import Button from Material-UI
import './verification.css';


const Verification = () => {
  const location = useLocation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const selectedState = searchParams.get('state');
  const selectedStoreId = searchParams.get('store');

  const handleBack = () => {
    // Go back to the previous page
    navigate('/sl', {state: { storeList: state.storeList,
                              storeName: state.storeName,
                              user: state.user
    }})
  };
  //Hello
  const handleSubmit = () => {
    // Add your submit logic here
    navigate('/main', {state: { storeList: state.chosenLoc, 
                                storeName: state.storeName,
                                user: state.user
    }})
  };

  return (
    <div className="split-container">
      <div className="left-side">
        {/* Content for the left side */}
      </div>
      <div className="right-side">
        {/* Content for the right side */}
        <div>
          <h2 className="headerLoc">Locations</h2>
          <p className='verify'>  Make sure your locations are correct before submitting.</p>
          <div className="infoBox">
            <p className="storeName"><b>Store Name:</b> {state.storeName}</p>
            <ul className="locationList"><br></br>
              {state.chosenLoc.map((store, index) =>
                  <li>{store.location.address}, {store.location.city}, {store.location.state} {store.location.zip} (LocationID: {store.id})</li>
              )}
            </ul>
        </div>
        
          <div className="button-container">
            <button className="back-button" onClick={handleBack}>Back</button>
            <button className="next-button" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
