import React, { useState } from "react";
import "./ChatUI.css";
import { useWindowAI } from "window-ai-react";

const Chat = () => {
  const { error, generateText, isWindowAIInstalled, loading } = useWindowAI();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    const text = input;
    setInput("");
    if (text.trim()) {
      setMessages((prev) => [...prev, { text, sender: "user" }]);

      const response = await generateText(text, (res) => {
        setCurrentMessage((prev) => prev + " " + res.text);
      });

      setCurrentMessage("");

      const newMessage = { text: response?.at(0)?.text, sender: "ai" };
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  const onGenerate = async () => {
    const response = await generateText(text, (res) => {
      setResult((prev) => prev + " " + res.text);
    });
    setResult(response);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat</div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {currentMessage && (
          <div className={`chat-message ai`}>{currentMessage}</div>
        )}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
