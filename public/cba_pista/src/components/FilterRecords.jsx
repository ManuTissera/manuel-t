


const FilterRecords = ({ onClose }) => {

   return(
      <>

      <div className="modal-overlay" onClick={onClose}>
        <div className="container-filter-tires">
          <span 
            onClick={onClose}
            className="x-close-filter">x</span>
          <h4>Filter</h4>

          <label className="rec-label-select">
            <span className="rec-span-select">Fecha de Carrera</span>
            <select className="rec-select">
              <option>Option 1</option>
              <option>Option 1</option>
              <option>Option 1</option>
              <option>Option 1</option>
            </select>
            </label>

            <label className="rec-label-select">
                <span className="rec-span-select">Categoria</span>
                <select className="rec-select">
                  <option>Option 1</option>
                  <option>Option 1</option>
                  <option>Option 1</option>
                  <option>Option 1</option>
                </select>
            </label>

            <label className="rec-label-select">
                <span className="rec-span-select">Piloto</span>
                <select className="rec-select">
                  <option>Option 1</option>
                  <option>Option 1</option>
                  <option>Option 1</option>
                  <option>Option 1</option>
                </select>
            </label>

            {/* <div className="container-buttons-filter">
              <button className="btn-fitler btn-aply">Aplicar</button>
              <button className="btn-fitler btn-cancel">Cancelar</button>
            </div> */}
            <button className="btn-aply-filter">Aplicar Filtro</button>

        </div>
      </div>
      </>
   )
}

export default FilterRecords








