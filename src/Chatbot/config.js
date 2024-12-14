import { createChatBotMessage } from 'react-chatbot-kit';
import StartBtn from '../Component/StartBtn';
import StartSlow from '../Component/StartSlow';
import MessageParserDocs from '../Component/MessageParserDocs';
import data from './data';
import DipslayImage from '../Component/DipslayImage';


const config = {
    botName: "Booked AI Doctor",
    initialMessages: [createChatBotMessage(`Welcome, How can I help You!`, {
        widget: "startBtn"
    })],
    state: {
        checker: null,
        data,
        userData: {
            name: "",
            age: 0,
            category: "",
            product: {
                name: "",
                link: "",
                imageUrl: ""
            }
        }
    },
    widgets: [
        {
            widgetName: "startBtn",
            widgetFunc: (props) => <StartBtn {...props} />,
        },
        {
            widgetName: "startSlow",
            widgetFunc: (props) => <StartSlow {...props} />,
        },
        {
            widgetName: "finalImage",
            widgetFunc: (props) => <DipslayImage {...props} />,
        },
        {
            widgetName: 'messageParser',
            widgetFunc: (props) => <MessageParserDocs {...props} />,
        },
    ]
};

export default config;