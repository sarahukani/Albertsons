import React, { useEffect, useState } from 'react';
import '../uploadWidget/Gallery2.css';
import Icon from '../mainComp/Icon.js';
import EditIcon from '@mui/icons-material/Edit';
import Uploader from '../uploadWidget/Uploader.js'
import { useLocation } from 'react-router-dom';
import Database from '../data/database';
import { useNavigate } from 'react-router-dom';

const Gallery2 = (props) => {
    console.log("im here")
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [description, setDescription] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { state } = useLocation();
    // const fileInputRef = useRef(null);
    const navigate = useNavigate();

    let storeList = {}
    // console.log("Props.storeList", props.storeList);
    // console.log("State.storeList", state.storeList);
    if (!state.storeList) {
        storeList = props.storeList;
    } else {
        storeList = state.storeList;
    }

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("This is storeList", storeList);
                let products = [];
                let tempProducts = new Set(); 
                for (let i = 0; i < storeList.length; i++) {
                    let currProducts = await Database.getCurrentLocationProducts(storeList[i].id);
                    for (let j = 0; j < currProducts.length; j++) {
                        if (!tempProducts.has(currProducts[j].id)) {
                            tempProducts.add(currProducts[j].id);
                            products.push(currProducts[j]);
                        }
                    }
                }
                console.log('Fetched products:', products);

                // Extract the image_url from each product and create a new array
                // const productImages = products.map((product) => product.image_url);

                setImages(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchData();
    }, [storeList]);

    const handleSelectIcon = (EditIcon) => {
        setShowInput((prevShowInput) => !prevShowInput);
    };

    const handleImageSelect = (image) => {
        // Toggle selection: if the clicked image is already selected, deselect it.
        // Otherwise, set it as the selected image.

        setSelectedImage((prevSelectedImage) =>
            prevSelectedImage === image ? null : image
        );
        props.onSelectImage(image);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        console.log('Submitting Description', inputValue, selectedImage);

        const submittedDescription = inputValue;
        console.log('Submitted Description', submittedDescription);

        setDescription(submittedDescription);
        setInputValue(''); // Clear the input after submission
        setShowInput(false); // Hide the input container after submission

        const selectedIndex = images.findIndex((image) => image === selectedImage);

    };

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
    if (state) {
        storeName = state.storeName;
        user = state.user;
        storeList = state.storeList;
    }


 const navigateToGallery = () => {
    localStorage.setItem('uploadedImages', JSON.stringify(images));
    navigate('/gallery', {state: {
      storeName: props.storeName,
      storeList: props.storeList,
      user: props.user
    }});
  };

    return (
        <div className="gallery-container2">
             <button className="create-to-gallery-btn" onClick={navigateToGallery}>
            Gallery
             </button>
             <div className="gallery2-icon"> 
             <Icon storeName={storeName} storeList={storeList} user={user} />
             </div>
            <div className="image-grid2">
                {images.map((image, index) => (
                <div className="image-box2">
                    <div
                        className={`image-item2 ${image === selectedImage ? 'selected' : ''}`}
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
                            <div className="image-description2">
                                <p>{description}</p>
                            </div>
                        )}
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery2;