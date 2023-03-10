import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  useEffect(()=>{
    if(localStorage.getItem("username")){
        navigate('/')
    }
  },[])

  function handleValidation() {
    const { password, username } = values;

    if (password==='') {
      toast.error("username and password is required!");
      return false;
    } else if (username.length==='') {
      toast.error("username and password is required!");
      return false;
    }else return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (handleValidation() === true) {
      const {password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      console.log(data);
      if (data.status === false) {
        toast.error(data.msg);
      } else if ((data.status = true)) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        navigate("/");
      }
    }
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
            <h3>Login to an existing account</h3>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account? register {" "}
            <Link className="toRegister" to="/register">
               here
            </Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
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
  .toRegister {
    color: #702963;
  }
  h3{
    text-align:center
  }
`;
export default Login;
