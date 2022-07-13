import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './providers/useAuth';
import { RequireAuth } from './providers/requireAuth';
import { NavBar } from './components/NavBar/NavBar';
import { Landing } from './components/Landing/Landing';
import { LoginContainer } from './containers/LoginContainer/LoginContainer';
import { PacienteHomeContainer } from './containers/PacienteHomeContainer/PacienteHomeContainer';
import { RegistroContainer } from './containers/RegistroContainer/RegistroContainer';
import { EditarPacienteContainer } from './containers/EditarPacienteContainer/EditarPacienteContainer'
import { EditarVacunadorContainer } from './containers/EditarVacunadorContainer/EditarVacunadorContainer';
import { ReporteVacunatoriosContainer } from './containers/ReporteVacunatoriosContainer/ReporteVacunatoriosContainer';
import { ListadoVacunadoresContainer } from './containers/ListadoVacunadoresContainer/ListadoVacunadoresContainer';
import { ListadoPacientesContainer } from './containers/ListadoPacientesContainer/ListadoPacientesContainer';
import { RegistroVacunadorContainer } from './containers/RegistroVacunadorContainer/RegistroVacunadorContainer';
import { SolicitudesContainer } from './containers/SolicitarSolicitudesContainer/SolicitudesContainer'
import { ReporteVacunasContainer } from './containers/ReporteVacunasContainer/ReporteVacunasContainer';
import { ListadoTurnosDiaContainer } from './containers/ListadoTurnosDiaContainer/ListadoTurnosDiaContainer';
import { BuscarTurnoContainer } from './containers/BuscarTurnoContainer/BuscarTurnoContainer'; //Then change
import { AdminHome } from './components/ProtectedPage/AdminHome';
import { VacunadorHome } from './components/ProtectedPage/VacunadorHome';
import { MisTurnosContainer } from './containers/MisTurnosContainer/MisTurnosContainer';
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
            <Route path='/register' element={<RegistroContainer/>} />
            <Route element={<RequireAuth/>}>
              <Route path='/paciente' element={<PacienteHomeContainer/>} />
              <Route path='/editarPaciente' element={<EditarPacienteContainer/>}/>
              <Route path='/misTurnos' element={<MisTurnosContainer/>} />
              <Route path='/admin' element={<AdminHome/>}/>
              <Route path='/vacunador' element={<VacunadorHome/>}/>
              <Route path='/editarVacunador' element={<EditarVacunadorContainer/>}/>
              <Route path='/registrarVacunador' element={<RegistroVacunadorContainer/>}/>
              <Route path='/modificarNombreVacunatorio' element={<ModifNomVacun/>}/>
              <Route path='/reporteVacunatorios' element={<ReporteVacunatoriosContainer/>}/>
              <Route path='/listadoVacunadores' element={<ListadoVacunadoresContainer/>}/>
              <Route path='/listadoPacientes' element={<ListadoPacientesContainer/>}/>
              <Route path='/buscarTurno' element={<BuscarTurnoContainer/>}/>
              <Route path='/solicitudesFiebreAmarilla' element={<SolicitudesContainer/>}/>
              <Route path='/reporteVacunas' element={<ReporteVacunasContainer/>}/>
              <Route path='/listadoTurnosDia' element={<ListadoTurnosDiaContainer/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </ParallaxProvider>
  );
}

export default App;
