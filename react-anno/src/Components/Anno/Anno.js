import React, { useRef, useState } from "react";
import styled from "styled-components";
import AnnoRect from "./AnnoRect";
import Dropdown from "./dropdown";

let isRect = false;

const MainDiv = styled.div`
  position: relative;
  width: 50%;
  margin-top: 20px;
  margin-left: 20px;
`;

const AnnoImage = styled.img`
  display: block;
  width: 100%;
`;

const Items = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Target = Items;

const vehicleArray = ["Car", "Bus", "Bike"];

const Anno = ({src, changeAllAno, allAno, allowAno}) => {
  const imageRef = useRef(null);
  const tarRef = useRef(null);
  const [annoObj, setAnnoObj] = useState({});

  const changeAnnoObj = (data) => {
    setAnnoObj(data);
  };

  const mouseDown = (e) => {

    if(!allowAno)return

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    changeAnnoObj({ x: offsetX, y: offsetY, isProcess: true });
    isRect = true;
  };

  const mouseUp = (e) => {
    changeAnnoObj({ ...annoObj, isDropdown: true });
    isRect = false;
  };

  const mouseMove = (e) => {
    if (!isRect || !allowAno) return;
    const rect = e.currentTarget.getBoundingClientRect();
    let tempAnnoObj = { ...annoObj };

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    let w = offsetX - annoObj.x;
    let h = offsetY - annoObj.y;

    w = Math.abs(w);
    h = Math.abs(h);

    tempAnnoObj["w"] = w;
    tempAnnoObj["h"] = h;

    changeAnnoObj(tempAnnoObj);
  };

  const changeDropdown = (e) => {
    let veAnno = {
      x: annoObj.x,
      y: annoObj.y,
      h: annoObj.h,
      w: annoObj.w,
      vtype: e.target.value,
    };
    changeAllAno(veAnno)
    changeAnnoObj({});
  };

  return (
    <MainDiv>
      <AnnoImage
        ref={imageRef}
        src={src}
        draggable={false}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
      />

      <Items>
        {allAno &&
          allAno.length > 0 &&
          allAno.map((obj) => <AnnoRect annoObj={obj} />)}
        {annoObj && annoObj.isProcess && <AnnoRect annoObj={annoObj} />}
      </Items>
      <Target
        ref={tarRef}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
      />
      {annoObj && annoObj.isDropdown && (
        <Dropdown
          annotation={annoObj}
          onChange={changeDropdown}
          choices={vehicleArray}
        />
      )}
    </MainDiv>
  );
};

export default Anno;
