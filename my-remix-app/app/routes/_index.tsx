import { useState } from "react";
import { MenuNavegacion } from "../components/Menu_navegacion/Menu_navegacion";
import { useNavigate } from "@remix-run/react";
import "../styles/index.css";
import datos from "../data/usuarios.json";
export default function Index() {
  const navigate = useNavigate();
  const [valorInput, setvalorInput] = useState("");

  const manejarInput = (e) => {
    setvalorInput(e.target.value);
  };

  const comprobarAdmin = () => {
    let bandera = true;

    if (valorInput === "") {
      alert("Debes llenar el campo de correo");
      return
    }

    datos.usuarios.forEach(usuario => {
      if (valorInput === usuario.correo) {
        const contrasena = prompt('Digita tu contraseña: ');
        
        if (contrasena === usuario.contrasena) {
          window.location.href = "./ModuloAdministrador"
        }else{
          alert('No es correcto');
        }
        
        bandera = false;
        return
      }
    });

    if (bandera) {
      navigate(`/perfil?correo=${encodeURIComponent(valorInput)}`);
      return
    }
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
              ¿Estás cansado de pasar horas buscando el destino perfecto para tu
              próximo viaje? ¿Te gustaría crear un viaje de acuerdo a tus
              preferencias y sin complicaciones?
              <br />
              <br />
            </p>

            <input
              type="text"
              placeholder="Correo electronico"
              value={valorInput}
              onChange={(e) => manejarInput(e)}
            />
            <button onClick={comprobarAdmin}>
              <div className="svg-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
              <span>Iniciar</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
