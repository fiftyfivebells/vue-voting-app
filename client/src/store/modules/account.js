import axios from 'axios';
const server = axios.create('localhost:3000');

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
    },
    actions: {
        logIn: async ({commit}, data) => {
            try {
                const obj = await server.post('/account/login', data);
                console.log(obj);
            } catch (err) {
                console.log(err);
            }

        },
        register: async ({commit}, data) => {
            const obj = await server.post('/account/register', data);
            console.log(obj);
        },
    },
    getters: {
        username: (state) => state.username,
        id: (state) => state._id,
        token: (state) => state.token,
        isAuth: (state) => !!state.token,
    },
};
