import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { login } from "../../API/API";
import { useNavigate } from "react-router-dom";

const MainDiv = styled.div`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid lightgray;
  margin: 5px;
  margin-bottom: 0px;
  padding: 5px 10px;
  width: 250px;
  height: 30px;
`;

const Button = styled.button`
  height: 30px;
  min-width: 150px;
  border-radius: 10px;
  border: none;
  margin: 5px;
  background-color: rgb(111, 170, 247);
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  color: white;
`;

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const result = await login({ username: userName, password });
    if (result && result.length > 0) {
      localStorage.setItem("id", result[0].id);
      localStorage.setItem("username", result[0].username);
      navigate("/upload");
    }
  };

  return (
    <MainDiv>
      <Form onSubmit={handleSubmit}>
        <h3>Log In</h3>

        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="User Name"
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <Button type="submit">Submit</Button>
      </Form>
    </MainDiv>
  );
}

export default Login;
