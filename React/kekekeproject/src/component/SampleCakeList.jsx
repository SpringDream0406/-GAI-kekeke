import React from 'react';
import '../css/SampleCakeList.css';

const SampleCakeList = ({ imgSrc, name, price }) => {
    return (
      <div className="Sam_CakeFr">
        <div className="Sam_CakeFrimgFr">
          <img className="Sam_img" alt={name} src={imgSrc} />
        </div>
        <div className="Sam_cakeNameFrTx">{name}</div>
        <div className="Sam_cakePriceTx">{price}</div>
      </div>
    );
  };
  
  export default SampleCakeList;