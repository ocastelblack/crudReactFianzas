import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ListarTareas from './Componentes/ListarTareas'
import FormularioTareas from './Componentes/FormularioTareas';
import {Container} from '@mui/material';
import Menu from './Componentes/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <Menu/>
      <Container>
        <Routes>
          <Route path='/' element={<ListarTareas/>}/>
          <Route path='/tarea/nueva' element={<FormularioTareas/>}/>
          <Route path='/tarea/edit/:id' element={<FormularioTareas/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

