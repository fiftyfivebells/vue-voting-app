import axios from 'axios';
const server = 'https://ffb-voting-app.herokuapp.com/api/polls';


export default {
    state: {
        polls: [],
        poll: {
            author: '',
            question: '',
            choices: [],
            totalVotes: 0,
        },
    },
    mutations: {
        addNewPoll: (state, data) => {
            state.polls.push(data);
        },
        getPolls: (state, data) => {
            state.polls = data;
        },
        setPoll: (state, data) => {
            state.poll.author = data.author;
            state.poll.question = data.question;
            state.poll.choices = data.choices;
            state.poll.totalVotes = data.totalVotes;
        },
    },
    actions: {
        addPoll: async ({commit}, data) => {
            try {
                await axios.post(server + '/add', data);
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
        },
        setPoll: async ({commit}, data) => {
            commit('setPoll', data);
        },
        updatePoll: async ({commit}, data) => {
            await axios.post(server + '/update', data);
        },
    },
    getters: {
        polls: (state) => state.polls,
        author: (state) => state.poll.author,
        question: (state) => state.poll.question,
        choices: (state) => state.poll.choices,
        totalVotes: (state) => state.poll.totalVotes,
    },
};
