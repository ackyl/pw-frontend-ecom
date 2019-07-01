import React, { Component } from 'react'
import axios from 'axios'

import ProductItem from './ProductItem'

class Home extends Component {

    state = {
        products: [],
        search: [],
        count: 0
    }

    componentDidMount(){
        this.getData()
    }

    sortPrice = (a,b) => {
        if ( a.price < b.price ){
            return -1;
          }
          if ( a.price > b.price ){
            return 1;
          }
          return 0;
    }

    onBtnSearch = () => {
        const name = this.name.value
        const min = this.min.value
        const max = this.max.value

        var x = this.state.products

        x = x.filter(item=>{
            if(item.name.toLowerCase().includes(name)){
                return true
            }
        })

        x = x.filter(item=>{
            if(min === ''){
                return true
            }else{
                return item.price >= min
            }
        })

        x = x.filter(item=>{
            if(max === ''){
                return true
            }else{
                return item.price <= max
            }
        })

        x.sort(this.sortPrice)
        this.setState({search: x})
    }

    getData = () => {
        axios.get('http://localhost:2019/products')
            .then(r => {
                this.setState({products: r.data})
                this.setState({search: r.data})
                //kalo make this.state.products = data,
                //datanya ga keupdate karena render duluan baru ke fungsi ini
            })
    }

    renderList = () => {
        return this.state.search.map( (item, index) => {
            return (
                <ProductItem item={item} key={index} />
            )
        })
    }

    render () {
        return (
            <div className="row">
                <div className="col">
                    <div className="mt-5">
                        <div className="mx-auto card">
                            <div className="card-body">
                                <div className="border-bottom border-secondary card-title">
                                    <h1>Search</h1>
                                </div>
                                <div className="card-title mt-1">
                                    <h4>Name</h4>
                                </div>
                                <form className="input-group"><input ref={input => this.name = input} className="form-control" type="text"/></form>
                                <div className="card-title mt-1">
                                    <h4>Price</h4>
                                </div>
                                <form className="input-group"><input placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                                <form className="input-group"><input placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                                <button onClick={this.onBtnSearch} className="btn btn-outline-secondary btn-block mt-5">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row col-10">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

export default Home