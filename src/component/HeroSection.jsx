import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log(`${process.env.REACT_APP_BACKEND_URL}/file/upload`)
        const response = await axios.get( `${process.env.REACT_APP_BACKEND_URL}/file/getAll`);
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid data format');
        }
        setImages(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching images');
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Automatically change the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (loading) return <p>Loading images...</p>;
  if (error) return <p>{error}</p>;
  if (images.length === 0) return <p>No images available</p>;

  return (
    <section id="hero" className="relative h-screen flex items-center">
      {/* Background Slideshow */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.fileUrl}
            alt={`Slide ${index + 1}`}
            className={`w-full h-full object-cover absolute inset-0 ${
              index === currentImage ? 'opacity-2000' : 'opacity-0'
            } transition-opacity duration-1000`}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Discover Sri Lanka with Expert Guides
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Tailored Tours for Every Traveler
        </p>
        <button className="bg-white text-black px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
          Book a Guide
        </button>
      </div>

      {/* Slideshow Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentImage ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
