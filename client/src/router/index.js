import Vue from 'vue';
import Router from 'vue-router';

// routes to different views
import Home from '../components/Home.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/', component: Home,
        },
    ],
});
