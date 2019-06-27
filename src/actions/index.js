// Action Creator
import axios from 'axios'

export const onLoginUser = (user, pass) => {
    return (dispatch) => { // dispatch adalah function dari middleware kalo ini return function
        axios.get(
            'http://localhost:2019/users',
            {
                params: {
                    username: user,
                    password: pass
                }
            }
        ).then(res => {
            // res.data = [], jumlah isi array menggunakan length
            if(res.data.length > 0){
                dispatch( //dispatch karena biar lurus, bisa return juga tapi balik lagi
                    {
                        type: "LOGIN_SUCCESS",
                        payload: {
                            id: res.data[0].id,
                            username: res.data[0].username
                        }
                    }
                )
            } else {
                console.log('Username / Password incorrect')
            }
        })
    }

}

export const onLogoutUser = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}
