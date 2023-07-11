import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep';
import forOwn from 'lodash/forOwn';
import camelCase from 'lodash/camelCase'
import app from '@/main';

import home from '../views/home/home.store'
import auth from '../views/authentication/auth.store'

Vue.use(Vuex)

const modules: any = {
    home,
    auth
};

export default new Vuex.Store({
    modules: cloneDeep(modules),
    mutations: {
        resetState(state: any) {
            forOwn(modules, (value: any, key: any) => {
                state[key] = cloneDeep(value.state);
            });
        },
    },
    actions: {
        makeToast(context: any, payload: any) {
            app.$bvToast.toast(payload.message, {
                title: payload.type || "Alert",
                autoHideDelay: 5000,
                solid: true,
                variant: (payload.type || 'info').toLowerCase(),
                toaster: 'b-toaster-bottom-right',
                appendToast: false
            })
        }
    }
})
