import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import "./HomePage.css";
import chatbot from "../assests/chatbot.svg";
import gallery from "../assests/gallery.svg";
import click from "../assests/click.svg";
import keyboard from "../assests/keyboard.svg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

 
  useEffect(() => {
    const requestCameraAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }
        console.log("Camera access granted");
      } catch (error) {
        console.error("Camera access denied", error);
        alert("Please allow camera access to proceed.");
      }
    };

    requestCameraAccess(); 
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setCameraActive(false); 
      performOCR(file);
    }
  };

  const handleGalleryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCameraClick = () => {
    if (cameraActive) {
      captureImage(); 
    } else {
      setCameraActive(true);
      setOcrText(""); 
      setSelectedImage(null); 
    }
  };

  const captureImage = () => {
    if (webcamRef.current) {

      setOcrText("");

     
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setSelectedImage(imageSrc);

      
        fetch(imageSrc)
          .then((res) => res.blob())
          .then((blob) => {
            performOCR(blob); 
          })
          .catch((error) => console.error("Blob conversion error:", error));
      } else {
        console.error("Failed to capture image from webcam!");
      }
    }
  };

  const performOCR = (imageFile) => {
    setLoading(true);
    Tesseract.recognize(
      imageFile,
      "eng",
      {
        logger: (info) => console.log("OCR Progress:", info),
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
    const items = ocrText
      .split(/,|\n/)
      .map((item) => item.trim())
      .filter((item) => item);
    return items.map((item, index) => (
      <button key={index} className="ocr-button">
        {item}
      </button>
    ));
  };

  const handleBackClick = () => {
    setCameraActive(true); 
    setOcrText(""); 
    setSelectedImage(null); 
  };

  return (
    <div className="app">
      <header className="header">
        <h1 id="heading">NutriTrack</h1>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#profile" onClick={()=>navigate("/Profile")}>Profile</a>
          <a href="#contact">Contact us</a>
        </nav>
      </header>

      <main className="main-content">
        {!ocrText ? (
          <div className="black-box">
            {cameraActive ? (
              <div className="camera-container">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  videoConstraints={{
                    width: 1920,
                    height: 1080, 
                    facingMode: "environment", 
                  }}
                  className="camera-feed"
                />

                <button onClick={captureImage} className="capture-button">
                  Capture Image
                </button>
              </div>
            ) : (
              <p>Black Screen Placeholder</p>
            )}
          </div>
        ) : (
          <div className="ocr-result">
            {loading ? (
              <p>Processing Image...</p>
            ) : (
              <>
                <div className="image-preview">
                  <h3>Captured Image:</h3>
                  <img src={selectedImage} alt="Captured" />
                </div>
                <div className="ocr-buttons">
                  <h3>OCR Result</h3>
                  {renderOcrButtons()}
                </div>
                <button onClick={handleBackClick} className="back-button">
                  Back to Camera
                </button>
              </>
            )}
          </div>
        )}

        <div className="floating-buttons">
          <button className="circle-btn">
            <img className="chatbot" src={chatbot} alt="chatbot" />
          </button>
          <button className="circle-btn" onClick={handleCameraClick}>
            <img className="chatbot" src={click} alt="camera" />
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
