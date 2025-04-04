import { Link, useNavigate } from "@remix-run/react";
import { Usuario } from "../../routes/Usuario";
import { useState, useEffect } from "react";
import "../../styles/Menu_navegacion.css";

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
                <a onClick={()=> navigate('/Report')}>Administrador</a>
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

