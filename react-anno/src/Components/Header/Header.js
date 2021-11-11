import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { upload } from "../../API/API";

const Nav = styled.nav`
  display: flex;
  height: 70px;
  width: 100%;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 25px;
  background: grey;
  align-items: center;
  padding-left: 30px;
`;

const MainDiv = styled.div`
  display: flex;
  justify-content: end;
  width: 70%;
  cursor: pointer;
`;

const Div = styled.div`
  margin-right: 25px;
  font-weight: 34;
  font-size: large;
`;

function Header() {
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("imageId");
    navigate("/login");
  };

  const getMyAnnonate=()=>{
    navigate("/myannoate");
  }

  const upload=()=>{
    navigate("/upload");
  }

  return (
    <Nav>
      Smart Cow Task
      <MainDiv>
        <Div onClick={() => {
            getMyAnnonate();
          }}>My Annonate</Div>

<Div onClick={() => {
            upload();
          }}>Upload Annonate</Div>
        <Div
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Div>
      </MainDiv>
    </Nav>
  );
}

export default Header;
