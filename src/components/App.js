import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Header from './Header'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import ManageProduct from './ManageProduct'

// localhost:3000/register

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={Home}/> {/* equal, ===  */}
                    <Route path="/register" component={Register}/> {/* include() */}
                    <Route path="/login" component={Login}/> {/* include() */}
                    <Route path="/manageproduct" component={ManageProduct}/> {/* include() */}
                </div>
            </BrowserRouter>
        )
    }
}


export default App