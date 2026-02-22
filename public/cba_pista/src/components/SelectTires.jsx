


const SelectTires = ({ onChangeTires, value  }) => {

   return (
      // <label className="field field-N field-NS">
      //    {/* <span className="label label-N label-NS">Numero Cubierta:</span> */}
      //    <input 
      //       onChange={(e) => onChangeTires(e.target.value)}
      //       placeholder="Ingresar Numero"
      //       //className="input input-N"
      //       className="search-input"
      //       type="text"
      //       value={value}
      //    />
      // </label>

         <input 
            onChange={(e) => onChangeTires(e.target.value)}
            placeholder="Ingresar Numero"
            //className="input input-N"
            className="toolbar-search-tires input-tires"
            type="text"
            value={value}
         />
      
      // <label className="field field-N">
      //   <span className="label label-N"></span>
      //   <input
      //     className={`input input-N`}
      //     type="text"
      //     value="valor"
      //   />
      // </label>

   )
}

export default SelectTires

