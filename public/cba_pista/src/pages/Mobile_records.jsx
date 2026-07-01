import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";


//import "../Files_CSS/table_records.css";
//import "../Files_CSS/table_records2.css";
import "../Files_CSS/table_records3.css";
import "../Files_CSS/t-table.css"

import { getRecordsTires, deleteRecordTires } from "../helpers/tires_registry.js";
import { downloadXlsx } from "../helpers/download_files.js";


import printIcon from "../assets/print-icon.svg";
import downloadIcon from "../assets/download-icon.svg";
import deleteIcon from "../assets/delete-icon-2.svg";
import editIcon from "../assets/edit.svg";

import SelectTires from "../components/SelectTires.jsx";
import AlertBanner from "../components/AlertBanner.jsx";
import AlertPopUp from "../components/AlertPopUp.jsx";
import ModalDeleteRecord from "../components/ModalDeleteRecord.jsx";
import ModalDownloadsRecords from "../components/ModalDownload.jsx";
import ModalEditRecords from "../components/ModalEditRecords.jsx";
import FilterRecords from "../components/FilterRecords.jsx";
import SelectSarchCategory from "../components/SearchCategoryPilot.jsx";
import SelectPilots from "../components/SelectPilots.jsx";
import SelectEvetn from "../components/selectEvent.jsx";

