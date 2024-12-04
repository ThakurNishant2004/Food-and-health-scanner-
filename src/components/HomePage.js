import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import "./HomePage.css";
import chatbot from "../assests/chatbot.svg";
import gallery from "../assests/gallery.svg";
import click from "../assests/click.svg";
import keyboard from "../assests/keyboard.svg";

const HomePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);

  
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      performOCR(file);
    }
  };

  const handleGalleryClick = () => {
   
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const performOCR = (imageFile) => {
    setLoading(true);
    Tesseract.recognize(
      imageFile,
      "eng",
      {
        logger: (info) => console.log(info), 
      }
    )
      .then(({ data: { text } }) => {
        setOcrText(text);
      })
      .catch((error) => {
        console.error("OCR Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderOcrButtons = () => {
  
    const items = ocrText.split(/,|\n/).map((item) => item.trim()).filter((item) => item);
    return items.map((item, index) => (
      <button key={index} className="ocr-button">
        {item}
      </button>
    ));
  };

  return (
    <div className="app">
      {/* Header Section */}
      <header className="header">
        <h1>NutriTrack</h1>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#profile">Profile</a>
          <a href="#contact">Contact us</a>
        </nav>
      </header>

    
      <main className="main-content">
       
        {!ocrText ? (
          <div className="black-box">
            <p>Black Screen Placeholder</p>
          </div>
        ) : (
          <div className="ocr-result">
            {loading ? (
              <p>Processing Image...</p>
            ) : (
              <>
                <div className="image-preview">
                  <h3>Uploaded Image:</h3>
                  <img src={selectedImage} alt="Uploaded" />
                </div>
                <div className="ocr-buttons">
                  <h3>OCR Result </h3>
                  {renderOcrButtons()}
                </div>
              </>
            )}
          </div>
        )}

        {/* Floating Buttons */}
        <div className="floating-buttons">
          <button className="circle-btn">
            <img className="chatbot" src={chatbot} alt="chatbot" />
          </button>
          <button className="circle-btn">
            <img className="chatbot" src={click} alt="click" />
          </button>
          <button className="circle-btn" onClick={handleGalleryClick}>
            <img className="chatbot" src={gallery} alt="gallery" />
          </button>
          <button className="circle-btn">
            <img className="chatbot" src={keyboard} alt="keyboard" />
          </button>
        </div>

     
        <div className="ocr-section">
       
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
