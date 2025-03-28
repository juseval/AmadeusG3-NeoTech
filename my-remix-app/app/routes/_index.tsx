import { MenuNavegacion } from "../components/Menu_navegacion/Menu_navegacion";
import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { get } from "../services/destinoService";
import {PasswordModal} from "~/components/Menu_navegacion/PasswordModal";
import '../styles/index.css';

export default function Index() {
  const [correo, setCorreo] = useState("");
  const [estadoCorreo, setEstadoCorreo] = useState("");
  const [aceptado, setAceptado] = useState(false);
  const [controlBoton, setControlBoton] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    verificarCorreo();
  }, [correo, aceptado]);

  const verificarCorreo = () => {
    const regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;

    if (correo === "") {
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
    var response = await get(`user/byEmail/${correo}`);
    console.log(response);

    if (response.status === 200) {
      const data = await response.json();
      var usuario = {
        id: data.id,
        full_Name: data.full_Name,
        email: data.email,
        tipo_Usuario: data.tipo_Usuario
      };

      localStorage.setItem("usuario", JSON.stringify(usuario));
      localStorage.setItem("avatar", "./ava11.png");

      if (data.tipo_Usuario == 1) {
        setUsuarioId(data.id);
        setMostrarModal(true);
      } else {
        navigate("/Tarjetas");
      }
    } else {
      navigate("/Perfil", { state: { correo } });
    }
  };

  const handleAccess = () => {
    setMostrarModal(false);
    navigate("/Report");
  };

  return (
    <>
      <MenuNavegacion />
      <section className="padre">
        <div className="container_index">
          <div className="play"></div>
          <div className="nosotros">
            <h1>Información</h1>
            <p>
              ¿Estás cansado de pasar horas buscando el destino perfecto para tu próximo viaje?
              ¿Te gustaría crear un viaje de acuerdo a tus preferencias y sin complicaciones?
              <br /><br />
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
              <div className="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
              <span className="textButton">Iniciar</span>
            </button>
          </div>
        </div>
      </section>
      {mostrarModal && <PasswordModal onClose={() => setMostrarModal(false)} onAccess={handleAccess} />}
    </>
  );
}
