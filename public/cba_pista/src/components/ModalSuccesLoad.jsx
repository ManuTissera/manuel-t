import okCircle from "../assets/ok-circle.svg";

const ModalSuccesLoad = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-success"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="modal-success-top">
          <img className="modal-success-icon" src={okCircle} alt="Success" />
        </div>

        <div className="modal-success-body">
          <h2 className="modal-success-title">Registro Agregado!</h2>
          <p className="modal-success-text">
            Manuel Tissera - Clase 2 - TP
          </p>

          <button className="modal-success-btn" onClick={onClose}>
            <span className="modal-success-btn-x">×</span>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccesLoad;
