

const ToastErrorPilot = ({ onClose, errorText, isOpen }) => {

  return (
    <div
      className={`toast-error ${isOpen ? "is-open" : ""}`}
      role="alert"
      aria-live="assertive"
    >
      <span className="toast-error-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="toast-error-symbol">
          <circle cx="12" cy="12" r="10" fill="currentColor"/>
          <path
            d="M8 8l8 8M16 8l-8 8"
            stroke="#ffffff"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <div className="toast-error-text">
        <div className="toast-error-title">Error!</div>
        <div className="toast-error-subtitle">
          {errorText}
        </div>
      </div>

      <button
        className="toast-error-btn"
        type="button"
        onClick={onClose}
      >
        Retry
      </button>
    </div>
  );
};

export default ToastErrorPilot;
