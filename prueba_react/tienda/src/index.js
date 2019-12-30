import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Login from './Login.jsx';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './Home.jsx';
import Carrito from './Carrito.jsx';

//ReactDOM.render(<Login />, document.getElementById('root'));

ReactDOM.render(
        <BrowserRouter>
                <div>
                        <Route path="/" component={Login}/>
                        <Route path="/home" component={Home}/>
			<Route path="/carrito" component={Carrito}/>
                </div>
        </BrowserRouter>,
        document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
