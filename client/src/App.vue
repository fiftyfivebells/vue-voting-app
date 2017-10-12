<template>
    <v-app id='app'>
        <v-navigation-drawer persistent v-model='drawer' clipped app class='white--text'>
            <v-list dense>
                <v-list-tile @click.stop='left = !left'>
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Open drawer</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar dark fixed app clipped-right class='orange darken-4'>
            <v-toolbar-side-icon @click.stop='drawer = !drawer'></v-toolbar-side-icon>
            <v-toolbar-title>FCC Voting App</v-toolbar-title>
            <v-spacer></v-spacer>
            <div @click.stop='drawerRight = !drawerRight'>Sign Up/Log-in</div>
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
                <span>Code on Github</span>
            </v-layout>
        </v-footer>
    </v-app>
</template>

<script>

export default {
    data() {
        return {
            drawer: false,
            right: null,
            left: null
        }
    }
}
</script>

<style lang="stylus">
@require '../node_modules/vuetify/src/stylus/settings/_colors.styl';

$theme := {
    primary: #009688
    accent: #FFC107
    secondary: #00796B
    info: #B2DFDB
    warning: $red.base
    error: $red.base
    success: $green.base
};

@require '../node_modules/vuetify/src/stylus/main.styl';
</style>
