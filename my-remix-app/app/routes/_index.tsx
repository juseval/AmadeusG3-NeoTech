import {MenuNavegacion} from "../components/Menu_navegacion/Menu_navegacion";
import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import {get} from "../services/destinoService";
import '../styles/index.css';

export default function Index() {
  
  const [correo, setCorreo] = useState("");
  const [estadoCorreo, setEstadoCorreo] = useState("");
  const [aceptado, setAceptado] = useState(false);
  const [controlBoton, setControlBoton] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    verificarCorreo();
  }, [correo, aceptado]);

  const verificarCorreo = () => {
    const regEmail =
      /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    
    if(correo === ""){
      setEstadoCorreo("");
    } else if (!regEmail.test(correo)) {
      setEstadoCorreo("Correo no válido");
      setControlBoton(true);
    } else {
      setEstadoCorreo("");
      setControlBoton(false);
    }
  };

  const datosUsuario = async () => {
      var response = await get(`user/byEmail/${correo}`)
      console.log(response)
      if ( response.status === 200) {
        const data = await response.json();
        var usuario = {
          id: data.id,
          full_Name: data.full_Name,
          email: data.email,
          tipo_Usuario: data.tipo_Usuario
        }
        localStorage.setItem("usuario", JSON.stringify(usuario));
        localStorage.setItem("avatar", "./ava11.png");
        navigate("/Tarjetas");
      }
      else {
        navigate("/Perfil", {
          state: {correo},
        });
      }
  };

  return (
    <>
      <MenuNavegacion />
      <section className="padre">
        <div className="container">
          <div className="play" /*onClick={llamarPagina}*/>
            
          </div>
          <div className="nosotros">
            <h1>Información</h1>
            <p>
              ¿Estás cansado de pasar horas buscando el destino perfecto para tu próximo viaje?
              ¿Te gustaría crear un viaje de acuerdo a tus preferencias y sin complicaciones?
              <br /><br />
                {/* <strong>¡Dale click a la imagen y prepárate para viajar!</strong> */}
            </p>
            <input
                className="container__main__card__data--input"
                type="email"
                placeholder="Correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />
            <label className="container__main__card__data--alert">{estadoCorreo}</label>
            <button
                className="container__main__card__data--button"
                type="button"
                onClick={datosUsuario}
                disabled={controlBoton}
              >
                ¡Iniciar!
            </button>
          </div>
          
        </div>
      </section>
    </>
  );
}
