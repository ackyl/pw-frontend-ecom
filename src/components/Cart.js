import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class Cart extends Component {

    state = {
        cart: []
    }

    totalItem = 0
    totalPrice = 0

    getData = () => {
        let id = this.props.auth.id

        axios.get(
            'http://localhost:2019/users',
            {
                params: {
                    id: 2
                }
            }).then(r => {
                this.setState({cart: r.data[0].cart})
            })
    }

    renderList = () => {
        console.log(this.state.cart)
        return this.state.cart.map( (item,index) => {
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

    renderTotal = () => {

        let totalPriceperItem = []
        this.state.cart.map(x => {
            console.log(this.totalItem)
            this.totalItem += x.qty
            totalPriceperItem.push(x.qty * x.price)
        })

        this.totalPrice = totalPriceperItem.reduce((a,b) => a+b, 0)

        return (
            <div>
                <th scope="col">Total Item: {this.totalItem}</th>
                <th scope="col">Total Price: {this.totalPrice}</th>
            </div>
            
        )
    }

    componentDidMount(){
        this.getData()
    }    

    checkout(){
        console.log(this.state.cart)
        console.log(this.totalItem)
        console.log(this.totalPrice)
    }

    render(){
        // if(this.props.cart.products.length == 0){
        //     return (
        //         <div className="row col-10">
        //             <h4>Your cart is still empty.</h4>
        //         </div>
        //     )
        // }else{

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
                            {this.renderTotal()}
                            <th scope="col"><button className = "btn btn-primary" onClick={()=>this.checkout()}>Checkout</button></th>
                        </tr>
                    </thead>
                </table>
                </div>
            )

        // }
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps,{})(Cart)