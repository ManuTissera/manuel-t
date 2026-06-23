import React from 'react';
import { useState, useEffect } from 'react';
import '../Files_CSS/alert_banner.css';
import alertError from '../assets/alert-fail.svg';
import alertSuccess from '../assets/alert-success.svg';

const AlertBanner = ({ titleAlert, messageAlert, classNN }) => {
  


    const [animate, setAnimate] = useState(false); // 2. Agregá este estado
    const [renderized, setRenderized] = useState(false);
   

    const claseStyle = classNN ? ' ' : '-error' // Mantenés tu lógica actual
    const animationClass = animate ? ' show' : ''; // 3. Nueva clase condicional  
    
    const count = 0;

useEffect(() => {
  // Si el mensaje está vacío, aseguramos que la animación esté apagada y no hacemos nada más
  if (!messageAlert || messageAlert.trim() === '') {
    setAnimate(false);
    return;
  }

  // Si tiene contenido, se ejecuta la animación normalmente
  setAnimate(true); 

  const timer = setTimeout(() => {
    setAnimate(false); 
  }, 3600);

  return () => clearTimeout(timer);
}, [messageAlert]);

    console.log("Animation Banner:",messageAlert)

  
   return (
    <div className={"alert-container alert-container" + claseStyle + animationClass}>

      <div className={"alert-left-accent alert-left-accent" + claseStyle}></div>
      
      <div className={"alert-content alert-content" + claseStyle}>
        <div className={"alert-icon-container alert-icon-container" + claseStyle} >

          <img className="alert-icon" src={classNN ? alertSuccess :alertError} alt="" />
        </div>



        
        <div className="alert-text">
          <h4 className={"alert-title alert-title" + claseStyle}>{titleAlert}</h4>
          {/* <p className="alert-message">There was a problem processing your request!</p> */}
          <p className={"alert-message alert-message" + claseStyle}>{messageAlert}</p>
        </div>
      </div>

      {/* <button className="alert-retry-button" onClick={onRetry}> */}
      <button className={"alert-button alert-button" + claseStyle}>
        Retry
      </button>
    </div>
  );
};


export default AlertBanner;