const MobileTable = () => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const [alertType, setAlertType] = useState(true);
  const [alertTitle, setAlertTitle] = useState("")
  const [alertMsg, setAlertMsg] = useState("")
  const [bannerStatus, setBannerStatus] = useState(false)


  const [showPopUpBanner, setShowPopUpBanner] = useState(false)
  const [popUpType, setPopUpType] = useState(true)
  const [popUpTitle, setPopUpTitle] = useState("")
  const [popUpMsg, setPopUpMsg] = useState("")
  const [popUpStatus, setPopUpStatus] = useState(false);


  const [deleteMessage, setDeleteMessage] = useState("")

  const [categorySelcted, setCategorySelected] = useState("");
  const [recordsArr, setRecordsArr] = useState([]);
  const [pilotsArr, setPilotsArr] = useState("");
  const [eventArr, setEventArr] = useState("");
  const [selected, setSelected] = useState([]);
  const [numTire, setNumTire] = useState("");

  // console.log(recordsArr)

  // Pagination (front)
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const total = recordsArr.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pageRecords = useMemo(() => {
    return recordsArr.slice(start, end);
  }, [recordsArr, start, end]);


  const onChangeFn = (val) => {
    setCategorySelected(val);
  };

  const onChangePilot = (val) => {
    setNumTire("");
    setPilotsArr(val);
  };

  const onChangeEvent = (val) => {
    setEventArr(val);
  };

  const onChangeTiresFn = (val) => {
    setEventArr("");
    setCategorySelected("");
    setPilotsArr("");
    setNumTire(val);
  };

  const toggleRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const load = async () => {
      const data = await getRecordsTires(pilotsArr, eventArr);
      setRecordsArr(Array.isArray(data) ? data : []);
      setPage(1);
    };
    load();
  }, []);

  const functionSearch = async () => {
    console.log('Filter info =>',`Pilot:${pilotsArr}`, `Event: ${eventArr}`, numTire)
    //console.log('Filter info =>',categorySelcted, pilotsArr, eventArr, numTire)
    const data = await getRecordsTires(pilotsArr, eventArr, numTire);
    if(data.length == 0){
        setPopUpTitle('No encontrado');
        setPopUpMsg('No se encontro la busqueda ');
        setPopUpType('warning');
        setShowPopUpBanner(true);
        setPopUpStatus(prev => !prev);

    }else{
      setRecordsArr(Array.isArray(data) ? data : []);
    }
    setPage(1);
  };

  const deleteFunction = async () => {
    console.log(selected)
    try{
      const res = await deleteRecordTires(selected);
       
      if(res.ok){
        console.log(res)
        const data = await getRecordsTires("", "", "");
        setRecordsArr(Array.isArray(data) ? data : []);
        
        setAlertMsg('Eliemento/s eliminado/s')
        setAlertTitle('Operacion Exitosa!')
        setAlertType(true);
        setSelected([]);
        setShowBanner(true);
        setBannerStatus(prev => !prev);
        setPage(1);
        setTimeout(() => setShowDeleteModal(false),4000);
      }else{
        console.log(`${res.error} - ${selected[0]}`)
        setAlertType(false);
        setAlertMsg(`${res.error} - ${selected.join(' - ')}`)
        setAlertTitle(`Error! - ${selected[0]}`)
        setShowBanner(true);
        setBannerStatus(prev => !prev);
        setTimeout(() => setAlertMsg(""),3700)
      }
    }catch(err){
      console.log(err)

    }
  };

  const editFunction = async () => {
    // console.log('Edit selected',selected[0]);
    // const result = recordsArr.find(r => r.id === selected)

    
    setTimeout(() => {
      setShowModalEdit(false);
      setSelected([]);
    },5000);
    //setShowModalEdit(false)
    setPage(1);
  }

  const showAll = async () => {
    setCategorySelected("");
    setPilotsArr("");
    setEventArr("");
    setNumTire("");
    const data = await getRecordsTires("", "", "");
    setRecordsArr(Array.isArray(data) ? data : []);
    setPage(1);
  };

  const normalizeFileName = (name) => {
    if (!name) return "Records.csv";
    return name.toLowerCase().endsWith(".csv") ? name : `${name}.csv`;
  };

  const downloadCsv = (rows, filename = "records.csv") => {
    if (!Array.isArray(rows) || rows.length === 0) return;

    const headers = [
      "pilot_name",
      "surname",
      "event",
      "name_circuits",
      "category",
      "date",
      "time",
      "tire_n1",
      "tire_n2",
      "tire_n3",
      "tire_n4",
      "tire_n5",
      "tire_n6",
    ];

    const escape = (v) => {
      if (v === null || v === undefined) return "";
      const s = String(v);
      return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };

    const getDate = (event_date) => String(event_date).split("T")[0] || "";
    const getTime = (event_date) =>
      (String(event_date).split("T")[1] || "").split(".")[0] || "";

    const csv = [
      headers.join(","),
      ...rows.map((r) => {
        const row = {
          pilot_name: r.pilot_name,
          surname: r.surname,
          event: r.event,
          name_circuits: r.name_circuits,
          category: r.id_category,
          date: getDate(r.event_date),
          time: getTime(r.event_date),
          tire_n1: r.tire_n1,
          tire_n2: r.tire_n2,
          tire_n3: r.tire_n3,
          tire_n4: r.tire_n4,
          tire_n5: r.tire_n5,
          tire_n6: r.tire_n6,
        };

        return headers.map((h) => escape(row[h])).join(",");
      }),
    ].join("\n");

    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = normalizeFileName(filename);
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  };


  

  // console.log('Mobile Records page')
  

  return (
    <>


      {showBanner && (
        <AlertBanner 
          titleAlert={alertTitle} 
          messageAlert={alertMsg} 
          classNN={alertType} 
          statusBanner = {bannerStatus}

        />
      )}

      {showPopUpBanner && (
        <AlertPopUp
        titleAlert={popUpTitle}
        messageAlert={popUpMsg}
        classNN={popUpType}
        statusPopUp = {popUpStatus}

        />
      )}


      {showDeleteModal && (
        <ModalDeleteRecord
          ids={selected}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={deleteFunction}
          dataDetail={'Records'}
        />
      )}

      {showDownloadModal && (
        <ModalDownloadsRecords
          onClose={() => setShowDownloadModal(false)}
          onConfirm={ (nameFIle) => {
            downloadXlsx(pageRecords, nameFIle)
            // downloadCsv(pageRecords, nameFIle)
          }
          }
        />
      )}

      {showModalEdit && (
        <ModalEditRecords
          recdEd={recordsArr.find(r => r.id === selected[0])}
          onCancel={() => setShowModalEdit(false)}
          //onCancel={() => console.log('Cerrado por ahora ')}
          onConfirm={editFunction}
        />
      )}



      {
        showModalFilter && ( 
        // <FilterRecords
        //   onClose={() => setShowModalFilter(false)}
        // />

        <div className="modal-overlay" onClick={() => {setShowModalFilter(false); console.log('overlay apretado')}}>



        <div className="container-modal midium-modal" onClick={(e) => e.stopPropagation()}>
          <span 
            onClick={() => setShowModalFilter(false)}
            className="x-close-filter">x</span>

        <h3 className="password-title">Filtrar Registro</h3>


            <div className="filter-section">
                  <SelectSarchCategory  // SearchCategoryPilot.jsx
                    // onChangeFn={onChangeFn}
                    onChangeFn={onChangeFn}
                    // value={categorySelcted}
                    nameClass={"rec"}
                  />
                 
                  <SelectPilots
                    category={categorySelcted}
                    onChagePilot={onChangePilot}
                    nameClass={"rec"}
                  />
                
                  <SelectEvetn
                    onChangeEvent={onChangeEvent}
                    value={eventArr}
                    nameClass={"rec"}
                  />


                  {/* <div className="container-buttons-filter">
                    <button className="btn-fitler btn-aply">Aplicar</button>
                    <button className="btn-fitler btn-cancel">Cancelar</button>
                  </div> */}
                  <button 
                    className="submit-btn"
                    onClick={() => {
                      functionSearch();
                      setShowModalFilter(false);
                    }}
                  >
                    Aplicar Filtro
                  </button>
          </div>
        

        </div>
      </div>
        )
      }

      {/* btn btn-add-record mobile-none child-nowrap */}



      <div className="contaienr-table-records">

      {/* <div className="container-banner"> */}


      {/* </div> */}

      <div className="container-table">

      <h3 className="h3-title" >Registros</h3>
      <div className="toolbar-container-rec">


              <div className="icon-group">


                {/* btn dropdown bnt-showall child-nowrap */}
                <button className="btn-record-mobile" onClick={showAll}>
                  Ver Todo
                </button>

                <button 
                  className="btn-record-mobile btn-filter-rec"
                  onClick={() => setShowModalFilter(true)}>
                Filtrar
                </button>
              </div>


        <div className="toolbar-second">

          <div className="container-search-tires">
            <SelectTires
              onChangeTires={onChangeTiresFn}
              value={numTire}
            />

            <button className="action-btn" onClick={functionSearch} >Buscar</button>
          </div>

        </div>
      </div>

      <Link to="/new_record" className="action-btn">
        Agregar Registro
      </Link>


{/* ---------------- aca comienza la tabla ---------------------------- */}

     

      <div className="toolbar-first">
        
        <button
          className="btn-icon btn-download-rec"
          onClick={() => setShowModalEdit(true)}
          // onClick={() => downloadCsv(pageRecords, "records.csv")}
        >
          {/* <img src={editIcon} alt="Edit" /> */}
          <span>Editar</span>
        </button>
        
        <button
          className="btn-icon"
          onClick={() => setShowDeleteModal(true)}
          // disabled={!selected.length}
        >
          <img src={deleteIcon} alt="Delete" />
        </button>

        <button
          className="btn-icon btn-download-rec"
          onClick={() => setShowDownloadModal(true)}
          // onClick={() => downloadCsv(pageRecords, "records.csv")}
        >
          <img src={downloadIcon} alt="Download" />
        </button>
            
      </div>

      <div className="table-wrap">

            <div className="table-rec">
              <div className="thead-rec">
                <div className="thead-rec-tr grt-records">
                  <div className="th-rec ms-td-check"></div>
                  <div className="th-rec " >Piloto</div>
                  <div className="th-rec col-fecha" >Fecha</div>
                  <div className="th-rec ms-none" >Categoria</div>
                  <div className="th-rec ms-none" >Date</div>
                  <div className="th-rec ms-none" >Hora</div>
                  <div className="th-rec th-tire" >N 1</div>
                  <div className="th-rec th-tire" >N 2</div>
                  <div className="th-rec th-tire" >N 3</div>
                  <div className="th-rec th-tire" >N 4</div>
                  <div className="th-rec th-tire" >N 5</div>
                  <div className="th-rec th-tire" >N 6</div>
                </div>
              </div>
    
          
    
               <div className="tbody-rec" >
                   {pageRecords.map((r) => (
                     <div className="tbody-rec-tr grt-records" key={r.id}>
                       <div className="td-rec ms-td-check">
                         <input
                           type="checkbox"
                           checked={selected.includes(r.id)}
                           onChange={() => toggleRow(r.id)}
                         />
                       </div>
                  
                       <div className="td-rec">
                         {r.pilot_name} {r.surname} {` - (${r.number_pilot})`}
                       </div>
                       <div className="td-rec col-fecha">
                         {r.event} - {r.name_circuits}
                       </div>
                       <div className="td-rec ms-none">{r.category}</div>
                       <div className="td-rec ms-none">{String(r.event_date).split("T")[0]}</div>
                       <div className="td-rec ms-none">{String(r.event_date).split("T")[1]?.split(".")[0]}</div>
                  
                       <div className="td-rec td-tire">{r.tire_n1}</div>
                       <div className="td-rec td-tire">{r.tire_n2}</div>
                       <div className="td-rec td-tire">{r.tire_n3}</div>
                       <div className="td-rec td-tire">{r.tire_n4}</div>
                       <div className="td-rec td-tire">{r.tire_n5}</div>
                       <div className="td-rec td-tire">{r.tire_n6}</div>
                     </div>
                   ))}
               </div>
            </div> 

      </div>

{/* ---------------- aca termina la tabla ---------------------------- */}


        </div>


        <div className="pagination-container">
            <div className="pagination">
              <button
                className="btn-pagination"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>

              <span className="span-pagination">
                Page {page} / {totalPages}
              </span>

              <button
                className="btn-pagination"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>

            <div className="entries">
              <span>Show</span>

              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
              >
                {[10, 25, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <span>entries</span>

              <span style={{ marginLeft: 12 }}>
                {total === 0 ? "0" : `${start + 1}-${Math.min(end, total)}`} of{" "}
                {total}
              </span>
            </div>
        </div>


      </div>
    </>
  );
};

export default MobileTable;
