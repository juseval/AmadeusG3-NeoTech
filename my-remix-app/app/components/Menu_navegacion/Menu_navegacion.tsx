import { Link, useNavigate } from "@remix-run/react";
import { Usuario } from "../../routes/Usuario";
import { useState, useEffect } from "react";
import { get } from "../../services/destinoService";
import "../../styles/Menu_navegacion.css";


interface PasswordModalProps {
  onClose: () => void;
  onAccess: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ onClose, onAccess }) => {
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
  <div className="modal-overlay">
      <div className="modal-content">
          <p>Ingrese la Contraseña</p>
          <input className="modal-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <div className="modal-buttons">
              <button className="modal-button" onClick={handleAccess}>Acceder</button>
              <button className="modal-button" onClick={onClose}>Cerrar</button>
          </div>
      </div>
  </div>
  );
};


export function MenuNavegacion() {

  const [controlBoton, setControlBoton] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
    };

    const handleCloseModal = () => {
    setIsModalOpen(false);
    };

    const handleAccessGranted = () => {
    setIsModalOpen(false);
    setHasAccess(true);
    };

  const verificarTipoUsuario = () => {
    var user = "{}"
    if (typeof(localStorage) !== "undefined") {
      user = localStorage.getItem("usuario") ?? "{}";
    }
    const usuario = JSON.parse(user ?? "{}");

    if(usuario.tipo_Usuario == 1){
      setControlBoton(false);
    }
    
  }

  useEffect(() => {
    verificarTipoUsuario();
  }, [controlBoton]);


  return (
    <header>
      <nav className="nav">
        <img className="nav__logo" src="./amadeus-logo-dark-sky.png" alt="logo" />
        <div className="nav__container">
          <ul className="nav__lista">
            <li><Link to="/" onClick={() => { localStorage.clear(); }}>Inicio</Link></li>
            <li><a href="https://amadeus.com/es/contacto" target="_blank" rel="noreferrer">Contacto</a></li>
            <li><a href="https://amadeus.com/en" target="_blank" rel="noreferrer">Amadeus</a></li>
            <li hidden={controlBoton}>
              {!hasAccess ? (
              <>
                <button className="nav__button" onClick={handleOpenModal}>Administrador</button>
                {isModalOpen && (
                <PasswordModal
                  onClose={handleCloseModal}
                  onAccess={() => {
                    handleAccessGranted();
                    navigate("/Report")
                  }}
                />
                )}
              </>
              ) : null}
            </li>
          </ul>
          <Usuario/>
        </div>
      </nav>
    </header>
  );
}
