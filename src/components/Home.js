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

    onBtnSearch = () => {
        const name = this.name.value
        const min = this.min.value
        const max = this.max.value

        var x = this.state.products

        x = x.filter(item=>{
            if(item.name.toLowerCase().includes(name)){
                console.log('zzz')
                return true
            }
            else if(item.name === ''){
                console.log('aa')
                return true                
            }
        })

        x = x.filter(item=>{
            if(min === ''){
                return true
            }else{
                console.log('test')
                return item.price >= min
            }
        })

        x = x.filter(item=>{
            if(max === ''){
                return true
            }else{
                console.log('test')
                return item.price <= max
            }
        })

        this.setState({search: x})

        // x = x.filter(item=>{
        //     if(item.price < max){
        //         console.log('c')
        //         return true
        //     }else if(item.min === ''){
        //         console.log('d')
        //         return true
        //     }
        // })

        // x = x.filter(item=>{
        //     if(item.price < max)
        //         return true
        // })

        console.log('min: ' + min)
        console.log('max: ' + max)

        console.log(x)

        // if(name != null){
        //     var arr = this.state.products.filter(item=>{
        //         if(item.name.toLowerCase().includes(name))
        //             return true
        //     })
        // }else if(min != null){
        //     var arr = arr.filter(item=>{
        //         if(item.price > min)
        //             return true
        //     })
        // }else if(max != null){
        //     var arr = arr.filter(item=>{
        //         if(item.price < max)
        //             return true
        //     })
        // }

        // this.setState({search: arr})

        // if(name === '' && min === '' && max === '')
        //     this.setState({count: 0, search: []})

        // if(this.state.search.length == 0)
        // this.setState({count: 1})

        // console.log(this.state.count)
        // console.log(arr)

    }

    getData = () => {
        axios.get('http://localhost:2019/products')
            .then(r => {
                this.setState({products: r.data})
                this.setState({search: r.data})
                //kalo make this.state.products = data, datanya ga keupdate karena render duluan baru ke fungsi ini
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