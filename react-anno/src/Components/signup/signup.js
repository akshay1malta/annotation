import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { signup } from "../../API/API";
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

function Signup(props) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [project, setProject] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const result = await signup({
      email,
      username: userName,
      password,
      project,
    });

    if (result?.result == "success") navigate("/login");
  };

  return (
    <Fragment>
      <MainDiv>
        <Form onSubmit={handleSubmit}>
          <h3>Sign up</h3>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />

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

          <Input
            value={project}
            onChange={(e) => setProject(e.target.value)}
            type="text"
            placeholder="Project"
          />

          <Button type="submit">Submit</Button>
        </Form>
      </MainDiv>
    </Fragment>
  );
}

export default Signup;
