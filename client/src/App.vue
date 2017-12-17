<template>
    <v-app id='app'>
        <v-navigation-drawer persistent v-model='drawer' clipped app class='white--text'>
            <v-list>
                <v-list-tile>
                    <router-link to='/polls'>Polls</router-link>
                </v-list-tile>
                <v-list-tile v-if='isLoggedIn'>
                    <router-link to='/my-polls'>My Polls</router-link>
                </v-list-tile>
                <v-list-tile>                    
                    <router-link to='/add-poll'>Add Poll</router-link>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar dark fixed app clipped-right class='orange darken-4'>
            <v-toolbar-side-icon @click='drawer = !drawer'></v-toolbar-side-icon>
            <v-toolbar-title>FCC Voting App</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items v-if='!this.$store.getters.isAuth'>
                <v-btn v-bind:to='login' flat>Log In</v-btn>
                <v-btn v-bind:to='register' flat>Register</v-btn>
            </v-toolbar-items>
            <v-toolbar-items v-else>
                <v-btn flat>Log Out</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <main>
            <v-container fluid>
                <v-layout>
                    <v-flex class='text-xs-center'>
                        <router-view></router-view>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>
        <v-footer class='orange darken-4 white--text'>
            <v-layout justify-space-around>
                <span>Created by fiftyfivebells</span>
                <span><a href='https://github.com/fiftyfivebells/vue-voting-app' target='_blank'>Code on Github</a></span>
            </v-layout>
        </v-footer>
    </v-app>
</template>

<script>
import router from './router/index.js';

export default {
    data() {
        return {
            drawer: false,
            right: null,
            left: null,
            login: 'login',
            register: 'register',
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuth;
        }
    }
}
</script>

<style lang="stylus">
.router-link-active {
    color: white;
}
</style>
