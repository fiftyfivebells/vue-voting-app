import Vue from 'vue';
import Router from 'vue-router';

// routes to different views
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Polls from '../components/Polls.vue';
import Register from '../components/Register.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/', component: Home,
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
    ],
});
