import { useState, useEffect } from "react";
import { get } from "~/services/destinoService";
import { useLocation, useNavigate } from "@remix-run/react";
import { MenuNavegacion } from "../components/Menu_navegacion/Menu_navegacion";
import "../styles/Tarjetas.css";

export default function Tarjetas() {
  const location = useLocation();

  const [indice, setIndice] = useState(0);
  const [preguntas, setPreguntas] = useState<string[]>([]);
  const [opciones, setOpciones] = useState<string[][]>([]);
  const [imgUrl, setImgUrl] = useState<string[][]>([]);
  const [datos, setDatos] = useState<string[][]>([]);
  const [opcSelect, setOpcSelect] = useState("");
  const [respuestas, setRespuestas] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerDatos();
    if (location.state?.respuestas) {
      setRespuestas(location.state.respuestas);
      setIndice(location.state.volverAIndice);
    }
  }, []);

  const obtenerDatos = async () => {
    var responsePreguntas = await get("Question/all");
    var responseOpciones = await get("Question_Options/all");
    if (responsePreguntas.status === 200 && responseOpciones.status === 200) {
      const preguntasData = await responsePreguntas.json();
      const opcionesData = await responseOpciones.json();

      const preguntasText = preguntasData.map((pregunta: { question_Text: string }) => pregunta.question_Text);
      setPreguntas(preguntasText);

      const opcionesAgrupadas = agruparOpcionesPorPregunta(opcionesData);
      setOpciones(opcionesAgrupadas.opciones);
      setImgUrl(opcionesAgrupadas.imgUrl);
      setDatos(opcionesAgrupadas.datos);

      console.log("Preguntas: ", preguntasText);
      console.log("Opciones: ", opcionesAgrupadas.opciones);
      console.log("ImgUrl: ", opcionesAgrupadas.imgUrl);
      console.log("Datos: ", opcionesAgrupadas.datos);
    } else {
      console.log("Error en obtenerDatos");
    }
  };

  const agruparOpcionesPorPregunta = (opcionesData: any[]) => {
    const opcionesAgrupadas: { [key: number]: string[] } = {};
    const imgUrlAgrupadas: { [key: number]: string[] } = {};
    const datosAgrupadas: { [key: number]: string[] } = {};

    opcionesData.forEach((opcion) => {
      const questionId = opcion.question.id;
      if (!opcionesAgrupadas[questionId]) {
        opcionesAgrupadas[questionId] = [];
        imgUrlAgrupadas[questionId] = [];
        datosAgrupadas[questionId] = [];
      }
      opcionesAgrupadas[questionId].push(opcion.description);
      imgUrlAgrupadas[questionId].push(opcion.urlImg);
      datosAgrupadas[questionId].push(opcion.dato);
    });

    return {
      opciones: Object.values(opcionesAgrupadas).map(group => group.slice(0, 3)),
      imgUrl: Object.values(imgUrlAgrupadas).map(group => group.slice(0, 3)),
      datos: Object.values(datosAgrupadas).map(group => group.slice(0, 3))
    };
  };
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
    console.log("Respuestas: ", respuestas);
    setIndice(indice + 1);
    setOpcSelect("");
  };

  const calcularDestino = () => {
    if (!verificarSeleccion()) return;
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[indice] = opcSelect;
    setRespuestas(nuevasRespuestas);
    console.log("Respuestas: ", nuevasRespuestas);
    navigate("/resultados", {
      state: { respuestas: nuevasRespuestas },
    });
  };

  const atras = () => {
    if (indice > 0) {
      const nuevasRespuestas = [...respuestas];
      nuevasRespuestas[indice] = "";
      setRespuestas(nuevasRespuestas);
      setIndice(indice - 1);
      setOpcSelect(nuevasRespuestas[indice - 1] || "");
    }
    console.log("Respuestas: ", respuestas);
  };

  const volverInicio = () => {
    var confirmar = confirm("¿Desea ingresar con otro usuario y restablecer las opciones seleccionadas?")
    if(confirmar == false){
      return;
    } else {
    localStorage.clear();
    navigate("/");
    } 
  };

  const pregunta = preguntas[indice];
  const opcionesActuales = opciones[indice] || [];
  const imgUrlsActuales = imgUrl[indice] || [];
  const datosActuales = datos[indice] || [];

  return (
    <>
      <MenuNavegacion />
      <main className="container__general">
        <div className="titulo">
          <h1 className="scale-in-ver-center">{pregunta}</h1>
        </div>
        <div className="container_opciones">
          {opcionesActuales.map((opcion, i) => (
            <label key={i} htmlFor={`opc${i + 1}`}>
              <div className="cards">
                <div className="face front">
                  <img src={imgUrlsActuales[i]} alt={`imagen_${i}`} />
                  <h3>{opcion}</h3>
                </div>
                <div className="face back">
                  <h3>¿Sabías qué...</h3>
                  <p>{datosActuales[i]}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
        <form className="radio">
          {opcionesActuales.map((valor, i) => (
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
            <li
              className="perfil"
              onClick={() => {
                volverInicio();
              }}
            >
              Inicio
            </li>
            {[...Array(6).keys()].map((n) => {
              let className = "contador";
              if (indice === n) {
                className = "activo";
              } else if (respuestas[n]) {
                className = "activo";
              }
              return (
                <li key={n} className={className}>
                  {n + 1}
                </li>
              );
            })}
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