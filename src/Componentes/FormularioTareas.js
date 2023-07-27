import {Select,MenuItem,CardContent,Card,Grid,Typography,TextField,Button,CircularProgress} 
from '@mui/material'

import {useState, useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'

export default function FormularioTareas() {

  const[tarea,setTarea]=useState({
    titulo: '',
    descripcion: '',
    IdUsuario: 1
  })

  const [loading,setLoading] = useState(false);
  const [editing,setEditing] = useState(false);

  const navigate = useNavigate();
  const parametro = useParams();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    //console.log(tarea);
    //console.log(JSON.stringify(tarea))
    setLoading(true)

    if(editing){
      //console.log('update')
      console.log(parametro.id)
      console.log(JSON.stringify(tarea))
      const resultado=await fetch(`http://localhost:4000/tarea/${parametro.id}`,{
        method: "PUT",
        body: JSON.stringify(tarea),
        headers:{"Content-Type": "application/json; charset=utf-8"},
      });
      const datos = await resultado.json();
      console.log(datos)
    }else{
        const resultado= await fetch('http://localhost:4000/tarea',{
        method: "POST",
        body: JSON.stringify(tarea),
        headers:{"Content-Type": "application/json; charset=utf-8"},
      });

      const data = await resultado.json()
      console.log(data)
    }

     setLoading(false)
     navigate('/')
  }

  const handleChange = (e) =>{
    setTarea({...tarea,[e.target.name]: e.target.value});
    //console.log(e.target.name, e.target.value);
  }

  const cargarTarea = async (id) => {
   const resultado= await fetch(`http://localhost:4000/tarea/${id}`)
   const datos = await resultado.json()
   console.log(datos)
   setTarea({titulo: datos.title, descripcion: datos.descripcion, IdUsuario: datos.id_usuario})
   setEditing(true)
  }

  useEffect(() =>{
    //console.log(parametro);
    if(parametro.id){
      cargarTarea(parametro.id);
    }
  },[parametro.id])

  return (
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3}>
        <Card sx={{mt:5}} style={{backgroundColor:'#1e272e',padding: '1rem'}}>
          <Typography variant='5' textAlign='center' color='white'>
            Crear Tarea
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField name='titulo' onChange={handleChange}
              variant='filled' label='titulo de la tarea' sx={{display: 'block', margin:'.5rem 0'}} 
              inputProps={{style: {color: "white"}}}
              InputLabelProps={{style: {color: 'white'}}}
              value={tarea.titulo}  />

              <TextField name='descripcion' onChange={handleChange}
              variant='filled' label='agrega la descripcion' 
              multiline rows={4} 
              inputProps={{style: {color: "white"}}}
              InputLabelProps={{style: {color: 'white'}}}
              value={tarea.descripcion}  />

               <Select
                variant='filled'
                label='Prioridad de la tarea'
                sx={{ display: 'block', margin: '.5rem 0' }}
                name='IdUsuario'
                value={tarea.IdUsuario}  
                onChange={handleChange}
              >
                <MenuItem value={1}>Baja</MenuItem>
                <MenuItem value={2}>Media</MenuItem>
                <MenuItem value={3}>Alta</MenuItem>
              </Select>

              <Button variant='contained' color='primary' type='submit'
              disabled={!tarea.titulo || !tarea.descripcion}>
                {loading ? <CircularProgress 
                            color='inherit'
                            size={24}
                />: 'Crear Tarea'}
              </Button>

            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
