


// Elements
const btnShowCV = document.querySelector('.btn-cv-show');
const modalCV   = document.querySelector('.modal_cvs');
const overlay   = document.querySelector('.overly-modal-cvs');
const modalLinks = document.querySelectorAll('.btn-modal-cv');

const btnShowBtns = document.querySelector('.btn-show-apps');
const modalBtns = document.querySelector('.modal-btn-apps');
const btnsApps = document.querySelectorAll('.btn-app');
const xCloseBtns = document.querySelector('.x-close-btns');

// Initial state
modalCV.style.display = 'none';
overlay.style.display = 'none';



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
   link.addEventListener('click', () => {
      closeModalBtn()
   })
})