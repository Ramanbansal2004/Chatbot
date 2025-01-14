import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import React, {useState} from "react";

const VoiceRecognition = () => {
    const [setTextToCopy] = useState();
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    function stopListening(){
        SpeechRecognition.stopListening();
    }
    if (!browserSupportsSpeechRecognition) {
        return null
    }
    const handlecpyclick = () => {
        navigator.clipboard.writeText(transcript);
      }
    return (
        <>
            <div className="container">
                <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                    {transcript}
                </div>

                <div className="btn-style">

                    <button className="btn btn-primary" onClick={handlecpyclick}>Copy Text
                    </button>
                    <button className="btn btn-primary mx-1" onClick={startListening}>Start Listening</button>
                    <button className="btn btn-primary mx-1" onClick={()=>stopListening()}>Stop Listening</button>

                </div>

            </div>

        </>
    );
};

export default VoiceRecognition;