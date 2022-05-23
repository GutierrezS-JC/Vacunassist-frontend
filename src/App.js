import logo from './logo.svg';
import './App.css';
import { useContext, createContext, useState } from 'react';
import { AuthProvider } from './providers/useAuth';
import { RequireAuth } from './providers/requireAuth';
import { NavBar } from './components/NavBar/NavBar';
import { Landing } from './components/Landing/Landing';
import { LoginContainer } from './containers/LoginContainer/LoginContainer';
import { ProtectedPage } from './components/ProtectedPage/ProtectedPage'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import { useAuth } from "./providers/useAuth"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/login' element={<LoginContainer/>} />
          <Route element={<RequireAuth/>}>
            <Route path='/protected' element={<ProtectedPage/>} />
          </Route>
          {/* <Route path='/protected' 
                element={
                  <RequireAuth>
                    <ProtectedPage />
                  </RequireAuth>
                } /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
