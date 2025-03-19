import { Link, useLocation } from "@remix-run/react";
import {MenuNavegacion} from "../components/Menu_navegacion/Menu_navegacion";
import { useEffect, useState } from 'react';
import { get } from '../services/destinoService';
import '../styles/Planes.css'

export default function Planes() {

  const location = useLocation();
  const {continent} = location.state || {};
  const [hotelName, setHotelName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imgHotel, setImgHotel] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [urlHotel, setUrlHotel] = useState<string>('');

  useEffect(() => {
      extractHotelDetails();
  }, [continent]);

  const extractHotelDetails =  async () => {

    if (continent === 'América') {
      var america = localStorage.getItem('destinoAmerica');

      var response = await get(`City/byName/${america}`)

      if ( response.status === 200) {
        const data = await response.json();
        setHotelName(data.nombreHotel);
        console.log('Hotel:', data.nombreHotel);
        setDescription(data.descripcionHotel);
        setImgHotel(encodeURI(data.imgHotel));
        setImg(encodeURI(data.img));
        setName(data.nombreDestino);
        setUrlHotel(data.urlHotel);
      } else {
        console.log("Ciudad no se encuentra registrada");
      }

    } else if (continent === 'Europa') {
        var europa = localStorage.getItem('destinoEuropa');
        var response = await get(`City/byName/${europa}`)

        if ( response.status === 200) {
          const data = await response.json();
          setHotelName(data.nombreHotel);
          setDescription(data.descripcionHotel);
          setImgHotel(encodeURI(data.imgHotel));
          setImg(encodeURI(data.img));
          setName(data.nombreDestino);
          setUrlHotel(data.urlHotel);
        } else {
          console.log("Ciudad no se encuentra registrada");
        }
    }
  };

  return (
    <>
    <MenuNavegacion/>
    <div className="container">
    <div className="container__encabezado">

      <div className="opcion__link__item">
        <Link to="/destino"><i className="fa-solid fa-arrow-left"></i></Link>
        <span className="tooltiptext">Volver a tu destino</span>
      </div>

      <h1 className="container__encabezado__titulo">Destino seleccionado:</h1>
      <div className="container__encabezado__imagen">
        <img src={img} alt="Imagen del destino seleccionado"/>
      </div>
      <h2 className="container__encabezado__nombre">{name}</h2>
    </div>

    <div className="container__hospedaje">

      <h2>Tus opciones de hospedaje:</h2>

      <div>
        <p> Estas son las opciones de hospedaje que te recomendamos según tus
          preferencias:</p>
      </div>

      <div className="container__hospedaje__opciones">
        <div className="container__hospedaje__opcion">

          <div className="container__hospedaje__opcion__img">
            <img src="./airbnb.png" alt="Imagen de Airbnb" />
          </div>

          <div className="container__hospedaje__opcion__info">
            <h3>airbnb</h3>
            <p>
              Explora alojamientos únicos, desde acogedores apartamentos en el corazón de la ciudad hasta exóticas casas en árboles.
              Viaja de una manera más auténtica y personalizada, creando recuerdos inolvidables en cada destino.
            </p>
            <a className="container_hospedaje_button" target="_blank" href="https://www.airbnb.com.co/">Explora tu estancia</a>
          </div>
        </div>
    
        <div className="container__hospedaje__opcion">
          <div className="container__hospedaje__opcion__img">
            <img src={imgHotel} alt={`Imagen del ${hotelName}`} />
          </div>

          <div className="container__hospedaje__opcion__info">
            <h3>{hotelName}</h3>
            <p>{description}</p>
            <a className="container_hospedaje_button"  target="_blank" href={urlHotel}>Explora tu Hotel</a>
          </div>
        </div>
      </div>
    </div>

    <div className="container__vuelos">

      <h2>Tus opciones de vuelos:</h2>
      <div className="vuelo-container">
        <p className="txt-parrafo">
          Estos son las dos opciones de vuelos que te recomendamos según tus
          preferencias:
        </p>
      </div>

      <div className="container__vuelos__opciones">
        <div className="container__vuelos__opcion">

          <div className="container__hospedaje__opcion__img">
            <img src="./Avianca.png" alt="Imagen de un avión de Avianca" />
          </div>

          <div className="container__hospedaje__opcion__info">
            <h3>Avianca</h3>
            <p className="txt-parrafo">
              es la aerolínea bandera de Colombia y una de las más grandes de América Latina. Fundada en 1919, opera vuelos a más de 90 destinos en América, Europa, Asia y el Caribe.
              Es miembro de la alianza Star Alliance y se enfoca en ofrecer un servicio excepcional y conexiones globales a sus pasajeros

            </p>
            <a className="container_vuelos_button" target="_blank" href="https://www.avianca.com">Elige tu Aerolínea</a>
          </div>
          
        </div>
        <div className="container__vuelos__opcion">

          <div className="container__hospedaje__opcion__img">
            <img src="./Air-Europa-logo.png" alt="Imagen de un avión de Aeromexico"/>
          </div>

          <div className="container__hospedaje__opcion__info">
            <h3>Air Europa</h3>
            <p className="txt-parrafo">
              Es una aerolínea española fundada en 1984, con sede en Lluchmayor, Mallorca.
              Es miembro de la alianza SkyTeam y opera vuelos a más de 130 destinos en todo el mundo.
              La aerolínea se compromete con altos estándares de calidad y seguridad, y ofrece servicios como entretenimiento a bordo, menús exquisitos y prioridad en el embarque.
            </p>
            <a className="container_vuelos_button"  target="_blank" href="https://aeromexico.com">Elige tu Aerolínea</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  );
}
