export default {
    namespaced: true,
    state: {
        token: '',
        _id: '',
        email: '',
        keychainPassword: '',
    },
    getters: {
        userData: (state: any) => {
            if (!state._id) {
                const authData = localStorage.getItem('auth:data')
                if (authData) {
                    return {
                        ...JSON.parse(authData),
                        storage: true
                    }
                }
            }
            return {
                _id: state._id,
                email: state.email,
                token: state.token,
                keychainPassword: state.keychainPassword,
            }
        }
    },
    actions: {
        async setUserData({commit}: any, payload: any) {
            await localStorage.setItem('auth:data', JSON.stringify(payload))
            commit('setUserData', payload)
        }
    },
    mutations: {
        setUserData(state: any, payload: any) {
            state.token = payload.token;
            state._id = payload._id;
            state.email = payload.email;
            state.keychainPassword = payload.keychainPassword;
        }
    }
}