import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "@remix-run/react";
import "../styles/Usuario.css";

const useDestinoService = () => {
  const [avatar, setAvatar] = useState("https://cdn-icons-png.flaticon.com/512/9187/9187532.png");
  const [nombreS, setNombreS] = useState("");
  const [correoS, setCorreoS] = useState("");

  return {
    avatar,
    nombreS,
    correoS,
    reset: () => {
      setAvatar("https://cdn-icons-png.flaticon.com/512/9187/9187532.png");
      setNombreS("");
      setCorreoS("");
    },
    setInfo: (avatar: string, nombre: string, correo: string) => {
      setAvatar(avatar);
      setNombreS(nombre);
      setCorreoS(correo);
    }
  };
};

export function Usuario() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const destinoService = useDestinoService();

  const ruta = location.pathname;

  const handleVisible = () => {
    setVisible((prev) => !prev);
  };

  const cerrarSesion = () => {
    destinoService.reset();
    navigate("/");
  };

  return (
    <>
      <article className="usuario" onClick={handleVisible}>
        <img className="avatar" src={destinoService.avatar} alt="avatar" />
      </article>

      {visible && (
        <div className="infoUsuario">
          {(ruta === "/" || ruta === "/Perfil") ? (
            <>
              <img
                className="imgIcon"
                src="https://cdn-icons-png.flaticon.com/512/995/995168.png"
                alt="planetaIcon"
              />
              <button className="buttonSesion">Iniciar travesía</button>
            </>
          ) : (
            <>
              <h3>Nombre: <span>{destinoService.nombreS}</span></h3>
              <h3>Correo: <span>{destinoService.correoS}</span></h3>
              <button className="buttonSesion" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
