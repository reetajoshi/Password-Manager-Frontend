import {list, update} from "@/views/home/service";
import CryptoJS from "crypto-js";

export default {
    namespaced: true,
    state: {
        fields: [
            {
                key: 'index',
                label: '#',
            },
            {
                key: 'website',
                label: 'Website',
                sortable: true
            },
            {
                key: 'username',
                label: 'User Name',
            },
            {
                key: 'email',
                label: 'Email',
            },
            {
                key: 'password',
                label: 'Password',
            },
            {
                key: 'Actions'
            }
        ],
        list: [],
        activeListIndex: undefined,
        addListModal: {
            show: false,
            title: ''
        },
        addListItemModal: {
            show: false,
            showPassword: false,
            formData: {
                website: '',
                email: '',
                username: '',
                password: '',
            },
        }
    },
    getters: {},
    actions: {
        addList({commit, state, dispatch}: any) {
            if (!state.addListModal.title) {
                return;
            }
            commit('addList', {
                name: state.addListModal.title,
                items: []
            });
            commit('setNewListTitle', '');
            dispatch('makeToast', {
                message: 'Successfully added list',
                type: 'Success'
            }, {root: true})
            dispatch('updateData')
        },
        addListItem({commit, state, dispatch}: any) {
            const {website, email, password, username} = state.addListItemModal.formData;
            const data = {
                message: '',
                type: ''
            }

            if (!website) {
                data.message = 'Website is required';
                data.type = 'Danger'
            } else if (!email) {
                data.message = 'Email is required';
                data.type = 'Danger'
            } else if (!password) {
                data.message = 'Password is required';
                data.type = 'Danger'
            } else if (!username) {
                data.message = 'Username is required';
                data.type = 'Danger'
            }

            if (data.type !== 'Danger') {
                commit('addListItem')
                data.message = 'Successfully added'
                data.type = 'Success'
            }
            dispatch('makeToast', data, {root: true})
            dispatch('updateData')
        },
        removeListItem({commit, dispatch}: any, payload: any) {
            commit('removeListItem', payload)
            dispatch('updateData')
        },
        async getData({commit, state, rootState}: any) {
            const token = rootState.auth.token;
            const {data}: any = await list(token);
            if (data && data.data) {
                const secureData = CryptoJS.AES.decrypt(data.data, rootState.auth.keychainPassword).toString(CryptoJS.enc.Utf8);
                if (secureData === '') {
                    throw new Error('Invalid Keychain Password')
                }
                commit('setList', JSON.parse(secureData))
            }
        },
        async updateData({state, rootState}: any) {
            const token = rootState.auth.token;
            const data = CryptoJS.AES.encrypt(JSON.stringify(state.list), rootState.auth.keychainPassword).toString();
            update(token, data).then();
        },
    },
    mutations: {
        setList(state: any, list: any) {
            state.list = list
        },
        addList(state: any, listItem: any) {
            state.list.push(listItem)
        },
        setActiveListIndex(state: any, index: number) {
            state.activeListIndex = index;
        },
        showAddListModal(state: any) {
            state.addListModal.show = true;
        },
        setNewListTitle(state: any, title: any) {
            state.addListModal.title = title;
        },
        showAddListItemModal(state: any) {
            state.addListItemModal.show = true;
        },
        setListItemFormData(state: any, data: any) {
            if (data.password) {
                state.addListItemModal.formData.password = data.password
            }
            if (data.website) {
                state.addListItemModal.formData.website = data.website
            }
            if (data.email) {
                state.addListItemModal.formData.email = data.email
            }
            if (data.username) {
                state.addListItemModal.formData.username = data.username
            }
            if (data.showPassword !== undefined) {
                state.addListItemModal.showPassword = data.showPassword
            }
        },
        addListItem(state: any) {
            state.list[state.activeListIndex].items.push(state.addListItemModal.formData);
            state.addListItemModal.formData = {
                website: '',
                email: '',
                username: '',
                password: '',
            }
        },
        removeListItem(state: any, index: any) {
            state.list[state.activeListIndex].items.splice(index, 1);
        }
    }
}