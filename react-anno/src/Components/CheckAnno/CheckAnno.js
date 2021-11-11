import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getSingleImage, download } from "../../API/API";
import Header from "../Header/Header";
import Anno from '../Anno/Anno'

const MainDiv = styled.div`
  padding-left: 30px;
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

function CheckAnno(props) {
  const [image, setImage] = useState({});


  const downloadCsv=()=>{
    download({id:localStorage.getItem("imageId")})
  }

  
  useEffect(async() => {
    const imageId = localStorage.getItem("imageId");
    if (imageId) {
      let data = await getSingleImage({ id: imageId });
      if(data && data[0]) setImage(data[0])
      
    }
  }, []);

  return (
    <>
      <Header />
      <MainDiv>
        <h3>Check Annonated or Download CSV</h3>
        <hr />
        {image && image['renderedData'] && (
          <Anno src={`data:image/png;base64,${image.renderedData}`} allowAno={false} allAno={JSON.parse(image.coordinates)} allowAno={false}/>
        )}
        <Button onClick={()=>{downloadCsv()}}>Download</Button>
      </MainDiv>
      
    </>
  );
}

export default CheckAnno;
