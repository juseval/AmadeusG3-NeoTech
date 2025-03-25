import { useEffect, useState } from 'react';
import { getDestinity } from '../services/destinoService';
import { Link } from '@remix-run/react';
import { MenuNavegacion } from "../components/Menu_navegacion/Menu_navegacion";
import '../styles/Destino.css'

interface Destino {
  nombreDestino: string;
  img: string;
  pais: string;
  idioma: string;
  lugarImperdible: string;
  comidaTipica: string;
  continente: string;
}

export default function Destino() {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [america, setAmerica] = useState<Destino[]>([]);
  const [europa, setEuropa] = useState<Destino[]>([]);
  const [control, setControl] = useState(true);

  useEffect(() => {
    const fetchDestinos = async () => {
      const destinoAmerica = sessionStorage.getItem('destinoAmerica');
      const destinoEuropa = sessionStorage.getItem('destinoEuropa');

      if (destinoAmerica === 'Bora Bora') {
        setControl(false);
      } else {
        setControl(true);
      }

      try {
        const response = await getDestinity(
          `searchName/${destinoAmerica}/${destinoEuropa}`
        );
        setDestinos(response);
        filtrarDestinos(response);
      } catch (error) {
        console.error('Error al obtener destinos:', error);
      }
    };

    fetchDestinos();
  }, []);

  const filtrarDestinos = (destinosFiltrar: Destino[]) => {
    setAmerica(destinosFiltrar.filter(d => d.continente === 'América'));
    setEuropa(
      destinosFiltrar.filter(
        d => d.continente === 'Europa' || d.continente === 'Asia'
      )
    );
  };

  return (
    <>
      <MenuNavegacion/>
      <main className="conteiner_destino">
      <h1 className="conteiner__titulo__destino">Tus Destinos:</h1>

      {!control && (
        <h3 className="conteiner__titulo__destino">
          Tus Gustos son bastante exóticos, te sugerimos los siguientes lugares:
        </h3>
      )}

      <div className="conteiner--opciones">
        {/* Destino América */}
        <section className="opciones--opcion">
          <div className="opcion__encabezado">
            <h2 className="opcion__encabezado__nombre">Aventura en América</h2>
          </div>

          <div className="opcion__destino">
            <input
              value={america[0]?.nombreDestino || ''}
              className="opcion__encabezado__destino focus-in-expand"
              type="text"
              readOnly
              id="destinoAmerica"
            />
          </div>

          <div className="opcion__imagen">
            <img
              src={america[0]?.img}
              alt="Destino en América"
              id="imagenAmerica"
            />
            <div className="overlay">
              <div className="text">
                <p>País:</p>
                <input className="text__input" type="text" readOnly value={america[0]?.pais || ''} />
                <p>Idioma:</p>
                <input className="text__input" type="text" readOnly value={america[0]?.idioma || ''} />
                <p>Lugar Imperdible:</p>
                <input className="text__input" type="text" readOnly value={america[0]?.lugarImperdible || ''} />
                <p>Comida típica:</p>
                <input className="text__input" type="text" readOnly value={america[0]?.comidaTipica || ''} />
              </div>
            </div>
          </div>

          <div className="opcion__link__item">
            <Link to="/Planes">
              <img src="./paquete.png" alt="Paquete" />
            </Link>
            <span className="tooltiptext">Explora tus opciones</span>
          </div>
        </section>

        {/* Destino Europa / Asia */}
        <section className="opciones--opcion">
          <div className="opcion__encabezado">
            <h2 className="opcion__encabezado__nombre">
              Aventura en{' '}
              {europa[0]?.continente === 'Europa' ? 'Europa' : 'Asia'}
            </h2>
          </div>

          <div className="opcion__destino">
            <input
              value={europa[0]?.nombreDestino || ''}
              className="opcion__encabezado__destino focus-in-expand"
              type="text"
              readOnly
              id="destinoEuropa"
            />
          </div>

          <div className="opcion__imagen">
            <img
              src={europa[0]?.img}
              alt="Destino en Europa o Asia"
              id="imagenEuropa"
            />
            <div className="overlay">
              <div className="text">
                <p>País:</p>
                <input className="text__input" type="text" readOnly value={europa[0]?.pais || ''} />
                <p>Idioma:</p>
                <input className="text__input" type="text" readOnly value={europa[0]?.idioma || ''} />
                <p>Lugar Imperdible:</p>
                <input className="text__input" type="text" readOnly value={europa[0]?.lugarImperdible || ''} />
                <p>Comida típica:</p>
                <input className="text__input" type="text" readOnly value={europa[0]?.comidaTipica || ''} />
              </div>
            </div>
          </div>

          <div className="opcion__link__item">
            <Link to="/Planes">
              <img src="./paquete.png" alt="Paquete" />
            </Link>
            <span className="tooltiptext">Explora tus opciones</span>
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
