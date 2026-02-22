


import { Link } from "react-router-dom";


// Home.jsx


const HomePage = () => {
  return (
    <div className="home">
      <div className="home-card">
         <h2 className="home-title">Home</h2>

         <div className="home-goals">

{/*             Boton de Numero (1) */                                }

            {/* <button className="goal-home goal--active" type="button"> */}
            <Link to="/records_tires" className="goal-home goal--active" type="button">
              <div className="goal-text">
                <div className="goal-title">Registros</div>
                <div className="goal-subtitle">Ver los registros cargardos</div>
              </div>
  
              {/* <div className="goal-icon" aria-hidden="true">
                📌
              </div> */}
              <div className="goal-icon" aria-hidden="true">
                ☰
              </div>
            </Link>

{/*             Boton de Numero (2) */                                }

            <button className="goal-home" type="button">
              <div className="goal-text">
                <div className="goal-title">Iniciar Regristros</div>
                <div className="goal-subtitle">Iniciar nuevo dia de carga</div>
              </div>
  
              {/* <div className="goal-icon" aria-hidden="true">
                ☰
              </div> */}
              <div className="goal-icon" aria-hidden="true">
                ☰
              </div>
            </button>

{/*             Boton de Numero (3) */                                }

            <button className="goal-home" type="button">
              <div className="goal-text">
                <div className="goal-title">Gain Muscle</div>
                <div className="goal-subtitle">Build mass &amp; strength</div>
              </div>
  
              {/* <div className="goal-icon" aria-hidden="true">
                🏋️
              </div> */}
              <div className="goal-icon" aria-hidden="true">
                ☰
              </div>
            </button>
         </div>
         <div className="container-options-home">
            
            <button className="btn-home-next" type="button">
               Ver Perfil
            </button>
         </div>
      
      </div>
    </div>
  );
};

export default HomePage;

