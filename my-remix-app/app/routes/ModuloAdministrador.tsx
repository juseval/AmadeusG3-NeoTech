import { MenuNavegacionAdmin } from ".././components/Menu_navegacionAdmin/Menu_navegacion";

import ".././styles/ModuloAdministrador.css";

export default function ModuloAdministrador() {
  return (
    <div>
      <MenuNavegacionAdmin />
      <div id="contenedorModuloAdministrador">
        <div id="contendorIzquierdo">
          <div id="contenedorIzquierdoSuperior">
            <div className="totalDe">Total Admin</div>
            <div className="totalDe">Total Usuarios</div>
            <div className="totalDe">Total conectador</div>
            <div className="totalDe">Iniciar</div>
          </div>
          <div id="contenedorIzquierdoMedio">
            <div id="contenedorIzquierdoMedioIzquierdo">
              Lista administradores
            </div>
            <div id="contenedorIzquierdoMedioDerecho">
              Extra
            </div>
          </div>
          <div id="contenedorIzquierdoInferior">
            Contenedor Estadisticas
          </div>
        </div>
        <div id="contendorDerecho">
          <div id="contenedorDerechoSuperior">
            Calendario
          </div>
        </div>
      </div>
    </div>
  );
}
