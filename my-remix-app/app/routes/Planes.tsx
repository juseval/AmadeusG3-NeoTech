import { Link } from '@remix-run/react';
import {MenuNavegacion} from "../components/Menu_navegacion/Menu_navegacion";
import '../styles/Planes.css'

export default function Planes() {
  // Simulamos la información del servicio
  const destino = "Playa del Carmen";
  const srcA = "./PlayaDelCarmen.jpg";

  return (
    <body className="container">
      <MenuNavegacion />
      <div className="conteiner__encabezado">
        <div className="opcion__link__item">
          <Link to="/destino"><i className="fa-solid fa-arrow-left"></i></Link>
          <span className="tooltiptext">Volver a tus destino</span>
        </div>

        <h1 className="conteiner__encabezado__titulo">Destino seleccionado:</h1>

        <div className="conteiner__encabezado__imagen">
          <img src={srcA} alt="" />
        </div>

        <h2 className="conteiner__encabezado__nombre">{destino}</h2>
      </div>

      <div className="container__hospedaje">
        <h2>Tus opciones de hospedaje:</h2>

        <div>
          <p>Estas son las opciones de hospedaje que te recomendamos según tus preferencias:</p>
        </div>

        <div className="container__hospedaje__opciones">
          <div className="container__hospedaje__opcion">
            <div className="container__hospedaje__opcion__img">
              <a href="https://www.palladiumhotelgroup.com/es/hoteles/mexico/costamujerescancun/trs-coral-hotel" target="_blank" rel="noopener noreferrer">
                <img src="./trs-cancun.jpg" alt="" />
              </a>
            </div>
            <div className="container__hospedaje__opcion__info">
              <h3>TRS Coral Hotel</h3>
              <p>Se sitúa en Cancún, playa del carmen, cuenta con zona privada de playa, piscina al aire libre, wifi gratis en todo el hotel y 13 restaurantes con diferentes menús.</p>
            </div>
          </div>

          <div className="container__hospedaje__opcion">
            <div className="container__hospedaje__opcion__img">
              <a href="https://www.riu.com/es/ofertas/unete-riu-class-LATAM.jsp" target="_blank" rel="noopener noreferrer">
                <img src="./Riu-palace.jpg" alt="" />
              </a>
            </div>
            <div className="container__hospedaje__opcion__info">
              <h3>Riu Palace Hotel</h3>
              <p>Se sitúa en Cancún, playa del carmen, cuenta con zona privada de playa, piscina al aire libre, wifi gratis en todo el hotel y 13 restaurantes con diferentes menús.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container__vuelos">
        <h2>Tus opciones de vuelos:</h2>
        <div className="vuelo-container">
          <p className="txt-parrafo">Estos son las dos opciones de vuelos que te recomendamos según tus preferencias:</p>
        </div>

        <div className="container__vuelos__opciones">
          <div className="container__vuelos__opcion">
            <div className="container__hospedaje__opcion__img">
              <a href="https://www.avianca.com/es/" target="_blank" rel="noopener noreferrer">
                <img src="./avion-avianca.jpg" alt="" />
              </a>
            </div>
            <div className="container__hospedaje__opcion__info">
              <h3>Avianca</h3>
              <p className="txt-parrafo">
                Avianca, una aerolínea Colombiana de categoría premium, con más de 104 años de trayectoria, volando a más de 104 destinos, con "Avianca el cielo es de todos".
              </p>
            </div>
          </div>

          <div className="container__vuelos__opcion">
            <div className="container__hospedaje__opcion__img">
              <a href="https://aeromexico.com/es-co/" target="_blank" rel="noopener noreferrer">
                <img src="./Aeromexico-avion.jpg" alt="" />
              </a>
            </div>
            <div className="container__hospedaje__opcion__info">
              <h3>Aeromexico</h3>
              <p className="txt-parrafo">
                Aeromexico, una aerolínea Mexicana de categoría premium, con más de 90 años de trayectoria, volando a más de 104 destinos, con Aeromexico "estar cerca, llegar lejos".
              </p>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
