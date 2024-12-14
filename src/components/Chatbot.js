import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../Chatbot/config";
import ActionProvider from "../Chatbot/ActionProvider";
import MessageParser from "../Chatbot/MessageParser";
import '../Styles/Chatbot.css';
import VoiceRecognition from "./VoiceRecognition";
const ChatbotPage = () => {
  return (
    <div className="Chat">
       <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
        <VoiceRecognition/>
    </div>
  );
};

export default ChatbotPage;