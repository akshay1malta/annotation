import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Header/Header";
import Anno from "../Anno/Anno";
import { useLocation } from "react-router-dom";
import {upload} from "../../API/API"
import { useNavigate } from "react-router-dom";

const MainDiv = styled.div`
  padding-left: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid lightgray;
  margin: 5px;
  margin-bottom: 0px;
  padding: 5px 10px;
  width: 100px;
  height: 30px;
`;


function AnnonateImage(props) {
  const [source, setSource] = useState("");
  const [allAno, setAllAno] = useState([]);
  const [imageFile, setImageFile] = useState("");
  

  let location = useLocation();

  let navigate = useNavigate();

  const changeAllAno = (data) => {
    setAllAno([...allAno, data]);
  };

  const Reset = () => {
    setAllAno([]);
  };

  const submit=async()=>{

    let formData = new FormData();
    console.log('location.state.imageFile1', imageFile)
    formData.append('imageSrc', imageFile);
    formData.append('userid', localStorage.getItem('id'));
    formData.append('coordinates', JSON.stringify(allAno));

      const output = await upload(formData)
      console.log('output',output)

      navigate('/myannoate');
  }

  useEffect(() => {
      console.log('location.state.imageFile', location.state.imageFile)
    if (location?.state?.src) {
      setSource(location.state.src);
      setImageFile(location.state.imageFile)
    }
  }, [location]);

  return (
    <>
      <Header />

      <MainDiv>
        <div>
          <h4>Annotate</h4>
          <Button onClick={() => Reset()}>Reset</Button>
        </div>
        {source && (
          <Anno src={source} changeAllAno={changeAllAno} allAno={allAno} allowAno={true}/>
        )}
        <Button onClick={() => submit()}>Submit</Button>
      </MainDiv>
    </>
  );
}

export default AnnonateImage;
