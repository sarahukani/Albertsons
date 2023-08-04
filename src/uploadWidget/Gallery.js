import React, { useEffect, useState } from 'react';
import '../uploadWidget/Gallery.css';
import Icon from '../mainComp/Icon.js';
import EditIcon from '@mui/icons-material/Edit';
import Uploader from '../uploadWidget/Uploader.js'
import { useLocation } from 'react-router-dom';
import Database from '../data/database';
import DeleteIcon from '@mui/icons-material/Delete';



const Gallery = ({}) => {
const [images, setImages] = useState([]);
const [selectedImage, setSelectedImage] = useState(null);
const [description, setDescription] = useState('');
const [showInput, setShowInput] = useState(false);
const [inputValue, setInputValue] = useState('');
const {state} = useLocation();
const [isEditIconClicked, setIsEditIconClicked] = useState(false);
const [imageInfo, setImageInfo] = useState('');
const [editLink, setEditLink] = useState('');


const location = useLocation();
const { storeIds } = location.state || {};


let title = "Default";
let price = "5.99";




useEffect(() => {
async function fetchData() {
try {
console.log(storeIds);
let products = await Database.getCurrentLocationProducts(storeIds[0].id);
console.log('Fetched products:', products);


// Extract the image_url from each product and create a new array
// const productImages = products.map((product) => product.image_url);


setImages(products);
} catch (error) {
console.error('Error fetching products:', error);
}
}


fetchData();
}, [storeIds]);


const handleSelectIcon = (EditIcon) => {
setShowInput((prevShowInput) => !prevShowInput);
};


const handleImageSelect = (image) => {
setImageInfo(image);
// Toggle selection: if the clicked image is already selected, deselect it.
// Otherwise, set it as the selected image
setSelectedImage((prevSelectedImage) =>
prevSelectedImage === image ? null : image
);
};


const handleInputChange = (event) => {
let tProduct = event.target.value;
tProduct = tProduct.replaceAll(" ", "+");
setInputValue(tProduct);
};


const handleDeleteImage = (image) => {
// Implement the logic to delete the selected image here
// For example, you can use the image ID to delete it from the database
console.log('Deleting image:', image);
};


async function handleSubmit() {
try {
setDescription(inputValue);


if (selectedImage) {
const pID = imageInfo.id;
const storeID = storeIds[0].id;


let editLink = await Database.getEditedImage(pID, title, price, inputValue, storeID);
console.log(editLink);
}


setInputValue(''); // Clear the input after submission
setSelectedImage(null); // Deselect the image after submission
window.location.reload();
} catch (error) {
console.error('Error submitting description:', error);
}
}






const handleInputClick = (event) => {
event.stopPropagation(); // Prevent the click event from bubbling up to the parent div (handleSelectIcon)
};


const labelStyle = {
marginBottom: '5px',
};


const inputStyle = {
padding: '5px',
marginBottom: '10px',
};


let storeName = '';
let user = 'Rashmi';
let storeList = [];
if (state) {
storeName = state.storeName;
user = state.user;
storeList = state.storeList;
}


return (
<div className="gallery-container" >
All upload
<div className="italic-text">
<br></br>
To generate customized AI images, click on the selected image and type in your requirements.
</div>
<Icon storeName={storeName} storeList={storeList} user={user} />
<div className="image-grid">
{images.map((image, index) => (
<div
className={`image-item ${image === selectedImage ? 'selected' : ''}`}
key={index}
onClick={() => handleImageSelect(image)}
style={{ position: 'relative' }}
>
{/* Display the image */}
{image.imageURL ? (
<img src={image.imageURL} alt={image.name} />
) : (
<div className="image-placeholder">Image Not Available</div>
)}


{/* Display the description of the selected image */}
{image === selectedImage && (
<div className="image-description">
<p>{description}</p>
</div>
)}




{/* Show input container only for the selected image */}
{image === selectedImage && (
<div className="containerStyle" onClick={handleInputClick}>
<label htmlFor="userInput" style={{ marginBottom: '5px' }}></label>
<input
type="text"
id="userInput"
// value={inputValue}
onChange={handleInputChange}
style={{ padding: '5px', marginBottom: '10px' }}
/>
<button onClick={handleSubmit}>Submit</button>
</div>
)}


{/* Display the edit icon for all images */}
{image.imageURL && (
<div className="edit-container">
<div className="edit-button" onClick={handleSelectIcon}>
<EditIcon />
</div>
</div>
)}
</div>
))}
</div>
</div>
);
};


export default Gallery;
