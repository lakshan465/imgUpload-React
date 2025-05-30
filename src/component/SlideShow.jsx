import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Slideshow = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get( `${process.env.REACT_APP_BACKEND_URL}/file/getAll`); // Replace with your API endpoint
        
        setImages(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching images');
        setLoading(false);
      }
    };

    fetchImages();
  }, []);


  // Automatically change the image every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // 2000 ms = 2 seconds

    // Cleanup the interval when the component unmounts or images change
    return () => clearInterval(intervalId);
  }, [images]); // This effect runs whenever the images change

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (loading) return <p>Loading images...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="slideshow-container relative flex items-center justify-center mx-auto px-4 py-6">
  {/* Previous Button */}
  <button
    className="prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-2xl px-4 py-2 rounded-full hover:bg-gray-700 focus:outline-none"
    onClick={handlePrevious}
  >
    &#10094;
  </button>

  {/* Slideshow Image and Caption */}
  {images.length > 0 && (
    <div className="slideshow text-center">
      <img
        src={images[currentIndex].fileUrl}
        alt={images[currentIndex].name}
        className="slideshow-image w-full h-auto rounded-lg shadow-lg"
      />
      <p className="image-caption mt-4 text-lg font-semibold text-gray-800">
        {images[currentIndex].name}
      </p>
    </div>
  )}

  {/* Next Button */}
  <button
    className="next absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-2xl px-4 py-2 rounded-full hover:bg-gray-700 focus:outline-none"
    onClick={handleNext}
  >
    &#10095;
  </button>

  {/* Links */}
  <div className="absolute bottom-4 w-full text-center">
    <Link to="/form" className="text-blue-600 underline hover:text-blue-800 mx-2">
      Need to Upload
    </Link>
    <Link to="/" className="text-blue-600 underline hover:text-blue-800 mx-2">
      View Uploads
    </Link>
  </div>
</div>

  );
};

export default Slideshow;
