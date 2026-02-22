


const ToastSuccesPilot = ({ onClose, pilotName, surnamePilot }) => {

   console.log(pilotName)

   return(
      <>
         <div class="toast-success" role="status" aria-live="polite">
           <span class="toast-icon" aria-hidden="true">
             <svg viewBox="0 0 24 24" class="toast-check">
               <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
           </span>
         
           <div class="toast-text">
             <div class="toast-title">Piloto Agregado </div>
             <div class="toast-subtitle">Nombre: {pilotName} {surnamePilot}</div>
           </div>
         
           <button class="toast-close" type="button" onClick={onClose} aria-label="Close">
             <svg viewBox="0 0 24 24" class="toast-x">
               <path d="M18 6L6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
             </svg>
           </button>
         </div>
      </>
   )
}


export default ToastSuccesPilot
