import axios from 'axios';
const server = axios.create('localhost:3000');

export default {
    state: {
        polls: [],
    },
    mutations: {
        addNewPoll: (state, data) => {
            state.polls.push(data);
        },
    },
    actions: {
        addPoll: async ({commit}, data) => {
            try {
                const obj = await server.post('http://localhost:3000/polls/add', data);
                console.log(obj);
            } catch (err) {
                console.log(err);
            }
        },
    },
    getters: {
        polls: (state) => state.polls,
    },
};
