import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

class Cart extends Component {

    componentDidMount(){
        console.log(this.props.cart.products)
    }

    renderList = () => {
        return this.props.cart.products.map( (item, index) => {
            return (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.price}</td>
                    <td>{item.qty}</td>
                    <td><img className = 'list' src={item.src}/></td>
                    <td><button className = "btn btn-warning">Delete From Cart</button></td>
                </tr>
            )
        })
    }

    render(){
        if(this.props.cart.products.length == 0){
            return (
                <div className="row col-10">
                    <h4>Your cart is still empty.</h4>
                </div>
            )
        }else{
            return(
                <div className="container">
                <h1 className="display-4 text-center">Your Cart</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">QUANTITY</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>

                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">Total Item: {this.props.cart.products.length}</th>
                            <th scope="col">Total Price: </th>
                            <th scope="col"><button className = "btn btn-primary">Checkout</button></th>
                        </tr>
                    </thead>
                </table>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart // {id, username}
    }
}

export default connect(mapStateToProps,{})(Cart)