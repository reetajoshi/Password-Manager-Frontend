import vue from "vue";

const login = (email: string, password: string) => {
    return vue.axios.post('/user/login', {
        email, password
    })
}

const register = (fullName: string, email: string, password: string) => {
    return vue.axios.post('/user/register', {
        fullName, email, password
    })
}

export {
    login, register
}