import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './providers/useAuth';
import { RequireAuth } from './providers/requireAuth';
import { NavBar } from './components/NavBar/NavBar';
import { Landing } from './components/Landing/Landing';
import { LoginContainer } from './containers/LoginContainer/LoginContainer';
import { ProtectedPage } from './components/ProtectedPage/ProtectedPage'
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
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </ParallaxProvider>
  );
}

export default App;
