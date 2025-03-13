import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { MenuNavegacion } from "../components/Menu_navegacion/Menu_navegacion";
import '../styles/Tarjetas.css'

const preguntas = [
  "¿Que tipo de entorno prefieres para tus vacaciones?",
  "¿Qué clima prefieres durante tus vacaciones?",
  "¿Qué tipo de actividades prefieres hacer durante tus vacaciones?",
  "¿Qué tipo de alojamiento prefieres?",
  "¿Cuánto tiempo planeas quedarte de vacaciones?",
  "¿Cuál es tu rango de edad?",
];

const opciones = [
  ["Playa", "Montaña", "Ciudad"],
  ["Caluroso", "Templado", "Frío"],
  ["Deportes y Aventuras", "Cultura y Museos", "Relax y Bienestar"],
  ["Hotel de Lujo", "Hostal o Albergue", "Airbnb"],
  ["Menos de una semana", "1-2 semanas", "Más de dos semanas"],
  ["Menos de 30 años", "30-50 años", "Más de 50 años"],
];

const imgUrl = [
  ["./imagen1.jpg", "./imagen2.jpg", "./imagen3.jpg"],
  ["./Tulum.jpg", "./Templado.jpg", "./Frio.jpg"],
  ["./Aventura.jpg", "./cultura.jpg", "./relax.jpg"],
  ["./hotelujo.jpg", "./hostal.jpg", "./airbnb.jpg"],
  ["./findesemana.jpg", "./dosemanas.jpg", "./calendario.jpg"],
  ["./veinte.jpg", "./treinta.jpg", "./cincuenta.jpg"],
];

const datos = [
  [
    "Las playas no siempre son doradas?...",
    "Las montañas tienen su propio clima?...",
    "Muchas ciudades tienen secretos subterráneos?...",
  ],
  [
    "En muchos lugares con clima cálido se celebran festivales...",
    "Muchas de las rutas turísticas más famosas...",
    "En lugares con clima frío, el turismo se concentra...",
  ],
  [
    "Desde las montañas de Nepal hasta los ríos de Costa Rica...",
    "Al visitar los museos...",
    "Al visitar un baño termal...",
  ],
  [
    "Algunos de los hoteles más lujosos...",
    "Muchos de los hostales y albergues...",
    "Airbnb nació de una necesidad de alojamiento económico...",
  ],
  [
    "Estudios han demostrado que incluso viajes cortos...",
    "Este rango de tiempo permite sumergirte en la cultura local...",
    "Viajes prolongados te permiten desconectar completamente...",
  ],
  [
    "Viajar en la veintena te ayuda a desarrollar habilidades...",
    "Se busca ir más allá de los destinos turísticos...",
    "Muchos viajeros mayores se unen a grupos organizados...",
  ],
];

export default function Tarjetas() {
  const [indice, setIndice] = useState(0);
  const [opcSelect, setOpcSelect] = useState("");
  const [respuestas, setRespuestas] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpcSelect(e.target.value);
  };

  const verificarSeleccion = () => {
    return opcSelect !== "";
  };

  const siguiente = () => {
    if (!verificarSeleccion()) return;
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[indice] = opcSelect;
    setRespuestas(nuevasRespuestas);
    setIndice(indice + 1);
    setOpcSelect("");
  };

  const atras = () => {
    if (indice > 0) {
      setIndice(indice - 1);
      setOpcSelect(respuestas[indice - 1] || "");
    }
  };

  const calcularDestino = () => {
    navigate("/resultados", {
      state: { respuestas },
    });
  };

  const pregunta = preguntas[indice];
  const [op1, op2, op3] = opciones[indice];
  const [img1, img2, img3] = imgUrl[indice];
  const [dato1, dato2, dato3] = datos[indice];

  return (
    <>
      <MenuNavegacion/>
      <main className="container__general">
      <div className="titulo">
        <h1 className="scale-in-ver-center">{pregunta}</h1>
      </div>

      <div className="container">
        {[op1, op2, op3].map((opcion, i) => (
          <label key={i} htmlFor={`opc${i + 1}`}>
            <div className="card">
              <div className="face front">
                <img src={imgUrl[indice][i]} alt={`imagen_${i}`} />
                <h3>{opcion}</h3>
              </div>
              <div className="face back">
                <h3>¿Sabías qué...</h3>
                <p>{datos[indice][i]}</p>
              </div>
            </div>
          </label>
        ))}
      </div>

      <form className="radio">
        {[op1, op2, op3].map((valor, i) => (
          <div key={i}>
            <label>
              <input
                type="radio"
                id={`opc${i + 1}`}
                name="opciones"
                value={valor}
                checked={opcSelect === valor}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
      </form>

      <div className="navegacion">
        <ul>
          <li className="perfil" onClick={() => navigate("/perfil")}>
            Perfil
          </li>
          {[...Array(6).keys()].map((n) => (
            <li key={n} className={indice === n ? "activo" : "contador"}>
              {n + 1}
            </li>
          ))}
        </ul>
      </div>

      <form className="botones">
        <button type="button" onClick={atras} disabled={indice === 0}>
          Atrás
        </button>
        {indice < preguntas.length - 1 ? (
          <button
            type="button"
            onClick={siguiente}
            disabled={!verificarSeleccion()}
          >
            Siguiente
          </button>
        ) : (
          <button type="button" onClick={calcularDestino}>
            Calcular Destino
          </button>
        )}
      </form>
      </main>
    </>
  );
}
