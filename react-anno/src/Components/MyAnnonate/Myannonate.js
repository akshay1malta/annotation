import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getImages } from "../../API/API";
import Header from "../Header/Header";
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

const ImageDiv = styled.div`
  height: 400px;
  width: 400px;
  margin: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  display: block;
`;

function MyAnnoate(props) {
  const [images, setImages] = useState([]);

  let navigate = useNavigate();

  const handleImageClic = (id) => {
    localStorage.setItem('imageId', id)
    navigate("/checkannonate");
  };

  useEffect(async() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      let data = await getImages({ userid: userId });
      setImages(data)
    }
  }, []);

  return (
    <>
      <Header />
      <MainDiv>
        <h3>My Annotated</h3>
        <hr />
        {images && images.length > 0 && (
          <ImageContainer>
            {images.map((element,i) => {
              return (
                <ImageDiv>
                  <Image  src={`data:image/png;base64,${element.renderedData}`} onClick={()=>{handleImageClic(element.id)}}></Image>
                </ImageDiv>
              );
            })}
          </ImageContainer>
        )}
      </MainDiv>
    </>
  );
}

export default MyAnnoate;
