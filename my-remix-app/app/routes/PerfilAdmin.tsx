import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "@remix-run/react";
import {post} from "../services/destinoService";
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
  const [password, setPassword] = useState("");
  const [estadoCorreo, setEstadoCorreo] = useState("");
  const [aceptado, setAceptado] = useState(false);
  const [controlBoton, setControlBoton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    verificarCorreo();
  }, [nombre,correo, aceptado, password]);

  const plusSlides = (n: number) => {
    setSlideIndex((prev) => (prev + n + avatarImages.length) % avatarImages.length);
  };

  const currentSlide = (n: number) => {
    setSlideIndex(n);
  };

  const verificarCorreo = () => {

    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){5,15}$/;

    if(nombre === "" && correo === "" && password === "") {
        setEstadoCorreo("");
    }

    else if (nombre === "" || !regEmail.test(correo) || !aceptado || !regex.test(password)) {

        if(nombre === "") {
        setEstadoCorreo("Ingrese un nombre de Usuario");
        } else if(!regEmail.test(correo)) {
        setEstadoCorreo("Correo no válido");
        } else if(!regex.test(password)) {
        setEstadoCorreo("Contraseña de 5 a 15 caracteres, una mayúscula, una minúscula, un número y un caracter especial.");
        } else if(!aceptado) {
        setEstadoCorreo("Aceptar los términos y condiciones");
        }
        setControlBoton(true);
    } else {
        setEstadoCorreo("");
        setControlBoton(false);
    }
  };

  const user ={
    full_Name: nombre,
    email: correo,
    tipo_Usuario: 1,
    password: password,
    avatar: avatarImages[slideIndex],
  }

  const datosUsuario = async () => {
    var response = await post(`user/create`, user);
    if ( response.status === 201) {
      const data = await response.json();
        var usuario = {
            id: data.id,
            full_Name: data.full_Name,
            email: data.email,
            tipo_Usuario: data.tipo_Usuario,
            avatar: data.avatar,
        }
        
      alert("Usuario "+usuario.full_Name+" creado correctamente");

      navigate("/Report");
    }
    else {
      console.log("Error en datosUsuario")
    }
  };

return (
<>
    <MenuNavegacion />
    <main className="container_perfil">
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
            <label className="container__main__card__data--checkbox">
            Completa perfil administrador
            </label>
            <input
            className="container__main__card__data--input2"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNombre(e.target.value);
            }}
            />
            <input
            className="container__main__card__data--input2"
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCorreo(e.target.value);
            }}
            />
            <input
            className="container__main__card__data--input2"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
            }}
            />
            <label className="container__main__card__data--alert">
            {estadoCorreo}
            </label>
            <div className="container__main__card__data--personalData">
            <input
                type="checkbox"
                id="data-accepted"
                checked={aceptado}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAceptado(e.target.checked);
                }}
            />
            <label
                className="container__main__card__data--checkbox"
                htmlFor="data-accepted"
            >
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
            className="container__main__card__data--button2"
            type="button"
            onClick={datosUsuario}
            disabled={controlBoton}
            >
            Crear Usuario
            </button>
        </section>
        </div>
    </form>
    </main>
</>
);
}
