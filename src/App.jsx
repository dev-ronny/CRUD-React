import React from 'react';
import shortid from 'shortid';

function App() {

  const [tarea, setTarea] = React.useState('')
  const [tareas, setTareas] = React.useState([])
  const [modo, setModo] = React.useState(false)
  const [key, setKey] = React.useState('')
  const [error, setError] = React.useState(null)
  const agregarTarea = (e) => {
    e.preventDefault()

    if (!tarea.trim()) {

      setError("Escriba una Tarea")
      return
    }

    if (modo) {
      const edi = tareas.map(item => item.id === key ? { id: key, Tarea: tarea } : item)
      setTareas(edi)
      setModo(false)
      setKey('')
    }
    else {
      setTareas([...tareas, { id: shortid.generate(), Tarea: tarea }])
      console.log(tareas)

    }

    setTarea('')
    setError(null)
  }

  const eliminarTarea = id => {
    const filt = tareas.filter(item => item.id !== id)
    setTareas(filt)
  }

  const editar = (key, item) => {
    setModo(true)
    setTarea(item)
    setKey(key)

  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD basico</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">

            {
              tareas.length === 0 ? (
                <li className="list-group-item ">No hay Tareas</li>
              ) : (
                  tareas.map((item, index) => (
                    <li key={item.id} className="list-group-item ">
                      <span className="lead">{item.Tarea}</span>
                      <button className="btn btn-danger btn-sm float-right" onClick={() => eliminarTarea(item.id)}>Eliminar</button>
                      <button className="btn btn-warning btn-sm float-right" onClick={() => editar(item.id, item.Tarea)}>Editar</button>
                    </li>
                  ))
                )
            }

          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">{modo ? "Editar Tarea" : "Agregar Tarea"}</h4>
          <form onSubmit={agregarTarea}>
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <input value={tarea} onChange={(e) => setTarea(e.target.value)} type="text" className="form-control mb-2" placeholder="Ingrese Tarea" />
            {modo ? (<button className="btn-block btn-warning" type="submit" >Editar</button>) :
              (<button className="btn-block btn-dark" type="submit">Agregar</button>)}

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;