import Vue from 'vue';
import Router from 'vue-router';

// routes to different views
import Login from '../components/Login.vue';
import Polls from '../components/Polls.vue';
import Register from '../components/Register.vue';
import addPoll from '../components/addPoll.vue';
import Poll from '../components/Poll.vue';
import myPolls from '../components/myPolls.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/', component: Polls,
        },
        {
            path: '/login', component: Login,
        },
        {
            path: '/register', component: Register,
        },
        {
            path: '/polls', component: Polls,
        },
        {
            path: '/poll', component: Poll,
        },
        {
            path: '/add-poll', component: addPoll,
        },
        {
            path: '/my-polls', component: myPolls,
        },
    ],
});
