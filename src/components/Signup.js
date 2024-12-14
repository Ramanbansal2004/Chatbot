import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [cred, setCred]= useState({email: "", name: "", password: "", cpassword: ""})
    const navigate = useNavigate();
    const handleSubmit= async (e)=> {
        e.preventDefault();
        const {name, email, password} =cred
        const response= await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            headers: {
              'Content-type': 'application/json',
               },
                body: JSON.stringify({email, password, name})
          });
          const json =await response.json();
          console.log(json);
          if(json.success)
          {
            // redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Account Created Successfully", "success");
            // console.log(json.athtoken);
            navigate("/");
            setCred({email: "", name: "", password: "", cpassword: ""})
          }
          else
          {
            props.showAlert("User exists", "warning");
          }
    }
    const onChange =(e)=>{
        setCred({...cred, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <form  onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            value={cred.email}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            value={cred.name}
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="name"
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={cred.password}
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="cpassword"
            value={cred.cpassword}
            className="form-control"
            id="cpassword"
            onChange={onChange}
            name="cpassword"
            required
          />
        </div>
        <button type="submit" disabled={cred.password!==cred.cpassword} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup