import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { LoginContainer } from './containers/LoginContainer/LoginContainer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <LoginContainer/> 
    </Router>
  );
}

export default App;
