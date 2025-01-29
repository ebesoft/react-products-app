import axios from 'axios'
// TODO: conectar mediante envs vars, Android e IOS.

const productsApi = axios.create({
    baseURL: 'http://localhost:3000/api'
})

// TODO: implementar o interceptor de erros

export { productsApi }


