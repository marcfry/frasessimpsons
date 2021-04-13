import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Frase from "./components/Frase";
import { useState, useEffect } from "react";
import Spinner from "./components/Spinner";

function App() {
  //creo el State
  const [personaje, setPersonaje] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    //logica a ejecutar
    consultarApi();
  }, []);

  const consultarApi = async () => {
    setCargando(true);
    const respuesta = await fetch(
      "https://thesimpsonsquoteapi.glitch.me/quotes"
    );
    const resultado = await respuesta.json();
    console.log(respuesta);
    console.log(resultado[0]);

    setTimeout(()=>{
//guardar objeto dentro del state
    setPersonaje(resultado[0]);
    setCargando(false);
    },2500)
   
  };
  //operador ternario (condicion) ? (lo que quiero hacer si la condición es verdadera) : (lo que quiero hacer si la condicion es falsa)
  const mostrarComponente =
    cargando === true ? <Spinner /> : <Frase personaje={personaje} />;

  return (
    <section className="container text-center my-5">
      <article className="d-flex flex-column align-items-center">
        <img
          src={process.env.PUBLIC_URL + "logo.png"}
          alt="logo de los simpsons"
          className="w-75"
        />
        <Button
          variant="warning"
          className="my-5"
          onClick={() => consultarApi()}
        >
          Obtener frase
        </Button>
      </article>
      {mostrarComponente}
    </section>
  );
}

export default App;
