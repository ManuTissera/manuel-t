

const InputSearchTires = ({ onChangeTires, value, nameClass  }) => {
   
   return (
      <label className="field-search-N">
         <span className="label-search-N">Numero Cubierta:</span>
         <input 
            onChange={(e) => onChangeTires(e.target.value)}
            placeholder="Ingresar Numero"
            className="input-search-N"
            type="text"
            value={value}
         />
      </label>
   )
}



export default InputSearchTires



