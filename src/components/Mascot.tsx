import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/mascot.json';

const Mascot = () => {
  return (
    <div style={{ width: 200, height: 200 }}>
      <Lottie animationData={animationData} />
    </div>
  );
};

export default Mascot;
