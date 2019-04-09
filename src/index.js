import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import WishList from './pages/Principal/paginaPrincipal';
import {usuarioAutenticado} from './services/authenticacao';
import Login from './pages/Login/login'

const Permissao = ( {component : Component}, {...rest} ) => (
    <Route
      {...rest}
      render = {props => usuarioAutenticado() ?
        //Verificando o usuario ou redirecionando 
    (<Component {...props} /> ) :
     (<Redirect to={ { pathname : "/login" } } />)
      } 
      />
);

const rotas = (
   <Router>
       <div>
           <Switch>
               <Route exact path="/" component={App} />
               <Permissao path="/paginaPrincipal" component={WishList}></Permissao>
               <Route path = "/login" component={Login}></Route>
           </Switch>
       </div>

   </Router>
   );


ReactDOM.render(rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
