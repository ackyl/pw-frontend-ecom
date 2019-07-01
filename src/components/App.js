import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import cookies from 'universal-cookie'
import {connect} from 'react-redux'

import Header from './Header'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import ManageProduct from './ManageProduct'
import DetailProduct from './DetailProduct'
import Cart from './Cart'
import { reLogin } from '../actions'

const cookie = new cookies()

class App extends Component {

    componentDidMount(){
        const userCookie = cookie.get('userName')

        if(userCookie !== undefined){
            //Login ulang
            this.props.reLogin(userCookie)
        }
    } 

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={Home}/> {/* equal, ===  */}
                    <Route path="/register" component={Register}/> {/* include() */}
                    <Route path="/login" component={Login}/> {/* include() */}
                    <Route path="/manageproduct" component={ManageProduct}/> {/* include() */}
                    <Route path="/product/:product_id" component={DetailProduct}/>
                    <Route path="/cart" component={Cart}/>
                </div>
            </BrowserRouter>
        )
    }
}


export default connect ('',{reLogin})(App)