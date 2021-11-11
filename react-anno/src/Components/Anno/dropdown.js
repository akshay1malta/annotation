import React from "react";
import styled from "styled-components";

function Dropdown(props) {
  const { x, y, h, w } = props.annotation;
  if (!x) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y + h}px`,
      }}
    >
      <select id={0} value='' onChange={(val)=>props.onChange(val)}>
        <option value="" disabled hidden>Select Vehicle</option>
        {
          props.choices.map((eachV,i)=>{
            return <option id={i+1} value={eachV}>{eachV}</option>
          })
        }
      </select>
    </div>
  );
}

export default Dropdown;
