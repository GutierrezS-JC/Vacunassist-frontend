import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import {Login } from './components/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
   
      <Login/> 
    </Router>
  );
}

export default App;
