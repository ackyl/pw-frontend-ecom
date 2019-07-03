import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { reLogin } from '../actions'
import cookies from 'universal-cookie'

const cookie = new cookies()

class Cart extends Component {

    state = {
        cart: [],
        show: 0
    }

    totalItem = 0
    totalPrice = 0

    getData = () => {

        axios.get(
            'http://localhost:2019/users',
            {
                params: {
                    username: cookie.get('userName')
                }
            }).then(r => {
                this.setState({cart: r.data[0].cart})
            })
    }

    format = (int) => {
        return int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    deleteFromCart = (indexItem) => {
        axios.get(
            'http://localhost:2019/users',
            {
                params: {
                    username: cookie.get('userName')
                }
                
            }).then(x => {
    
                let modify = x.data[0].cart
                modify.splice(indexItem, 1)
                console.log(modify)
                console.log(x.data[0].id)

                axios.patch('http://localhost:2019/users/' + x.data[0].id,
                {
                    cart: modify
                }).then(x=>{
                    this.getData()
                })
            })
    }

    renderList = () => {
        return this.state.cart.map( (item,index) => {

            let j = this.format(item.price)

            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>Rp. {j}</td>
                    <td>{item.qty}</td>
                    <td><img className = 'list' src={item.src}/></td>
                    <td><button className = "btn btn-warning" onClick={()=>this.deleteFromCart(index)}>Delete</button></td>
                </tr>
            )
        })
    }

    renderTotalPerItem = () => {

        let totalPriceperItem = 0
        return this.state.cart.map( (item,index) => {
            totalPriceperItem = item.qty * item.price
            
            let i = this.format(item.price)
            let j = this.format(totalPriceperItem)
            
            return(
                <tr key = {index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>Rp. {i}</td>
                    <td>Rp. {j}</td>
                </tr>
            )
        })

    }

    renderTotal = () => {
        let totalPriceperItem = []
        this.state.cart.map(x => {
            totalPriceperItem.push(x.qty * x.price)
        })

        this.totalPrice = totalPriceperItem.reduce((a,b) => a+b, 0)

        let j = this.format(this.totalPrice)

        return(
            <tr>
                <td colSpan="4">Total </td>
                <td>Rp. {j}</td>
            </tr>
        )
    }

    componentDidMount(){
        this.getData()
    }    

    show(){
        console.log(this.props.auth.id)
        this.setState({show: 1})
    }

    checkout(){
        if(this.state.show == 1){
            console.log('checked!')
        return(    
            <div>
                <h4 className="display-4 text-center">Total Payment</h4>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">QUANTITY</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTotalPerItem()}
                        {this.renderTotal()}
                    </tbody>
                </table>
            </div>
        )}
        
    }

    firstRender(){

        if(this.state.cart.length !== 0){
            return(
                <div>
                    <h4 className="display-4 text-center">Your Cart</h4>
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
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
                        
                    <button className = "btn btn-primary" onClick={()=>this.show()}>Checkout</button>
                </div>
            )
        }else{
            return(
                <div>
                    <h4 className="display-4 text-center">Your Cart is Still Empty.</h4>
                </div>
            )
        }
    }

    render(){
            return(
                <div className="container">
                    {this.firstRender()}
                    {this.checkout()}
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

export default connect(mapStateToProps,{reLogin})(Cart)