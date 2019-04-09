import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <div className="background">
      <h1>WishList - A sua lista de desejos"</h1>
      <button><Link className="Desejos" to="/paginaPrincipal">Ver Desejos</Link></button>
      <button><Link className="login" to="/login">Cadastrar/Login</Link>
        </button></div>
    );
  }
}

export default App;
