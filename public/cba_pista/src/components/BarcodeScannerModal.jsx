


import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

export default function BarcodeScannerModal({ open, onClose, onResult }) {
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    let active = true;

    (async () => {
      try {
        // "environment" suele elegir la cámara trasera en móviles
        await codeReader.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          (result, err) => {
            if (!active) return;
            if (result) {
              onResult(result.getText());
              onClose();
            }
          }
        );
      } catch (e) {
        console.log("Scanner error:", e?.message || e);
        onClose();
      }
    })();

    return () => {
      active = false;
      try {
        codeReaderRef.current?.reset();
      } catch {}
    };
  }, [open, onClose, onResult]);

  if (!open) return null;

  return (
    <div className="scanner-backdrop" onClick={onClose}>
      <div className="scanner-modal" onClick={(e) => e.stopPropagation()}>
        <div className="scanner-head">
          <span>Lector de código</span>
          <button type="button" className="scanner-close" onClick={onClose}>X</button>
        </div>

        <video ref={videoRef} className="scanner-video" />

        <div className="scanner-foot">
          <button type="button" className="btn-add" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}