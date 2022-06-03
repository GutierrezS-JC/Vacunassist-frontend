import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './providers/useAuth';
import { RequireAuth } from './providers/requireAuth';
import { NavBar } from './components/NavBar/NavBar';
import { Landing } from './components/Landing/Landing';
import { LoginContainer } from './containers/LoginContainer/LoginContainer';
import { ProtectedPage } from './components/ProtectedPage/ProtectedPage'
import { RegistroVacunador } from './components/RegistroVacunador/RegistroVacunador';
import { EditarVacunador } from './components/EditarVacunador/EditarVacunador';
import { ReporteVacunatorios } from './components/ReporteVacunatorios/ReporteVacunatorios';
import { ListadoVacunadores } from './components/ListadoVacunadores/ListadoVacunadores';
import { AdminHome } from './components/ProtectedPage/AdminHome';
import { VacunadorHome } from './components/ProtectedPage/VacunadorHome';
import { MisTurnos } from './components/ProtectedPage/MisTurnos';
import { ModifNomVacun } from './components/ModifNomVaunat/ModifNomVacun';
import { ParallaxProvider } from 'react-scroll-parallax';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

function App() {
  return (
    <ParallaxProvider>
      <Router>
        <AuthProvider>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/login' element={<LoginContainer/>} />
            <Route element={<RequireAuth/>}>
              <Route path='/protected' element={<ProtectedPage/>} />
              <Route path='/misTurnos' element={<MisTurnos/>} />
              <Route path='/admin' element={<AdminHome/>}/>
              <Route path='/vacunador' element={<VacunadorHome/>}/>
              <Route path='/editarVacunador' element={<EditarVacunador/>}/>
              <Route path='/registrarVacunador' element={<RegistroVacunador/>}/>
              <Route path='/modificarNombreVacunatorio' element={<ModifNomVacun/>}/>
              <Route path='/reporteVacunatorios' element={<ReporteVacunatorios/>}/>
              <Route path='/listadoVacunadores' element={<ListadoVacunadores/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </ParallaxProvider>
  );
}

export default App;
