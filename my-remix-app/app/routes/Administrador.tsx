import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { MenuNavegacion } from "../components/Menu_navegacion/Menu_navegacion";
import "../styles/administrador.css";

const avatarImages = [
  "./ava11.png",
  "./ava12.png",
  "./ava13.png",
  "./ava14.png",
];

export default function Administrador() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [estadoCorreo, setEstadoCorreo] = useState("");
  const [aceptado, setAceptado] = useState(false);
  const [controlBoton, setControlBoton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    verificarCorreo();
  }, [correo, aceptado]);

  const plusSlides = (n: number) => {
    setSlideIndex(
      (prev) => (prev + n + avatarImages.length) % avatarImages.length
    );
  };

  const currentSlide = (n: number) => {
    setSlideIndex(n);
  };

  const verificarCorreo = () => {
    const regEmail =
      /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    if (!regEmail.test(correo)) {
      setEstadoCorreo("Correo no válido");
      setControlBoton(true);
    } else if (!aceptado) {
      setEstadoCorreo("Debe aceptar los términos y condiciones");
      setControlBoton(true);
    } else {
      setEstadoCorreo("");
      setControlBoton(false);
    }
  };

  const datosUsuario = (e) => {
    e.preventDefault();
    const datos = {
      correo,
      avatar: avatarImages[slideIndex],
    };
    console.log("Datos enviados:", datos);

    navigate("/ModuloAdministrador");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <MenuNavegacion />
      <main className="container">
        <form className="container__main" onSubmit={(e)=>datosUsuario(e)}>
          <div className="container__main__card">

            <div id="tituloModulo">
              <p>Modulo Administrador</p>
            </div>

            <section className="container__main__card__avatar">
              <div className="container__main__card__avatar--img fade">
                <img src='./fotoAdmin.jpeg' width="100%" alt="avatar" />
              </div>
            </section>

            <section className="container__main__card__data">
              <div className="input-password-wrapper">
                <input
                  className="container__main__card__data--input"
                  type="email"
                  placeholder="Correo electrónico"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              <div className="input-password-wrapper">
                <input
                  className="container__main__card__data--input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>

                {showPassword
                  ?<i onClick={toggleShowPassword} className="fa-solid fa-eye-slash"></i>
                  :<i onClick={toggleShowPassword} className="fa-solid fa-eye"></i>
                }
                  
                  
              </div>

              <button
                className="container__main__card__data--button"
                type="submit"
              >
                Iniciar sesion 
                <i className="fa-solid fa-right-to-bracket"></i>
              </button>
            </section>
          </div>
        </form>
      </main>
    </>
  );
}
