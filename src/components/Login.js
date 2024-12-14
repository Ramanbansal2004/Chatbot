import React, { useState} from "react";
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const [cred, setCred]= useState({email: "", password: ""})
    const navigate = useNavigate();
    const handleSubmit= async (e)=> {
        e.preventDefault();
        const response= await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              'Content-type': 'application/json',
               },
                body: JSON.stringify({email: cred.email, password: cred.password})
          });
          const json =await response.json();
          console.log(json);
          if(json.success)
          {
            // redirect
            localStorage.setItem('token', json.athtoken);
            props.showAlert("Logged In", "success");
            navigate("/");
          }
          else
          {
            props.showAlert("Invalid Credentials", "danger");
          }
    }
    const onChange =(e)=>{
        setCred({...cred, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <h2>Login to iNotebook</h2>
      <form  onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={cred.email}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={cred.password}
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
