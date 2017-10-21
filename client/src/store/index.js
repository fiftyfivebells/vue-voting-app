import Vue from 'vue';
import Vuex from 'vuex';

// import modules
import Acct from './modules/account';
import Polls from './modules/poll';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    getters: {

    },
    modules: {
        Acct,
        Polls,
    },
});
