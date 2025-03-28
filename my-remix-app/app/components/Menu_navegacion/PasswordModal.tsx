import { get } from "../../services/destinoService";
import { useState} from "react";

interface PasswordModalProps {
  onClose: () => void;
  onAccess: () => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({ onClose, onAccess }) => {
  const [password, setPassword] = useState("");

  const handleAccess = async () => {
    var id = "";
    if (typeof(localStorage) !== "undefined") {
      id = JSON.parse(localStorage.getItem("usuario") ?? "{}").id;
    }
    var response = await get(`user/validatePassword/${id}/${password}`)
    if ( response.status === 200) {
      onAccess();
    }
    else {
      alert("Contraseña incorrecta");
    }
  };

 return (
  <div className="modal-overlay" style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
  }}>
      <div className="modal-content" style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
      }}>
          <h2>Ingrese la Contraseña</h2>
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleAccess} style={{ padding: "8px 16px" }}>Acceder</button>
              <button onClick={onClose} style={{ padding: "8px 16px" }}>Cerrar</button>
          </div>
      </div>
  </div>
  );
};