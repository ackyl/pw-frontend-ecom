import React, { Component } from 'react'

class ProductItem extends Component {

    render(){
        var{name, desc, price, src} = this.props.item

        return (
            <div className="card col-4 m-5">
                <img className='card-img-top' src={src}/>
                <div className='card-body'>
                    <h5 className='card-title'>{name}</h5>
                    <p className='card-text'>{desc}</p>
                    <p className='card-text'>${price}</p>
                    <button className = "btn btn-outline-primary btn-sm">Details</button>
                    <button className = "btn btn-outline-primary btn-sm">Add To Cart</button>
                </div>
            </div>
        )
    }
}

export default ProductItem