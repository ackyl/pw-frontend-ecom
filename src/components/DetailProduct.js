import React, { Component } from 'react'
import axios from 'axios'

class DetailProduct extends Component {

    state = {
        product: []
    }

    componentDidMount(){
        let id = this.props.match.params.product_id
        axios.get(
            'http://localhost:2019/products/' + id
        ).then(x => {
            console.log(x.data)
            this.setState({product: x.data})
        })
    }

    render(){

        var{id, name, desc, price, src} = this.state.product
        
        return (
            <div className="card col-3 m-5">
                <img className='card-img-top' src={src}/>
                <div className='card-body'>
                    <h5 className='card-title'>{name}</h5>
                    <p className='card-title'>{desc}</p>
                    <p className='card-text'>${price}</p>
                    <button className = "btn btn-outline-primary btn-sm">Add To Cart</button>
                </div>
            </div>
        )
    }
}

export default DetailProduct