import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../assets/css/paginaPrincipal.css';
import Logo from '../../assets/img/Logo.png';


class WishList extends Component{
    constructor(){
        super();
        this.state = {
            lista : [],
            descricao: "",
        }
        //this.cadastrarDesejo = this.cadastrarDesejo.bind(this);
        this.atualizaDescricao = this.atualizaDescricao.bind(this);
    }
    //Listar os desejos 
    listarDesejos(){
        fetch('http://localhost:5000/api/Wish')
        .then(resposta => resposta.json())
        .then(data => this.setState({lista: data}))
        .catch(erro => console.log(erro))
    }

    //Carregar antes de renderizar a página
    componentDidMount(){
        this.listarDesejos();
    }

    //Cadastrar os desejos 
    cadastrarDesejo(event) {
        event.preventDefault();

        const Auth = 'Bearer ' + localStorage.getItem('usuario-wishList');
        
        fetch('http://localhost:5000/api/Wish', 
            {
                method : 'POST',
                body : JSON.stringify({ descwish: this.state.descricao }), 
                headers : {
                    "Content-Type" : "application/json", 
                    "Authorization" : {Auth}          
            }}
            )
            .then(resposta => console.log(resposta))
            .then(this.listarDesejos())
            .catch(erro => console.log(erro))
           }
    
    //Atualiza a descrição enquanto o evento é cadastrado
    atualizaDescricao(event){
        this.setState({descricao : event.target.value});
    }
    
    //RENDERIZAÇÃO DA PÁGINA
           render(){
               return(
                <div>
                <div className="header">
                    <button>My Wishes</button>
                        <img src={Logo} alt="Logo da wish"/>
                     <button><Link to="/login">Deslogar</Link></button>
                </div>
                <div>
                     <section id="desejos">
                <div className="descricao">
                <form onSubmit={this.cadastrarDesejo.bind(this)} id="Cadastrar-desejo">
                        <input type="text" value={this.state.descricao} onChange={this.atualizaDescricao} placeholder="Insira aqui seu desejo!"/>
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
                    <div className="item">
                          <tbody className="grid grid-columns">
                                {
                             this.state.lista.map(function(wishList){
                                  return ( 
                                      <tr key={wishList}>
                                      <td >{wishList.nome}</td>
                                      <td >{wishList.descricao}</td>
                                      <td >{wishList.data}</td>
                                       </tr>
                                         );
                                    })
                               }
                         </tbody>
                        </div>
                </section>
                </div>
                </div>
               );
           }   
    }

export default WishList;