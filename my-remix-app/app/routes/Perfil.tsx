import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { MenuNavegacion } from "../components/Menu_navegacion/Menu_navegacion";
import "../styles/perfil.css";

const avatarImages = [
  "./ava11.png",
  "./ava12.png",
  "./ava13.png",
  "./ava14.png",
];

export default function Perfil() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [estadoCorreo, setEstadoCorreo] = useState("");
  const [aceptado, setAceptado] = useState(false);
  const [controlBoton, setControlBoton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    verificarCorreo();
  }, [correo, aceptado]);

  const plusSlides = (n: number) => {
    setSlideIndex((prev) => (prev + n + avatarImages.length) % avatarImages.length);
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

  const datosUsuario = () => {
    const datos = {
      nombre,
      correo,
      avatar: avatarImages[slideIndex],
    };
    console.log("Datos enviados:", datos);

    navigate("/Tarjetas");
  };

  return (
    <>
      <MenuNavegacion/>
      <main className="container">
        <form className="container__main" onSubmit={(e) => e.preventDefault()}>
          <div className="container__main__card">
            <section className="container__main__card__avatar">
              <div className="container__main__card__avatar--img fade">
                <img src={avatarImages[slideIndex]} width="100%" alt="avatar" />
              </div>
            </section>

            <section className="container__main__card__select">
              <a className="prev" onClick={() => plusSlides(-1)}>
                &#10094;
              </a>

              <div className="container__main__card__dot">
                {avatarImages.map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${slideIndex === i ? "active" : ""}`}
                    onClick={() => currentSlide(i)}
                  ></span>
                ))}
              </div>

              <a className="next" onClick={() => plusSlides(1)}>
                &#10095;
              </a>
            </section>

            <section className="container__main__card__data">
              <input
                className="container__main__card__data--input"
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                className="container__main__card__data--input"
                type="email"
                placeholder="Correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <label className="container__main__card__data--alert">{estadoCorreo}</label>

              <div className="container__main__card__data--personalData">
                <input
                  type="checkbox"
                  id="data-accepted"
                  checked={aceptado}
                  onChange={(e) => setAceptado(e.target.checked)}
                />
                <label className="container__main__card__data--checkbox" htmlFor="data-accepted">
                  Acepto los{" "}
                  <a
                    href="https://amadeus.com/es/politicas/privacy-policy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    términos y condiciones
                  </a>{" "}
                  de la política de protección de datos.
                </label>
              </div>

              <button
                className="container__main__card__data--button"
                type="button"
                onClick={datosUsuario}
                disabled={controlBoton}
              >
                ¡Próxima aventura!
              </button>
            </section>
          </div>
        </form>
      </main>
    </>
  );
}
