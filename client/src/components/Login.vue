<template>
    <div>
        <v-layout row>
            <v-flex sm6 offset-sm3>
                <v-card>
                    <v-card-title>
                        <v-container>
                            <h4>Login</h4>
                        </v-container>
                        <v-container v-if='logInError'>
                            <h5>Login Failed. Please try again.</h5>
                        </v-container>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                        v-model='username'
                                        name='username'
                                        label='Username'
                                        type='text'
                                        required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex>
                                        <v-text-field
                                        v-model='password'
                                        name='password'
                                        type='password'
                                        label='Password'
                                        required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs4 offset-xs4>
                                        <v-btn
                                        @click='logIn'
                                        block
                                        large
                                        class='mt-4 orange darken-4 white--text'
                                        type='submit'
                                        >
                                        Log In
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            logInError: false
        }
    },
    methods: {
        async logIn() {
            try {
                await this.$store.dispatch('logIn', {
                username: this.username,
                password: this.password
            });

            this.$router.push('/polls');
            } catch(err) {
                console.log(err);
                this.logInError = true;
            }
            
        }
    }
}
</script>

