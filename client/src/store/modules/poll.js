import axios from 'axios';
const server = 'https://ffb-voting-app.herokuapp.com/api/polls';


export default {
    state: {
        polls: [],
    },
    mutations: {
        addNewPoll: (state, data) => {
            state.polls.push(data);
        },
        getPolls: (state, data) => {
            state.polls = data;
        }
    },
    actions: {
        addPoll: async ({commit}, data) => {
            try {
                const obj = await axios.post(server + '/add', data);
                console.log(obj);
            } catch (err) {
                console.log(err);
            }
        },
        getAllPolls: async ({commit}, data) => {
            try {
                const polls = await axios.get(server + '/', data);
                console.log(polls);
                commit('getPolls', polls.data);
            } catch (err) {
                console.log(err);
            }
        }
    },
    getters: {
        polls: (state) => state.polls,
    },
};
