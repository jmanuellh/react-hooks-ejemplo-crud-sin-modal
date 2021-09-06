// import React from 'react';


// class TablaNotas extends React.Component {
//     render() {
//         return (
//           <table>
//             <thead>
//               <tr>
//                   <th>Titulo</th>
//                   <th>Contenido</th>
//                   <th>Acciones</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                   <td></td>
//               </tr>
//             </tbody>
//           </table>
//         );
//     }
// }

// export default TablaNotas;

import axios from 'axios';
import React, { useState, useEffect, prevState } from 'react';

function TablaNotas() {
  const [count, setCount] = useState(0);
  const [notas, setNotas] = useState([]);
  const [nota, setNota] = useState({});


  const obtenerNotas = () => {

    axios.get("https://erpbackaspnetcore31.azurewebsites.net/api/notas").then(r => {
      setNotas(r.data);
    });
  }

  // De forma similar a componentDidMount y componentDidUpdate
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    // document.title = `You clicked ${count} times`;
    obtenerNotas();
  // }, []);
  }, [setNotas]);

  const cambioFormNota = (event) => {
    // Using spread syntax ...
    // setNota(prevState => ({nota: {...prevState.nota, [event.target.name]: event.target.value}}));
    setNota(prevState => ({...prevState, [event.target.name]: event.target.value}));
    // this.setState(nota => ({nota: {...nota, [event.target.name]: event.target.value}}));
  }


  // const componentDidMount = () => {
  //   this.obtenerNotas();
  // }

  const agregarNota = () => {
    axios.post("https://erpbackaspnetcore31.azurewebsites.net/api/notas", nota).then(() => {
      obtenerNotas();
    });
  }

  const eliminarNota = (id) => {
    axios.delete("https://erpbackaspnetcore31.azurewebsites.net/api/notas/"+id).then(() => {
      obtenerNotas();
    });
  }

  return (
    // <div>
    //   <p>You clicked {count} times</p>
    //   <button onClick={() => setCount(count + 1)}>
    //     Click me
    //   </button>
    // </div>
    <div>
      <form>
        <label htmlFor="input-titulo">Titulo</label>
        <input type="text" id="input-titulo" name="titulo" onChange={cambioFormNota} />
        <label htmlFor="input-contenido">Contenido</label>
        <input type="text" id="input-contenido" name="contenido" onChange={cambioFormNota} />
        
        <button type="button" onClick={agregarNota}>
          Enviar
        </button>
      </form>

      <table>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Contenido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {notas.map(nota => (
              <tr key={'tr-'+nota.id}>
                <td>
                  {nota.titulo}
                </td>
                <td>
                  {nota.contenido}
                </td>
                <td><button onClick={() => eliminarNota(nota.id)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
}

export default TablaNotas;