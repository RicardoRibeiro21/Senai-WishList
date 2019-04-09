import React, {Component} from 'react';

class WishList extends Component{
    constructor(){
        super();
        this.state = {
            lista : [],
            descricao: "",
        }
        this.cadastrarDesejo = this.cadastrarDesejo.bind(this);
        this.atualizaDescricao = this.atualizaDescricao.bind(this);
    }
    //Listar os desejos 
    listarDesejos(){
        fetch('http://localhost:5000/api/wish')
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
        // event.preventDefault();

        fetch('http://localhost:5000/api/Wish', 
            {
            method : 'POST',
            body : JSON.stringify({ descricao: this.state.descricao, }), 
            header : {
                "Content-Type" : "application/json"
            }}
            )
            .then(resposta => console.log(resposta))
            .then(this.cadastrarDesejo())
            .catch(erro => console.log(erro))
           }
    
    //Atualiza a descrição enquanto o evento é cadastrado
    atualizaDescricao(event){
        this.setState({descricao : event.target.value});
    }

    desejosMaisRecentes(){
            
    }
    
    //RENDERIZAÇÃO DA PÁGINA
           render(){
               return(
                <div class="header">
                <button>My Wishes</button>
                <img src="Logo.png" alt="Logo da wish"/>
                <button>Deslogar</button>
            </div>
            <section id="desejos">
                <div class="descricao">
                <form onSubmit={this.cadastrarDesejo} id="Cadastrar-desejo">
                        <input type="text" value={this.state.descricao} onChange={this.atualizaDescricao} placeholder="Insira aqui seu desejo!"/>
                        <button>Cadastrar</button>
                    </form>
                </div>
                <div class="item">
                <tbody class="grid grid-columns">
                                               {
                                                    this.state.lista.map(function(wishList){
                                                        return ( 
                                                            <tr key={wishList}>
                                                            <div><td class="campo" key={wishList.nome}>Ricardo</td></div>
                                                            <div><td class="campo" key={wishList.descricao}>Aqui está meu desejo</td></div>
                                                            <div><td class="campo" key={wishList.data}>11/12/2017</td></div>
                                                            </tr>
                                                        );
                                                    })
                                                }
                 </tbody>
                </div>
                </section>
               );
           }   
    }

export default WishList;