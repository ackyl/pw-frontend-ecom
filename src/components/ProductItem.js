import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ProductItem extends Component {

    render(){
        var{id, name, price, src} = this.props.item

        return (
            <div className="card col-3 m-5">
                <img className='card-img-top' src={src}/>
                <div className='card-body'>
                    <h5 className='card-title'>{name}</h5>
                    <p className='card-text'>${price}</p>
                    <Link to={'/product/' + id}>
                        <button className = "btn btn-outline-primary btn-sm">Details</button>
                    </Link>
                    <button className = "btn btn-outline-primary btn-sm">Add To Cart</button>
                </div>
            </div>
        )
    }
}

export default ProductItem