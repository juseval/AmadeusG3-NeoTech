import { useEffect, useState } from 'react';
import { get } from '../services/destinoService';
import { Link, useNavigate } from '@remix-run/react';
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
  const navigate = useNavigate();
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [america, setAmerica] = useState<Destino[]>([]);
  const [europa, setEuropa] = useState<Destino[]>([]);
  const [control, setControl] = useState(true);

  useEffect(() => {
    informacionDestinos();
  }, []);

  const informacionDestinos = async () => {
    const destinoAmerica = localStorage.getItem('destinoAmerica');
    const destinoEuropa = localStorage.getItem('destinoEuropa');

    console.log('Destino América:', destinoAmerica);
    console.log('Destino Europa:', destinoEuropa);

    if (destinoAmerica === 'Bora Bora') {
      setControl(false);
    } else {
      setControl(true);
    }

    try {
      var response = await get(`city/byNames/${destinoAmerica}/${destinoEuropa}`);
      const data: Destino[] = await response.json();
      console.log('Data:', data);
      setDestinos(data);
      filtrarDestinos(data);
    } catch (error) {
      console.error('Error al obtener destinos:', error);
    }
  };

  const filtrarDestinos = (destinosFiltrar: Destino[]) => {
    setAmerica(destinosFiltrar.filter(d => d.continente === 'América'));
    setEuropa(
      destinosFiltrar.filter(
        d => d.continente === 'Europa' || d.continente === 'Asia'
      )
    );
  };

  const handleNavigate = (continent: string) => {
      console.log("Continente seleccionado:", continent);
      navigate("/Planes", { state: {continent} });
      
  };

  return (
    <>
      <MenuNavegacion/>
      <main className="conteiner">
      <h1 className="conteiner__titulo">Tus Destinos:</h1>

      {!control && (
        <h3 className="conteiner__titulo">
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
            <a onClick={() => handleNavigate('América')}>
              <img src="./paquete.png" alt="Paquete" />
            </a>
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
            <a onClick={() => handleNavigate('Europa')}>
              <img src="./paquete.png" alt="Paquete" />
            </a>
            <span className="tooltiptext">Explora tus opciones</span>
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
