import { useLocation, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import '../styles/Resultados.css';

export default function Resultados() {
  const location = useLocation();
  const navigate = useNavigate();
  const [respuestas, setRespuestas] = useState<string[]>([]);

  useEffect(() => {
    if (location.state?.respuestas) {
      setRespuestas(location.state.respuestas);
    } else {
      navigate("/tarjetas");
    }
  }, [location, navigate]);

  return (
    <main className="conteiner">
      <h1 className="conteiner__titulo">Tus preferencias:</h1>
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
              <input type="text" value={respuesta} readOnly />
            </div>
          ))}
        </form>

        <div className="resumen__imagen">
          <i className="fa-solid fa-plane-up slide-in-bottom vibrate-1"></i>
        </div>
      </div>

      <div className="conteiner__botones">
        <button type="button" onClick={() => navigate("/tarjetas")}>Atrás</button>
        <button type="button" onClick={() => navigate("/destino")}>Confirmar</button>
      </div>
    </main>
  );
}
