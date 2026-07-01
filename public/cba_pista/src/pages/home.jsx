import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Eliminado useEffect por desuso

import { startLoadRecord, checkLoadStatus } from '../helpers/tires_registry.js'; // Corregido el punto
import { getRunStatus } from '../helpers/pilots.js';

import ModalLoadStartRecord from '../components/ModalStartLoad.jsx';

const HomePage = () => {
  // Estados para deshabilitar botón y guardar el mensaje del back
  const [loading, setLoading] = useState(false);
  //const [message, setMessage] = useState('');
  const [loadStatus, setloadStatus] = useState([]);
  const [refreshKey, setRefreshKey] = useState(true);
  const [showModalLoader, setShowModalLoader] = useState(false)

        useEffect(() => {
          const fetchStatus = async () => {
            try {
              const data = await checkLoadStatus(); // AGREGADO: await
              // Ahora sí verás el array con las filas del SELECT
              
              setloadStatus(data); // Guardamos los datos en el estado
            
            } catch (error) {
              console.error("Error al obtener el status:", error);
            }
          };
        
          fetchStatus();
        }, []);
      
        useEffect(() => {
          const fetchStatus = async () => {
            try {
              const data = await checkLoadStatus();
              setloadStatus(data);
            } catch (error) {
              console.error("Error al obtener el status:", error);
            }
          };
        
          fetchStatus();
      }, [refreshKey]);


        

            const handleClick = async (statusLoad) => {
              console.log(statusLoad)
              setShowModalLoader(true)
              // setLoading(true);
              // setMessage('');

              // try {
              //   const responseText = await startLoadRecord(); 
              //   setTimeout(() => {console.log(responseText); setLoading(false)},1700)

              // } catch (error) {      
              //   setTimeout(()=>{console.error('Error al Iniciar Sesion');setLoading(false);},1000)
              // }
            };
          
          
          
  return (


  <>


      {showModalLoader && (
        <ModalLoadStartRecord
          // ifLoad={infoModalLoad}
          statusData={loadStatus}
          onCancel={() => {
            setShowModalLoader(false);
            setRefreshKey(prev => !prev); // Cambia true->false o false->true
          }}
        />
      )}


    <div className="home-container">
      {/* Header simple */}
      <div className="home-header">
        <div>
          <h1 className="home-title">Bienvenido</h1>
          <p className="home-date">
            {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </div>
      </div>



      {/* Stats cards - solo 2 */}
      <div className="stats-row">

        <button 
          className="stat-item stat-button" 
          // onClick={handleClick}
          disabled={loading} // Deshabilita el botón si loading es true
        >
          {loading ? <p>Iniciando...</p> 
                   : (loadStatus.length == 0)
                      // ?'Iniciar Carga'
                      ? <span className="stat-span text-blue" 
                          onClick={() => handleClick('to-start')}>Iniciar Ronda</span>
                      : <>
                        {/* <span className="stat-number">245</span> */}
                        <span className="stat-span text-red"
                          onClick={() => handleClick('to-end')}>Finalizar Carga</span>
                        </>
          }
          
        </button>

          {/* Muestra el mensaje del backend si existe */}
          {/* {message && <p className="backend-message">{message}</p>} */}

        <button className="stat-item stat-button">
          <span className="stat-number">245</span>
          <span className="stat-label">Registros Totales</span>
          {/* <span className="stat-label">San Nicolas de los Arrollos</span> */}
        </button>
      </div>


      {/* Header simple */}
      {/* <div className="container-status-fecha">
        <div>
          <b>Fecha abierta:</b>
          <span className="container-status-fecha-detail">San Nicolas de los Arrollos</span>
        </div>
      </div> */}



      {/* Acciones principales - solo 3 botones */}
      <div className="actions-section">
        <Link to="/pilots" className="action-link fecha-status">
          <span>Fecha abierta:</span>
          {(loadStatus.length == 0)? 'La ultima ronda fue...'
          :<span>{`${loadStatus[0]?.event} - ${loadStatus[0]?.name_circuits}`}</span>}
        </Link>
        <Link to="/pilots" className="action-link">
          <span className="action-link-icon">→</span>
          Ver Pilotos
        </Link>
        <Link to="/add_pilot" className="action-link">
          <span className="action-link-icon">→</span>
          Agregar Piloto
        </Link>
        <Link to="/new_record" className="action-link">
          <span className="action-link-icon">→</span>
          Nuevo Registro
        </Link>
      </div>


            {/* Resumen simple */}
      <div className="summary-card">
        <h3 className="summary-title">Resumen Rápido</h3>
        <p className="summary-text">
          Sistema de gestión de pilotos y registros. 
          Utilice el menú o los accesos directos para navegar.
        </p>
      </div>



    </div>



  </>

  );
};

export default HomePage;