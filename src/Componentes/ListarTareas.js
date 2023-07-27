import {useEffect,useState} from 'react'
import {Button, Card, CardContent, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'

export default function ListarTareas() {

  const [tareas,setTareas] = useState([])
  const navigate=useNavigate()

  const cargarTareas = async() => {
    try {
      const resultado= await fetch('http://localhost:4000/tarea')
      const datos = await resultado.json()
      setTareas(datos)
      
    } catch (error) {
      console.log(error);
    }
   
  }

  const manejarEliminar = async (id)=>{

    try {
      const resultado=await fetch(`http://localhost:4000/tarea/${id}`,{
      method: "DELETE",
    })
    console.log(resultado)
    setTareas(tareas.filter(tarea => tarea.id_tarea !== id));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    cargarTareas()
  },[])
  return (
    <>
      <h1>Lista de tareas</h1>
      {tareas.map((tarea) => (
        <Card style={{
          marginBottom:".7rem",
          backgroundColor: '#1e272e'
        }}
        key={tarea.id_tarea}>
          <CardContent style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div style={{color: "white"}}>
              <Typography>{tarea.title}</Typography>
              <Typography>{tarea.descripcion}</Typography>
              <Typography>{tarea.nombre}</Typography>
              <Typography>{tarea.correo}</Typography>
            </div>
            <div>
              <Button variant='contained' color='inherit' 
              onClick={() =>navigate(`/tarea/edit/${tarea.id_tarea}`) }>Editar</Button>
              <Button variant='contained' color='warning' 
              onClick={() => manejarEliminar(tarea.id_tarea)}
              style={{margin: ".5rem"}}>Eliminar</Button>
            </div>
            
          </CardContent>
        </Card>
      ))}
    </>
  );
}
