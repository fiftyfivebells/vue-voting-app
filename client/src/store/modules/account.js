import axios from 'axios';
const server = 'https://ffb-voting-app.herokuapp.com/api/account';

export default {
    state: {
        username: '',
        _id: '',
        token: '',
    },
    mutations: {
        createUser: (state, data) => {
            state.username = data.username;
            state.id = data._id;
        },
        addToken: (state, data) => {
            state.token = data;
        },
        logOutUser: (state) => {
            state.username = '';
            state.id = '';
            state.token = '';
        },
    },
    actions: {
        logIn: async ({commit}, data) => {
            axios.post(server + '/login', data)
            .then((res) => {
                const info = res.data;
                const header = res.headers.authorization;
                commit('createUser', info);
                commit('addToken', header);
            })
            .catch((err) => {
                console.log(err);
            });
        },
        register: ({commit}, data) => {
            axios.post(server + '/register', data)
            .then((res) => {
                commit('createUser', res.data);
                commit('addToken', res.headers.authorization);
            });
        },
        logout: ({commit}) => {
            commit('logOutUser');
        },
    },
    getters: {
        username: (state) => state.username,
        id: (state) => state._id,
        token: (state) => state.token,
        isAuth: (state) => !!state.token,
    },
};
