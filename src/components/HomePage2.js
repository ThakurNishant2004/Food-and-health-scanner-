import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import "./HomePage2.css";
import "./chatbot.css"
import "./renderFoodDetails.css";
import { useNavigate } from "react-router-dom";
import chatbotImage from "../assests/chatbot2.svg";

const HomePage = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [ocrText, setOcrText] = useState("");
    const [loading, setLoading] = useState(false);
    const [cameraActive, setCameraActive] = useState(true);
    const [initialScreen, setInitialScreen] = useState(true);
    const [foodData, setFoodData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const webcamRef = useRef(null);
    const fileInputRef = useRef(null);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false); // Added state for chatbot visibility
    const [messages, setMessages] = useState([{ text: "Hello! How can I assist you today?", sender: "bot" }]);
    const [userInput, setUserInput] = useState("");


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
        if (!cameraActive) {
            setCameraActive(true);
            setOcrText("");
            setSelectedImage(null);
        } else {
            captureImage();
        }
    };

    const handleStartScanning = () => {
        setInitialScreen(false);
        setCameraActive(true);
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
        Tesseract.recognize(imageFile, "eng", {
            logger: (info) => console.log("OCR Progress:", info),
        })
            .then(({ data: { text } }) => {
                setOcrText(text);
                setCameraActive(false);
            })
            .catch((error) => {
                console.error("OCR Error:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen); // Toggle chatbot visibility
    };
    const handleSendMessage = () => {
        if (userInput.trim() === "") return; // Prevent sending empty messages

        const newMessages = [...messages, { text: userInput, sender: "user" }];

        // Mock a bot reply (replace with dynamic responses if needed)
        const botReply = { text: "I'm here to help with your queries!", sender: "bot" };

        setMessages([...newMessages, botReply]); // Update messages
        setUserInput(""); // Clear input
    };

    const fetchFoodData = async (foodItem) => {
        const sanitizedItem = foodItem.trim().toLowerCase();

        if (!sanitizedItem || sanitizedItem.length === 0) {
            alert("Please enter a food item name.");
            return;
        }


        console.log("Requesting data for:", sanitizedItem);

        try {
            setLoading(true);

            const payload = { Food_Name: sanitizedItem };
            console.log("Sending payload:", JSON.stringify(payload));

            const response = await fetch("https://nutritrack-fk3j.onrender.com/api/nutrition", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            console.log(response.status);
            console.log(response.body);

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Server response error:", errorResponse);

                if (response.status === 400) {
                    throw new Error(errorResponse.error || "Bad Request: Check the payload.");
                } else {
                    throw new Error(`Failed to fetch: ${response.status}`);
                }
            }

            const data = await response.json();

            setFoodData({
                name: data.data.Food_Name || sanitizedItem,
                calories: data.data.Calories || "0",
                fat: data.data.Fat || "0",
                carbs: data.data.Carbs || "0",
                sugar: data.data.Sugar || "0",
                protein: data.data.Protein || "0",
                dietaryfiber: data.data.Dietary_fiber || "0",
                cholesterol: data.data.Cholesterol || "0",
                iron: data.data.Iron || "0",
                nutriDensity: data.data.Nutri_Density || "0",
            });
        } catch (error) {
            console.error("Error fetching food data:", error);

            if (error.message.includes("Bad Request")) {
                alert("The server rejected the request. Ensure the food item is valid.");
            } else {
                alert("An error occurred while fetching data. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };



    const renderOcrButtons = () => {
        const items = ocrText
            .split(/,|\n/)
            .map((item) => item.trim())
            .filter((item) => item);
        return items.map((item, index) => (
            <button
                key={index}
                className="ocr-button"
                onClick={() => fetchFoodData(item)}
            >
                {item}
            </button>
        ));
    };

    const renderFoodDetails = () => {
        if (!foodData) return null;

        const totalCalories = parseFloat(foodData.calories) || 0;
        const proteinCalories = (parseFloat(foodData.protein) || 0) * 4;
        const carbsCalories = (parseFloat(foodData.carbs) || 0) * 4;
        const fatCalories = (parseFloat(foodData.fat) || 0) * 9;
        const otherCalories = totalCalories - (proteinCalories + carbsCalories + fatCalories);

        const total = proteinCalories + carbsCalories + fatCalories + Math.max(otherCalories, 0);

        const proteinPercentage = ((proteinCalories / total) * 100).toFixed(1);
        const carbsPercentage = ((carbsCalories / total) * 100).toFixed(1);
        const fatPercentage = ((fatCalories / total) * 100).toFixed(1);
        const otherPercentage = (100 - proteinPercentage - carbsPercentage - fatPercentage).toFixed(1);

        return (
            <div className="food-details">
                <div className="nutritional-content">
                    <h1>{foodData.name}</h1>
                    <h2>Nutritional content per serving (~100-150g)</h2>
                    <div className="details-grid">
                        <div className="detail-box">
                            <span>Calories</span>
                            <span className="value">{foodData.calories || "0"} kcal</span>
                        </div>
                        <div className="detail-box">
                            <span>Protein</span>
                            <span className="value">{foodData.protein || "0"} g</span>
                        </div>
                        <div className="detail-box">
                            <span>Carbohydrates</span>
                            <span className="value">{foodData.carbs || "0"} g</span>
                        </div>
                        <div className="detail-box">
                            <span>Fats</span>
                            <span className="value">{foodData.fat || "0"} g</span>
                        </div>
                        <div className="detail-box">
                            <span>Sugar</span>
                            <span className="value">{foodData.sugar || "0"} g</span>
                        </div>
                        <div className="detail-box">
                            <span>Fiber</span>
                            <span className="value">{foodData.dietaryfiber || "0"} g</span>
                        </div>
                    </div>
                </div>

                <div className="donut-chart">
                    <div className="chart">
                        <svg viewBox="0 0 36 36" className="circular-chart">
                            <path
                                className="circle-protein"
                                d={`M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831`}
                                strokeDasharray={`${proteinPercentage}, 100`}
                            />
                            <path
                                className="circle-carbs"
                                d={`M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831`}
                                strokeDasharray={`${carbsPercentage}, 100`}
                                strokeDashoffset={`-${proteinPercentage}`}
                            />
                            <path
                                className="circle-fat"
                                d={`M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831`}
                                strokeDasharray={`${fatPercentage}, 100`}
                                strokeDashoffset={`-${parseFloat(proteinPercentage) + parseFloat(carbsPercentage)}`}
                            />
                            <path
                                className="circle-other"
                                d={`M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831`}
                                strokeDasharray={`${otherPercentage}, 100`}
                                strokeDashoffset={`-${parseFloat(proteinPercentage) + parseFloat(carbsPercentage) + parseFloat(fatPercentage)}`}
                            />
                        </svg>
                        <div className="inner-circle">{totalCalories || "Data not available"}</div>
                    </div>
                    <div className="chart-legend">
                        <div className="legend-item" style={{ background: "#d9534f" }}>
                            Protein ({proteinPercentage}%)
                        </div>
                        <div className="legend-item" style={{ background: "#5bc0de" }}>
                            Carbs ({carbsPercentage}%)
                        </div>
                        <div className="legend-item" style={{ background: "#5cb85c" }}>
                            Fat ({fatPercentage}%)
                        </div>
                        <div className="legend-item" style={{ background: "#f0ad4e" }}>
                            Other ({otherPercentage}%)
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    const handleSearch = () => {
        if (searchQuery.trim()) {
            fetchFoodData(searchQuery);
        } else {
            alert("Please enter a food item to search.");
        }
    };

    const handleBackClick = () => {
        setCameraActive(true);
        setOcrText("");
        setSelectedImage(null);
        setFoodData(null);
    };

    return (
        <div className="app">
            <header className="header">
                <h1 id="heading">NutriTrack</h1>
                <nav className="nav">
                    <a href="#home">Home</a>
                    <a href="#profile" onClick={() => navigate("/Profile")}>Profile</a>
                    <a href="#contact">Contact us</a>
                </nav>
            </header>

            <main className="main-content">
                <div className="scanner-section">
                    <div className="camera-section">
                        {foodData ? (
                            <>
                                {renderFoodDetails()}
                                <button className="back-btn" onClick={handleBackClick}>
                                    Back to Camera
                                </button>
                            </>
                        ) : (
                            <>
                                {cameraActive && (
                                    <div className="camera-container">
                                        <Webcam
                                            audio={false}
                                            ref={webcamRef}
                                            screenshotFormat="image/png"
                                            videoConstraints={{
                                                width: 2920,
                                                height: 1980,
                                                facingMode: "environment",
                                            }}
                                            className="camera-feed"
                                        />
                                    </div>
                                )}
                                {!cameraActive && ocrText && (
                                    <div className="ocr-result-container">
                                        {loading ? (
                                            <p>Processing Image...</p>
                                        ) : (
                                            <>
                                                <div className="ocr-result-sec1">
                                                    <h3>OCR Results:</h3>
                                                    <img
                                                        src={selectedImage}
                                                        alt="Captured"
                                                        className="result-image"
                                                    />
                                                </div>
                                                <div className="ocr-buttons">
                                                    {renderOcrButtons()}
                                                </div>
                                                <button className="back-btn" onClick={handleBackClick}>
                                                    Back to Camera
                                                </button>

                                            </>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="scanner-actions">
                        <div className="camera-btns">
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            <button className="action-btn a-b1" onClick={handleGalleryClick}>
                                Select a File
                            </button>
                            <button className="action-btn" onClick={handleCameraClick}>
                                {cameraActive ? "Capture" : "Re-take"}
                            </button>
                        </div>
                        <p className="seperation">OR</p>
                        <div className="search-bar">
                            <div className="searchSection">
                                <input
                                    type="text"
                                    placeholder="Enter food name"
                                    className="food-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch(); 
                                        }
                                    }}
                                />
                                <button className="search-btn" onClick={handleSearch}>
                                    Search
                                </button>
                            </div>
                            <div className="chatbot-image">
                                <img src={chatbotImage} alt="chatbot" onClick={toggleChatbot} />
                            </div>
                        </div>
                    </div>
                </div>
                {isChatbotOpen && (
                    <div className="chatbot-modal">
                        <div className="chatbot-header">
                            <h3>Assistant</h3>
                            <button className="close-btn" onClick={toggleChatbot}>
                                ✖
                            </button>
                        </div>
                        <div className="chatbot-body">
                            <div className="chatbot-messages">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`message ${message.sender}`}
                                    >
                                        {message.text}
                                    </div>
                                ))}
                            </div>
                            <div className="chatbot-input">
                                <input
                                    type="text"
                                    placeholder="Ask me anything..."
                                    className="chat-input"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)} 
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSendMessage(); 
                                        }
                                    }}
                               />
                                <button className="send-btn" onClick={handleSendMessage}>
                                    Send
                                </button>
                            </div>
                        </div>

                    </div>
                )}


                {/* {renderFoodDetails()} */}
            </main>
        </div>
    );
};

export default HomePage;
