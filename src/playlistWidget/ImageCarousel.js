import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the next slide index
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
    }, 5000); // Change slide every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, images.length]);

  return (
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        centerMode
        centerSlidePercentage={100} 
        emulateTouch
        selectedItem={currentIndex}
        onChange={(index) => setCurrentIndex(index)}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Carousel ${index}`} />
          </div>
        ))}
      </Carousel>
  );
};

export default ImageCarousel;
