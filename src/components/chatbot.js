import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");

    const handleSend = () => {
        if (!userInput.trim()) return;

        const newMessage = {
            text: userInput,
            sender: "user",
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setUserInput("");

        // Simulate a bot response after a short delay
        setTimeout(() => {
            const botResponse = {
                text: `You said: ${userInput}`,
                sender: "bot",
            };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
        }, 500);
    };

    return (
        <div className="chatbot-container">
            <div className="chat-window">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`chat-message ${message.sender}`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
