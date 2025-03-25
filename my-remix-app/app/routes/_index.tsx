import {MenuNavegacion} from "../components/Menu_navegacion/Menu_navegacion";
import '../styles/index.css'
export default function Index() {
  function llamarPagina() {
    window.location.href = "./Perfil"
  }
  return (
    <>
      <MenuNavegacion />
      <section className="padre">
        <div className="container_index">
          <div className="play" onClick={llamarPagina}>
            
          </div>
          <div className="nosotros">
            <h1>Información</h1>
            <p>
              ¿Estás cansado de pasar horas buscando el destino perfecto para tu próximo viaje?
              ¿Te gustaría crear un viaje de acuerdo a tus preferencias y sin complicaciones?
              <br /><br />
            </p>
            <input 
                type="text"
                placeholder="Correo electronico" 
              />
            <button>Iniciar!</button>
          </div>
        </div>
      </section>
    </>
  );
}
