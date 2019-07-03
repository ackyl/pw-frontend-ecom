import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCart, addToCartExisted} from '../actions'
import axios from 'axios'

class ProductItem extends Component {

    addToCart(products){
        
        let qty = parseInt(this.qty.value)
        products.qty = qty
        let id = this.props.auth.id

        axios.get(
            'http://localhost:2019/users',
            {
                params: {
                    id: id
                }
                
            }).then(x => {
                
                let find = 0

                if(x.data[0].cart != null){
                    let existProducts = []
                    existProducts = x.data[0].cart

                    existProducts.map(exist => {
                        if(exist.id == products.id){
                            exist.qty += products.qty
                            find = 1
                        }
                    })

                    axios.patch('http://localhost:2019/users/' + id, 
                    {   
                        cart: existProducts
                    })
                }

                //bikin item baru di cart karena belom ada yang di taro
                
                if(find == 0){
                    let newProducts = []

                    //check apakah cart kosong apa udah ada isinya
                    if(x.data[0].cart != null){
                        newProducts = x.data[0].cart
                    }

                    newProducts.push(products)

                    axios.patch('http://localhost:2019/users/' + id, 
                    {   
                        cart: newProducts
                    })
                }
            })
    }


    render(){
        var{id, name, price, src} = this.props.item

        console.log(this.props.auth.id)

        if(this.props.auth.id != ''){
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
                        <button className = "btn btn-outline-primary btn-sm" onClick={()=>this.addToCart(this.props.item)}>Add To Cart</button>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="card col-3 m-5">
                    <img className='card-img-top' src={src}/>
                    <div className='card-body'>
                        <h5 className='card-title'>{name}</h5>
                        <p className='card-text'>${price}</p>
                    </div>
                </div>
            )
        }   
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        auth: state.auth
    }
}

export default connect(mapStateToProps,{addToCart, addToCartExisted})(ProductItem)