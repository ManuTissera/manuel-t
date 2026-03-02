


// Elements
const btnShowCV = document.querySelector('.btn-cv-show');
const modalCV   = document.querySelector('.modal_cvs');
const overlay   = document.querySelector('.overly-modal-cvs');
const modalLinks = document.querySelectorAll('.btn-modal-cv');

// Initial state
modalCV.style.display = 'none';
overlay.style.display = 'none';

// Open modal
btnShowCV.addEventListener('click', () => {
   modalCV.style.display = 'flex';
   overlay.style.display = 'block';
});

// Close modal function
function closeModal() {
   modalCV.style.display = 'none';
   overlay.style.display = 'none';
}

// Close when clicking overlay
overlay.addEventListener('click', closeModal);

// Close when clicking any CV option
modalLinks.forEach(link => {
   link.addEventListener('click', () => {
      closeModal();
   });
});