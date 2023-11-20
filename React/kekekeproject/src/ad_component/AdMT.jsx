import React from 'react'
import styled from 'styled-components'


const MT_AD = styled.div`
    text-decoration: dashed;
    font-family: 'Pretendard-Bold';
    font-size: 30px;
    
    

    position: absolute;
    top: 430px;
    border-bottom: 3px solid #F0B4AE;
    left: 500px;
    z-index: 10;
`

const AdMT = (props) => {
  return (
    <MT_AD>
    {props.children}
    </MT_AD> 
  )
}

export default AdMT;