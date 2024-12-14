import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Alert from './components/Alert';
import Chatbot from './components/Chatbot';
import NoteState from './context/Notes/NoteState'
import Login from './components/Login';
import React, {useState} from 'react';
import Signup from './components/Signup';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert =(message, type)=> {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1300);
  }
  return (
    <>
      <NoteState>
      <BrowserRouter>
        <Navbar/>
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
            <Route exact
              path="/"
              element= {<Home showAlert={showAlert} />}
            />
            <Route exact
              path="/Chatbot"
              element= {<Chatbot />}
            />
            <Route exact
              path="/login"
              element= {<Login showAlert={showAlert} />}
            />
            <Route exact
              path="/signup"
              element= {<Signup showAlert={showAlert} />}
            />
          </Routes>
          </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
