import React, { Component } from 'react'
import axios from 'axios'

class ManageProduct extends Component {

    state = {
        products: []
    }

    getData = () => {
        axios.get('http://localhost:2019/products')
            .then(r => {
                this.setState({products: r.data})
                //kalo make this.state.products = data, datanya ga keupdate karena render duluan baru ke fungsi ini
            })
    }

    addProduct = () => {
        const name = this.name.value
        const desc = this.desc.value
        const price = this.price.value
        const src = this.src.value

        axios.post('http://localhost:2019/products',{
            name,
            desc,
            price,
            src
            //kalo sama gausah di name: name, bisa name doang
        })
        .then(r => {
            this.getData()
        })
    }

    deleteProduct = (id) => {
        axios.delete('http://localhost:2019/products/' + id).then(r => this.getData())
    }

    editProduct = (id) => {
        this.state.products[id-1].name = this.editName.value
        this.state.products[id-1].desc = this.editDesc.value
        this.state.products[id-1].price = this.editPrice.value

        axios.patch('http://localhost:2019/products/' + id, {
            name : this.state.products[id-1].name,
            desc : this.state.products[id-1].desc,
            price : this.state.products[id-1].price
        }).then(r => {
            this.getData()
        })
    }

    viewEdit = (id) => {
        this.state.products[id-1].view = 1
        this.setState({products: this.state.products})
    }

    viewDefault = (id) => {
        this.state.products[id-1].view = undefined
        this.setState({products: this.state.products})
    }
    
    componentDidMount(){
        this.getData()
    }

    renderList = () => {
        return this.state.products.map( (item,index) => {
            if(item.view == undefined){
                return (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.desc}</td>
                        <td>{item.price}</td>
                        <td><img className = 'list' src={item.src}/></td>
                        <td><button className = "btn btn-primary" onClick={() => {this.viewEdit(item.id)}}>Edit</button>
                        <button className = "btn btn-warning" onClick={() => {this.deleteProduct(item.id)}}>Delete</button></td>
                    </tr>
                )
            }else{
                return(
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td><input ref={(input) => this.editName = input} defaultValue={item.name}/></td>
                        <td><input ref={(input) => this.editDesc = input} defaultValue={item.desc}></input></td>
                        <td><input  ref={(input) => this.editPrice = input}defaultValue={item.price}></input></td>
                        <td><img className = 'list' src={item.src}/></td>
                        <td><button className = "btn btn-primary" onClick={() => {this.viewDefault(item.id)}}>Cancel</button>
                        <button className = "btn btn-warning" onClick={() => this.editProduct(item.id)}>Save</button></td>
                    </tr> 
                )
            }
            
        })
    }
    
    render () {
        return (
            <div className="container">
                <h1 className="display-4 text-center">List Product</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
                <h1 className="display-4 text-center">Input Product</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.src = input} className="form-control" type="text" /></th>
                            <th scope="col"><button className="btn btn-outline-warning" onClick={this.addProduct}>Add</button></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ManageProduct