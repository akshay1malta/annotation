import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { login } from "../../API/API";
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

const Button = styled.button`
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid lightgray;
  margin: 5px;
  margin-bottom: 0px;
  padding: 5px 10px;
  width: 250px;
  height: 30px;
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

function Upload(props) {
  const [images, setImages] = useState([]);
  const [imagesFile, setImageFile] = useState([]);

  let navigate = useNavigate();

  const hiddenFileInput = React.useRef(null);

  const handleClick = async (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    let fileObj = [];
    let fileArray = [];
    let fileImage = []

    fileObj.push(e.target.files);

    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
      fileImage.push(fileObj[0][i])
    }
    setImages(fileArray);
    setImageFile(fileImage)
  };

  const handleImageClic=(src, imagFile)=>{
    console.log('source', src)
    navigate('/annoate', {
      state: {
        src: src,
        imageFile: imagFile
      }
    });
  }

  return (
    <>
      <Header />
      <MainDiv>
          <h3>Images</h3>
        <hr />
        <Button onClick={handleClick}>Upload a file</Button>
        <input
          accept="image/*"
          id="contained-button-file"
          multiple={true}
          type="file"
          style={{ display: "none" }}
          onChange={handleChange}
          ref={hiddenFileInput}
        />
        <div>*Please click an image to annotate</div>
        <hr />
        {images && images.length > 0 && (
          <ImageContainer>
            {images.map((element,i) => {
              return (
                <ImageDiv>
                  <Image  src={element} onClick={()=>{handleImageClic(element, imagesFile[i])}}></Image>
                </ImageDiv>
              );
            })}
          </ImageContainer>
        )}
      </MainDiv>
    </>
  );
}

export default Upload;
