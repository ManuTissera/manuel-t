import React from 'react';
import { useState, useEffect } from 'react';
import '../Files_CSS/alert_banner.css';
import alertError from '../assets/alert-fail.svg';
import alertSuccess from '../assets/alert-success.svg';
import alertWarning from '../assets/alert-warning.svg';

const AlertPopUp = ({ titleAlert, messageAlert, classNN, statusPopUp }) => {
  


    const [animate, setAnimate] = useState(false); // 2. Agregá este estado
    const [renderized, setRenderized] = useState(false);
   
    console.log('clase a seleccionar',classNN)
    //const claseStyle = classNN ? ' ' : (classNN == false) ? '-error' : '-warning' // Mantenés tu lógica actual
    const claseStyle = (classNN == 'warning') ? '-warning' : classNN ? ' ' : '-error' // Mantenés tu lógica actual
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
      }, 4600);
    
      return () => clearTimeout(timer);
    }, [statusPopUp]);

    console.log("Animation Banner:",messageAlert)

  
   return (
    <div className={"alert-container alert-container" + claseStyle + animationClass}>

      <div className={"alert-left-accent alert-left-accent" + claseStyle}></div>
      
      <div className={"alert-content alert-content" + claseStyle}>
        <div className={"alert-icon-container alert-icon-container" + claseStyle} >

          {/* <img className="alert-icon" src={classNN ? alertSuccess :alertError} alt="" /> */}
          <img 
            className="alert-icon" 
            src={(classNN == 'warning') ? alertWarning : classNN ? alertSuccess : alertError} alt="" />
        </div>



        
        {
          (classNN == 'warning')
          ?
            <div className="alert-text">
              <h5 className="alert-h5-warning">No se encontro la busqueda</h5>
            </div>
          :
            <div className="alert-text">
              <h4 className={"alert-title alert-title" + claseStyle}>{titleAlert}</h4>
              {/* <p className="alert-message">There was a problem processing your request!</p> */}
              <p className={"alert-message alert-message" + claseStyle}>{messageAlert}</p>
            </div>
          
        }
      </div>

      {/* <button className="alert-retry-button" onClick={onRetry}> */}
      <button 
        className={"alert-button alert-button" + claseStyle}
        onClick={() => setAnimate(false)}
        >
        Retry
      </button>
    </div>
  );
};


export default AlertPopUp;