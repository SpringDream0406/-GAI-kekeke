import React from 'react'
import styled from 'styled-components'


const MT_AD = styled.div`
    text-decoration: dashed;
    font-family: 'Pretendard-Bold';
    font-size: 30px;
    
    

    position: absolute;
    top: 430px;
    border-bottom: 3px solid black;
    left: 500px;
    z-index: 999;
`

const AdMT = (props) => {
  return (
    <MT_AD>
    {props.children}
    </MT_AD> 
  )
}

export default AdMT