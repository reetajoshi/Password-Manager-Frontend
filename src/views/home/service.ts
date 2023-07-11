import vue from "vue";

const list = (token: string) => {
    return vue.axios.get('/user/data/list', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const update = (token: string, data: string) => {
    return vue.axios.post('/user/data/update', {
        data,
        name: 'PASSWORD'
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export {
    list,
    update
}