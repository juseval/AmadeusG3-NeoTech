import { Link } from "@remix-run/react";
import { Usuario } from "../../routes/Usuario";
import "../../styles/Menu_navegacion.css";

export function MenuNavegacion() {
  return (
    <header>
      <nav className="nav">
        <img className="nav__logo" src="./amadeus-logo-dark-sky.png" alt="logo" />
        <div className="nav__container">
          <ul className="nav__lista">
            <li><Link to="/">Inicio</Link></li>
            <li><a href="https://amadeus.com/es/contacto" target="_blank" rel="noreferrer">Contacto</a></li>
            <li><Link to="/Report" target="_blank">Reporte</Link></li>
            <li><a href="https://amadeus.com/en" target="_blank" rel="noreferrer">Amadeus</a></li>
          </ul>
          <Usuario />
        </div>
      </nav>
    </header>
  );
}
