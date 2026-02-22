
import { useEffect, useEffectEvent, useState } from "react";
import { Link } from "react-router-dom";

import { getPilots, deletePilot } from "../helpers/pilots.js";

import SelectSarchCategory from "../components/searchCategoryPilot.jsx";
import SelectPilots from "../components/SelectPilots.jsx";
import ModalDeleteRecord from "../components/ModalDeleteRecord.jsx";

import '../Files_CSS/tables.css'

import printIcon from "../assets/print-icon.svg";
import downloadIcon from "../assets/download-icon.svg";
import deleteIcon from "../assets/delete-icon-2.svg";


const PilotsTable = () => {

  const [categorySelcted, setCategorySelected] = useState("");
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [surnamePilot, setSurnamePilot] = useState("")
  const [selectCheck, setSelectCheck] = useState([])
  const [showPilots, setShowPilots] = useState(true)
  const [namePilot, setNamePilot] = useState("");
  const [pilotsArr, setPilotsArr] = useState([]);
  const [idPilot, setIdPilot] = useState("");


   const onChangeCategory = (val) => {
      setCategorySelected(val)
   }

   const onChangePilotFn = (val) => {
      setIdPilot(val)
   }


   useEffect(() => {
     const load = async () => {
       const data = await getPilots({
        category: categorySelcted,
        id_pilot: idPilot,
        name_pilot: namePilot,
        surname: surnamePilot
       });
       const arr = Array.isArray(data) ? data : [];
       setPilotsArr(arr);
       //console.log('Mostrar pilotos - cantidad', arr.length);
     };
   
     load();
   }, [showPilots]);

const toggleRow = (id) => {
  setSelectCheck(prev =>
    prev.includes(id)
      ? prev.filter(x => x !== id)
      : [...prev, id]
  );
};


   const functionSearch = async () => {
    //console.log('Piloto select',numPilot);
    //console.log('Category select',categorySelcted);
    //  console.log(pilotsArr, eventArr, numTire)
    //  const data = await getRecordsTires(pilotsArr, eventArr, numTire);
    //  setRecordsArr(Array.isArray(data) ? data : []);
    //  setPage(1);
   };

  const deleteFunction = async () => {
    await deletePilot(selectCheck);

    const data = await getPilots({});
    setPilotsArr(Array.isArray(data)?data : [])
    
    setShowDeleteModal(false)
    setSelectCheck([])

  }

   const showAllFn = () => {
    setCategorySelected(""),
    setIdPilot(""),
    setNamePilot(""),
    setSurnamePilot("")
   }
   

   return (
      <>
      {showDeleteModal && (
        <ModalDeleteRecord
          ids={selectCheck}
          onCancel={() => showDeleteModal(false)}
          onConfirm={deleteFunction}
          dataDetail={'Pilots'}
        />
      )}


      {
        showModalFilter && ( 

        <div className="modal-overlay" onClick={() => {setShowModalFilter(false); console.log('overlay apretado')}}>
        <div className="container-filter-tires" onClick={(e) => e.stopPropagation()}>
          <span 
            onClick={() => setShowModalFilter(false)}
            className="x-close-filter">x</span>
          <h4>Filter</h4>


                <SelectSarchCategory
                  onChangeFn={onChangeCategory}
                  value={categorySelcted}
                  nameClass={"rec"}
                />

                <SelectPilots
                  category={categorySelcted}
                  onChagePilot={onChangePilotFn}
                  nameClass={"rec"}
                />

        <button 
          className="btn-aply-filter"
          onClick={() => {
            functionSearch();
            setShowPilots(prev => !prev)
            setShowModalFilter(false);
          }}
        >
          Aplicar Filtro
        </button>
        

        </div>
      </div>
        )
      }

      

{/* ---------------- aca comienza la tabla ---------------------------- */}

      <div className="contaienr-table-records">

      <div className="container-table">

      <div className="toolbar-container-rec">
              <div className="toolbar-first">
                <h3>Pilotos</h3>

                <button
                  className="btn-icon btn-delete-rec"
                  onClick={() => setShowDeleteModal(true)}
                  disabled={!selectCheck.length}
                >
                  <img src={deleteIcon} alt="Delete" />
                </button>

                {/* <button
                  className="btn-icon btn-download-rec"
                  // onClick={() => setShowDownloadModal(true)}
                  // onClick={() => downloadCsv(pageRecords, "records.csv")}
                >
                  <img src={downloadIcon} alt="Download" />
                </button> */}


              </div>

              <div className="icon-group">


                {/* btn dropdown bnt-showall child-nowrap */}
                <button className="btn-record-mobile" onClick={() => {
                  showAllFn();
                  setShowPilots(prev => !prev);
                  }}>
                  Ver Todo
                </button>

                <button 
                  className="btn-record-mobile btn-filter-rec"
                  onClick={() => setShowModalFilter(true)}
                  >
                Filtrar
                </button>
              </div>


        <div className="toolbar-second">
          <Link to="/add_pilot" className="btn-add-rec-toolbar">
            Agregar Piloto
          </Link>
          <input type="text" className="toolbar-search-tires input-tires"
            placeholder="Ingresar Nombre"
            onChange={(e) => setNamePilot(e.target.value)}
          />
          <button className="btn-search-rec" onClick={() =>{ 
            console.log(namePilot)
            setCategorySelected("");
            setIdPilot("");
            setShowPilots(prev => !prev)
          }} 
          >Buscar</button>
        </div>
      </div>

{/* ---------------- aca comienza la tabla ---------------------------- */}

     
      <div className="table-wrap">


            <div className="table-rec">
              <div className="thead-rec">
                <div className="thead-rec-tr grt-pilots">
                  <div className="th-rec ms-td-check"></div>
                  <div className="th-rec " >Nombre</div>
                  <div className="th-rec " >Apellido</div>
                  <div className="th-rec " >Auto</div>
                  <div className="th-rec " >Categoria</div>
                  <div className="th-rec " >Numero</div>
                </div>
              </div>
    
          
    
               <div className="tbody-rec" >
                   {pilotsArr.map((r) => (
                     <div className="tbody-rec-tr grt-pilots" key={r.id}>
                       <div className="td-rec ms-td-check">
                         <input
                          type="checkbox"
                          checked={selectCheck.includes(r.id)}
                          onChange={() => toggleRow(r.id)}
                         />
                       </div>
                  
                       <div className="td-rec">{r.name}</div>
                       <div className="td-rec">{r.surname}</div>
                       <div className="td-rec">{r.car_model}</div>
                       <div className="td-rec">{r.category}</div>
                       <div className="td-rec">{r.number_pilot}</div>
                  

                     </div>
                   ))}
               </div>
            </div> 

      </div>

{/* ---------------- aca termina la tabla ---------------------------- */}


        </div>


        <div className="pagination-container pagination-container-pilots">
            {/* <div className="pagination">
              <button className="btn-pagination">
                Prev
              </button>

              <span className="span-pagination">
              </span>

              <button className="btn-pagination">
                Next
              </button>
            </div>

            <div className="entries">
              <span>Show</span>

              <select>
                <option>Opcion 1</option>
                <option>Opcion 1</option>
                <option>Opcion 1</option>
              </select>

              <span>entries</span>

              <span>10/10
              </span>
            </div> */}
        </div>



      </div>      
      </>
   )
}

export default PilotsTable



