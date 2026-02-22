


import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';

import '../Files_CSS/recordsTable.css';

import { getRecordsTires, deleteRecordTires } from "../helpers/tires_registry.js"
import { getUsersPilots } from "../helpers/pilots.js"

import printIcon from '../assets/print-icon.svg'
import downloadIcon from '../assets/download-icon.svg'
import deleteIcon from '../assets/delete-icon.svg'

import SelectTires from "../components/SelectTires.jsx"
import ModalDeleteRecord from "../components/ModalDeleteRecord.jsx";
import InputSearchTires from '../components/InputSearchTires.jsx';
import SelectSarchCategory from '../components/SearchCategoryPilot.jsx';
import SelectPilots from '../components/SelectPilots.jsx';
import SelectEvetn from '../components/selectEvent.jsx';

const RecordTabel = () => {


   const [ showDeleteModal, setShowDeleteModal] = useState(false);
   const [ showAllTrigger, setShowAllTrigger ] = useState(false)
   const [ recordsArr, setRecordsArr ] = useState([])
   const [ pilotsArr, setPilotsArr ] = useState("")
   const [ eventArr, setEventArr ] = useState("")
   const [ selected, setSelected] = useState([]);
   const [ numTire, setNumTire ] = useState("")
   const [ infoData, setInfoData] = useState("Records")
   const [ categorySelcted, setCategorySelected ] = useState("select")

   

   const onChangeFn = (val) => {
      console.log(val, '<- Record')
      setCategorySelected(val)
   }

   const onChangePilot = (val) => {
      // console.log(val,'<- Piloto Seleccionado')
      setNumTire("")
      setPilotsArr(val)
   }

   const onChangeEvent = (val) => {
      setEventArr(val)

   }

   const onChangeTiresFn = (val) => {
      setEventArr("")
      setCategorySelected("select")
      setPilotsArr("")
      setNumTire(val)
   }

   const cancelDelete = () => {
      console.log('Delete Cancel')
   }


   const toggleRow = (id) => {
      setSelected(prev =>
         prev.includes(id)
         ? prev.filter(x => x !== id)
         : [...prev, id]
      );
   };

   

   useEffect(() => {
      const load = async () => {
         const data = await getRecordsTires(pilotsArr,eventArr)
         setRecordsArr(Array.isArray(data) ? data : [])
      }

      //console.log(pilotsArr,'<- Pilot Selected')
      //console.log(eventArr,'<- Fecha Selected')

      load()
   },[])

   const functionSearch = async () => {
      console.log(pilotsArr,eventArr,numTire)
      const data = await getRecordsTires(pilotsArr,eventArr,numTire)
      setRecordsArr(Array.isArray(data)? data:[])
   }

   const deleteFunction = async () => {
     await deleteRecordTires(selected);
      
     const data = await getRecordsTires("","","");
     setRecordsArr(Array.isArray(data) ? data : []);
      
     setSelected([]);
     setShowDeleteModal(false);
   };


   const showAll = async () => {
      setCategorySelected("select")     // select categoria vuelve a option value=""
      setPilotsArr("");    // o setPilotNumber("")
      setEventArr("");     // select fecha vuelve a option value=""
      setNumTire("");
      setShowAllTrigger(true)
      const data = await getRecordsTires("","","")
      setRecordsArr(Array.isArray(data)? data : [])

   }

   console.log('Este es el coso')
   return (
      <>
         {showDeleteModal && (
         
         <ModalDeleteRecord
              idss={selected}
              onCancel={() => setShowDeleteModal(false)}
              onConfirm={deleteFunction}
              dataDetail={infoData}
            />
         )}
         <div className='container-table'>
            {/* <nav className="table-nav">
               <div className="table-nav-container-buttons">
                  <Link className="add-record-link" to="/">Agragar Registro</Link>
               </div>
               <InputSearchTires
               />
            </nav> */}

            <div className="toolbar-container">
             <div className="toolbar-records">
              <div className="toolbar-left">
                <Link to="/" className="btn btn-add-record">
                  Agregar Registro
                </Link>

                <div className="icon-group">
                  <button className="icon-btn"><img src={printIcon} alt="Print" /></button>
                  <button className="icon-btn"><img src={downloadIcon} alt="Download"></img></button>
                 <button
                   className="icon-btn"
                   onClick={() => setShowDeleteModal(true)}
                   disabled={!selected.length}
                 >
                   <img src={deleteIcon} alt="Delete" />
                 </button>
                 <button className="btn dropdown bnt-showall" onClick={showAll}>Ver Todo</button>
                </div>
              </div>

              <div className="toolbar-right">
                  <nav className="nav-filter-toolbar-right">
                        <p className='p-toolbar-right'>Filtrar Registro:</p>
                         <SelectSarchCategory
                           onChangeFn={onChangeFn}
                           value={categorySelcted}
                           nameClass={'toolbar-records'}
                         />
                         <SelectPilots
                            category={categorySelcted}
                            onChagePilot={onChangePilot}
                            nameClass={'toolbar-records'}
                            />
                         <SelectEvetn
                            onChangeEvent={onChangeEvent}
                            value={eventArr}
                            nameClass={'toolbar-records'}
                         />
                      </nav>
                      <button className="btn dropdown" onClick={functionSearch}>Aplicar</button>
                  </div>
            </div>
            
            <div className='midle-bar'></div>
            {/* <hr className="hr-toolbar"/> */}

            <div className="table-controls-records">
              <div className="entries">
                <span>Show</span>
                <select>
                  <option>10</option>
                </select>
                <span>entries</span>
              </div>

              <div className="search-container">
               {/* <button className="btn dropdown bnt-showall">Ver Todo</button> */}
               <span className='span-search view-element'>Buscar Cubierta:</span>
               {/* <input className='search-input' type="text" placeholder="Search all columns"/> */}
               <SelectTires
                  onChangeTires={onChangeTiresFn}
               />
               <button className="btn btn-search" onClick={functionSearch}>Buscar</button>
              </div>
            </div>
            </div>


            <table>
            <thead>
               <tr>
                  <th></th>
                  <th>Piloto\asos</th>
                  <th>Categoria</th>
                  <th>Fecha</th>
                  <th>Date</th>
                  <th>Hora</th>
                  <th>N 1</th>
                  <th>N 2</th>
                  <th>N 3</th>
                  <th>N 4</th>
                  <th>N 5</th>
                  <th>N 6</th>
               </tr>
            </thead>
            <tbody>
               {recordsArr.map((r) => (
                  
                  <tr key={r.id}>
                     <td>
                       <input
                         type="checkbox"
                         checked={selected.includes(r.id)}
                         onChange={() => toggleRow(r.id)}
                       />
                     </td>
                     <td>{r.pilot_name} {r.surname}</td>
                     <td>{r.category}</td>
                     <td>{r.event} - {r.name_circuits}</td>
                     <td>{(r.event_date).split("T")[0]}</td>
                     <td>{(r.event_date).split("T")[1].split('.')[0]}</td>
                     <td>{r.tire_n1}</td>
                     <td>{r.tire_n2}</td>
                     <td>{r.tire_n3}</td>
                     <td>{r.tire_n4}</td>
                     <td>{r.tire_n5}</td>
                     <td>{r.tire_n6}</td>
                  </tr>
               ))}
            </tbody>
            </table>
         </div>
      </>
   )
}


export default RecordTabel










