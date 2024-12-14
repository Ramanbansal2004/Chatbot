import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let history= useNavigate();
  let location = useLocation();
  const hdlLogout=()=>{
    localStorage.removeItem('token');
    history("/login");
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">Chatbot</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} aria-current="page" to="/Chatbot">Chatbot</Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="button">Log In</Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link>
            </form>: <button onClick={hdlLogout} className="btn btn-primary mx-1"> Logout </button>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar