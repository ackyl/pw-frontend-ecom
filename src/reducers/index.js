import { combineReducers } from 'redux'

const init = {
    id: '',
    username: '',
    role: '',
    message: ''
}

const initcart = {
    products: []
}

const AuthReducer = (data = init, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                id: action.payload.id,
                username: action.payload.username,
                role: action.payload.role
            }

        case "LOGOUT_SUCCESS":
            return {
                ...data,
                id: '',
                username: '',
                role: ''
            }
    
        default:
            return data
    }
}

const CartReducer = (data = initcart, action) => {
    switch(action.type){
        case "INPUT_CART":
            return{
                ...data,
                products: [...data.products, action.payload.products]
            }
        
        case "INPUT_CART_EXISTED":
            // console.log(data.products)
            // console.log(data.products[action.payload.existed.id].qty)
            // console.log(action.payload.existed.jumlah)

            data.products[action.payload.addCount.id].qty += action.payload.addCount.qty
            
            return{
                products: [...data.products]
            }

        default:
            return data
    }
}

export default combineReducers(
    {
        auth: AuthReducer, // {id: 1, username: ''}
        cart: CartReducer
    }
)