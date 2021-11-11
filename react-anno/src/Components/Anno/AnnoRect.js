import React from 'react'
import styled from 'styled-components'

const Rectangle = styled.div`
  position: absolute;
  border: solid 1px red; 
  color: yellow;
  font-weight: 900
`

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

function AnnoRect (props) {
  const { x, y, h, w, vtype } = props.annoObj

  if (!x) return null

  return (
    <Container
      className={props.className}
      style={props.style}
    >
      <Rectangle
        style={{
          height: `${h}px`,
          width: `${w}px`,
          top: `${y}px`,
          left: `${x}px`,
        }}
      >
        {vtype? vtype: ''}
      </Rectangle>
    </Container>
  )
}



export default AnnoRect