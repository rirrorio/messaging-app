import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  function handleValidation() {
    const { email, password, username } = values;

    if (!email || !password || !username) {
      toast.error("validation error, check your input");
      return false
    }else if(username.length<4){
        toast.error("Username cannot be less than 5 characters");
        return false
    }else if(password.length<8){
        toast.error("Password cannot be less than 8 characters");
        return false
    }else if(email===''){  
        toast.error("email cannot be empty")
        return false
    }else return true
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if ( handleValidation()===true){
        const { email, password, username } = values;
        const {data} = await axios.post(registerRoute,{email, username, password})
    };
  }

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  return (
    <>
        <FormContainer>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
              <h1>LavenderChat</h1>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />

            <button type="submit">Create Account</button>
            <span>
              Already on LavenderChat? sign in{" "}
              <Link className="toLogin" to="/login">
                here
              </Link>
            </span>
          </form>
        </FormContainer>
      <ToastContainer/>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    .logo {
      height: 15rem;
    }
    h1 {
      color: #702963;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 0.5rem;
    padding: 3rem 3rem;
    input {
      background-color: rgb(230, 230, 250);
      padding: 1rem;
    }
    button {
      background-color: rgb(230, 230, 250);
      height: 2rem;
      border-radius: 1rem;
    }
  }
  .toLogin {
    color: #702963;
  }
`;
export default Register;
