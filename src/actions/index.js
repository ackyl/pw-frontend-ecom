// Action Creator
import axios from 'axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

//ini namanya action creator

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
                const {id, username} = res.data[0]

                dispatch( //dispatch karena biar lurus, bisa return juga tapi balik lagi ke middleware untuk di cek object apa function
                    {
                        type: "LOGIN_SUCCESS",
                        payload: {
                            id,
                            username
                        }
                    }
                )

                cookie.set('userName', username, {path: '/'})
            } else {
                console.log('Username / Password incorrect')
            }
        })
    }

}

export const reLogin = (username) => {
    return (dispatch) => {
        axios.get('http://localhost:2019/users',
        {
            params: {
                username: username
            }
        }).then(x=>{
            console.log(x.data[0].id + username)
            dispatch(
                {
                    type: "LOGIN_SUCCESS",
                    payload: {
                        id: x.data[0].id,
                        username
                    }
                }
            )
        })
    }
}

export const onLogoutUser = () => {
    cookie.remove('userName')
    return {
        type: 'LOGOUT_SUCCESS'
    }
}
