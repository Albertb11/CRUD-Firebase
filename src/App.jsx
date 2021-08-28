import React from "react";
import { firebase } from "./firebase";


function App() {

  //Mostar Datos
  const [tareas, setTareas] = React.useState([])
  //Datos en el input Guardar - Editar
  const [guardar, setGuardar] = React.useState("")
  //Editar Datos
  const [editar, setEditar] = React.useState(false)
  //Mostrar error en los inputs del formulario
  const [error, setError] = React.useState(null)
  //Seleccionar el dato mediante id para editarlo 
  const [id, setId] = React.useState("")

  React.useEffect(() => {

    //Funcion para mostrar los datos en el formulario
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore()
        const data = await db.collection('Tareas').get()
        const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
        console.log(arrayData)
        setTareas(arrayData)
        
      } catch (error) {
        console.log(error)
      }
    }

    obtenerDatos()

  }, [])

  //Funcion para guardar datos del formulario
  const agregarDatos = async (e) =>{
    e.preventDefault()

    if(!guardar.trim()){
      setError("Complete el campo")
      return
    }

    try{
      const db = firebase.firestore()
      const nuevaTarea = {
        Nombre: guardar,
        Descripcion: Date.now()
      }
      const data = await db.collection('Tareas').add(nuevaTarea)
      setTareas([
        ...tareas,
        {...nuevaTarea, id: data.id}
      ])
      setGuardar('')
      setError(null)
    }

    catch(error){
      console.log(error)
    }

    console.log(guardar)
  }

  //Funcion para eliminar datos del formulario
  const eliminar = async(id) =>{
    try{
      const db = firebase.firestore()
      await db.collection('Tareas').doc(id).delete()

      const eliminarTarea = tareas.filter(item => item.id !== id)
      setTareas(eliminarTarea)
    }
    catch(error){
      console.log(error)
    }
  }

  
  const activarEdicion = (item) =>{
    setEditar(true)
    setGuardar(item.Nombre)
    setId(item.id)
  }

  //Funcion para editar los datos del Formulario
  const editarDatos = async(e) =>{
    e.preventDefault()
    if(!guardar.trim()){
      setError("Complete el campo")
      return
    }
    try{
      const db = firebase.firestore()
      await db.collection('Tareas').doc(id).update({
        Nombre : guardar
      })
      const datoEditado = tareas.map(item=> (
        item.id === id ? {id: item.id, Descripcion: item.Descripcion, Nombre: guardar} : item
      ))
      setTareas(datoEditado)      
      console.log(datoEditado)
      setEditar(false)
      setError(null)
      setGuardar('')
      setId('')
    }
    catch(error){
      console.log(error)
    }
    
  }
  

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <h1>Lista de Tareas</h1>
          <ul className="list-group">
            {
              tareas.map(item => (
                <li className="list-group-item" key={item.id}>                  
                  {item.Nombre} 
                  {item.Descripcion}

                  <button 
                    className="btn btn-danger btn-sm float-end"
                    onClick={() => eliminar(item.id)}>
                    Eliminar
                  </button>

                  <button 
                    className="btn btn-warning btn-sm float-end mr-2"
                    onClick={() => activarEdicion(item)}>
                    Editar
                  </button>
                </li>
              ))
            }
          </ul>
        </div>

        <div className="col-md-6">
          <h1>
            {
              editar ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h1>
          <form onSubmit={editar ? editarDatos : agregarDatos}>
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <input type="text" 
            placeholder="Ingrese el nombre de la tarea"
            className="form-control mb-2"
            onChange={e => setGuardar(e.target.value)}
            value={guardar}
            />

            <button
            className={
              editar ? 'btn btn-warning btn-block w-100' : 'btn btn-dark btn-block w-100'
            }
            type="submit"
            >
              
              {
                editar ? 'Editar' : 'Agregar'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;