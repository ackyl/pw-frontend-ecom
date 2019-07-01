import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCart} from '../actions'

class ProductItem extends Component {

    cart(products){
        products.qty = this.qty.value
        this.props.addToCart(products)
    }

    render(){
        var{id, name, price, src} = this.props.item

        return (
            <div className="card col-3 m-5">
                <img className='card-img-top' src={src}/>
                <div className='card-body'>
                    <h5 className='card-title'>{name}</h5>
                    <p className='card-text'>${price}</p>
                    <input ref={input => this.qty = input} defaultValue='1'/>
                    <Link to={'/product/' + id}>
                        <button className = "btn btn-outline-primary btn-sm">Details</button>
                    </Link>
                    <button className = "btn btn-outline-primary btn-sm" onClick={()=>this.cart(this.props.item)}>Add To Cart</button>
                </div>
            </div>
        )
    }
}

export default connect('',{addToCart})(ProductItem)