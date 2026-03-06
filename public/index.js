


// Elements
const modalLinks = document.querySelectorAll('.btn-modal-cv');
const btnShowCV = document.querySelector('.btn-cv-show');
const modalCV   = document.querySelector('.modal_cvs');
const overlay   = document.querySelector('.overly-modal-cvs');

const btnShowBtns = document.querySelector('.btn-show-apps');
const xCloseBtns = document.querySelector('.x-close-btns');
const modalBtns = document.querySelector('.modal-btn-apps');
const btnsApps = document.querySelectorAll('.btn-app');

const contModalConfirm = document.querySelector('.container-modal-confirmation');
const overlyInfo =  document.querySelector('.overly-modal-info');



// Initial state
modalCV.style.display = 'none';
overlay.style.display = 'none';
overlyInfo.style.display = 'none';

// Modal State

let modalState = false;



const viewModalInfo = (URL) => {
      overlyInfo.style.display = 'block';
      contModalConfirm.innerHTML = ""

      const modalConfirmation = `

            <div class="modal-confirmation">
              <div class="modal-header-mc">
                <span>Informacion</span>
                <button class="close-btn-mc">&times;</button>
               </div>

              <div class="modal-body-mc">
                <h3>Uso de Aplicaciones</h3>
                  <p>
                    Los datos de las aplicaciones son <b>ficticios</b>. Todas las funciones están
                    habilitadas: <b>"Agregar"</b>, <b>"Editar"</b> y <b>"Eliminar"</b> datos.
                    El objetivo es que se pueda utilizar la aplicación y tener una
                    experiencia completa de su funcionamiento.
                  </p>
               </div>

              <div class="modal-footer-mc">
               <!-- <a href="${URL}" target="_blanck" class="btn-skip-mc">${URL}</a> -->
                <a href="${URL}" target="_blank" class="btn-add-mc" onclick="closeModalBtn()">Aceptar</a>
              </div>
            </div>
      `;
      contModalConfirm.innerHTML = modalConfirmation;
}



// Open modal
btnShowCV.addEventListener('click', () => {
   modalCV.style.display = 'flex';
   overlay.style.display = 'block';
});

btnShowBtns.addEventListener('click', () => {
   modalBtns.classList.remove('hidden');
   modalBtns.classList.add('view-modal');
});


// Close modal function
function closeModal() {
   modalCV.style.display = 'none';
   overlay.style.display = 'none';
}

function closeModalBtn() {
   overlyInfo.style.display = 'none';
   contModalConfirm.innerHTML = ""
   modalBtns.classList.remove('view-modal');
   modalBtns.classList.add('hidden');

}

// Close when clicking overlay
overlay.addEventListener('click', closeModal);

// Close when click X buttons
xCloseBtns.addEventListener('click', closeModalBtn)

// Close when clicking any CV option
modalLinks.forEach(link => {
   link.addEventListener('click', () => {
      closeModal();
   });
});

btnsApps.forEach(link => {
   link.addEventListener('click', (e) => {
      let pageURL = e.currentTarget.dataset.page
      console.log('Btn app apretado', pageURL)
      viewModalInfo(pageURL)
      // modalState = (modalState == false) ? true : false;
      // console.log(modalState)

   });
});


