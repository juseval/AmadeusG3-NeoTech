import { useLocation, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { MenuNavegacion } from "../components/Menu_navegacion/Menu_navegacion";
import {get} from "../services/destinoService";
import '../styles/Resultados.css';

export default function Resultados() {
  const location = useLocation();
  const navigate = useNavigate();
  const [respuestas, setRespuestas] = useState<string[]>([]);

  useEffect(() => {
    if (location.state?.respuestas) {
      setRespuestas(location.state.respuestas);
      console.log("Respuestas en resultados: ", location.state.respuestas);
    } else {
      navigate("/tarjetas");
    }
  }, [location, navigate]);

  const guardarRespuestas = async () => {

    var user = localStorage.getItem("usuario") ?? "{}";
    var usuario = JSON.parse(user ?? "{}");
    var id = usuario.id;

    var stringrespuestas = respuestas.join("-");

    var response = await get(`Answer/get/${id}/${stringrespuestas}`)
    console.log(response)
    if ( response.status === 200) {
      const data = await response.json();
      var cities = {
        destinoAmerica: data.first_City,
        destinoEuropa: data.second_City
      }
      localStorage.setItem("destinoAmerica", data.first_City);
      localStorage.setItem("destinoEuropa", data.second_City);
      navigate("/Destino", { state: cities });
    } else {
      console.log("Error en guardar las Respuestas");
    }
  };
  return (
    <>
      <MenuNavegacion />
      <main className="conteiner_resultados">
        <h1 className="conteiner__titulo_resultados">Tus preferencias:</h1>
        <div className="conteiner--resumen">
          <div className="resumen__preguntas">
            <div className="resumen__preguntas__item">Preferencia Destino:</div>
            <div className="resumen__preguntas__item">Preferencia Climática:</div>
            <div className="resumen__preguntas__item">Preferencia Actividad:</div>
            <div className="resumen__preguntas__item">Preferencia Alojamiento:</div>
            <div className="resumen__preguntas__item">Duración viaje:</div>
            <div className="resumen__preguntas__item">Edad:</div>
          </div>
          <form className="resumen__respuestas">
            {respuestas.map((respuesta, i) => (
              <div className="resumen__respuestas__item" key={i}>
                <input className="resumen__respuestas__input" type="text" value={respuesta} readOnly />
              </div>
            ))}
          </form>

          <div className="resumen__imagen">
            <i className="fa-solid fa-plane-up slide-in-bottom vibrate-1"></i>
          </div>
        </div>
        <div className="conteiner__botones">
          <button className="boton"
            type="button"
            onClick={() =>
              navigate("/tarjetas", {
                state: { respuestas, volverAIndice: 5 },
              })
            }
          >
            Atrás
          </button>
          <button className="boton" type="button" onClick={guardarRespuestas}>Confirmar</button>
        </div>
      </main>
    </>
  );
}
