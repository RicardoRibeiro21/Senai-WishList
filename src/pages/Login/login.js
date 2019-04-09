import React, { Component } from 'react';
import Axios from 'axios';
import '../../assets/css/login.css';
import Logo from '../../assets/img/Logo.png';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: "",
      senha: ""
    }

  }

  
  atualizaEmail(event){
    this.setState({email: event.target.value});
  }

  atualizaSenha(event){
    this.setState({senha: event.target.value});
  }

  efetuaLogin(event) {
    event.preventDefault();

    Axios.post('http://localhost:5000/api/Account/Login', {
      email: this.state.email,
      senha: this.state.senha
    })
    //Fazendo o if de verificação em relação ao login 
    .then(data => {if (data.status === 200){
      console.log(data);

      //Aqui inserir o token e o data.data.token para armazenar as informações trazidas do token
      localStorage.setItem("usuario-wishList", data.data.token);

      this.props.history.push("/paginaPrincipal");
      
      console.log("Login feito com sucesso!");
      } else {
        alert("Email ou senha inválida");
      }
  })
    .catch(erro => {console.log(erro)
    this.setState({ erroMensagem: "Email ou senha inválida"});
    }
    );
  }

  render() {
    return (
      <div className="App">
      <section id="email">
      <img src={Logo} alt="Logo da wish List"/>
      <h1>Login</h1>
      <form onSubmit={this.efetuaLogin.bind(this)}>
        <div className="item">
        <input className="input-email-login"
        placeholder="Insira seu email"
        type="text"
        value = {this.state.email}
        onChange = {this.atualizaEmail.bind(this)}></input>
        </div>
        <div className="item">
        <input className="input-senha-login"
        type = "password"
        value = {this.state.senha}
        onChange = {this.atualizaSenha.bind(this)} 
        placeholder="Insira sua senha"></input>
        </div>
        <button className="item"        
        >Entrar</button>
        </form>
        {/* <button className="item">Cadastrar</button> */}
      </section>
      </div>
    );
  }
}

export default Login;
