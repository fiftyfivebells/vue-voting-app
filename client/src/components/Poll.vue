<template>
    <div class='flex-parent'>
        <v-layout>
            <v-flex xs6 offset-xs3>
                <h3>{{ title }}</h3>
                <h5>Created by {{ author }}</h5>
                <div v-for='(option, idx) in choices' :key='idx' class='choice-row'>
                    <v-btn @click='vote(option.choice)'>{{ option.choice }}</v-btn>
                </div>
                <v-flex xs6 offset-xs3>
                    <Doughnut :chart-data='datacollection'></doughnut>
                </v-flex>
                    <h6 v-if='voted'>You can't vote more than once on the same poll!</h6>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import Doughnut from './doughnut.js';

export default {
    components: {Doughnut},
    data() {
        return {
            author: '',
            title: '',
            choices: [],
            totalVotes: 0,
            datacollection: null,
            voters: [],
            voted: false
        }
    },
    methods: {
        vote(option) {
            if (!this.$store.getters.isAuth) {
                this.$router.push('/login');
            } else {
                const user = this.$store.getters.username;

                if (!this.voters.includes(user)) {
                    this.choices.map((choice) => {
                        return choice.choice === option ? choice.votes++ : choice;
                    });
                    this.totalVotes++;
                    this.voters.push(user);
                    this.populateChart();

                    const updatedData = {
                        question: this.title,
                        choices: this.choices,
                        totalVotes: this.totalVotes,
                        voters: this.voters,
                    }

                    this.$store.dispatch('updatePoll', updatedData);
                } else {
                    this.voted = true;
                }
            }
        },
        populateChart() {
            this.datacollection = {
                labels: this.addChoices(),
                datasets: [
                    {
                        label: 'Votes',
                        backgroundColor: [
                            'Red',
                            'Orange',
                            'Yellow',
                            'Green',
                            'Blue',
                            'Indigo',
                            'Violet',
                        ],
                        data: this.getVotes()
                    }
                ]
            }
        },
        addChoices() {
        let values = [];
        this.choices.map((choice) => {
            values.push(choice.choice);
        });
        return values;
    },
        getVotes() {
            let votes = [];
            this.choices.map((choice) => {
                votes.push(choice.votes);
            })
            return votes;
        },
    },
    mounted() {
        this.author = this.$store.getters.author;
        this.title = this.$store.getters.question;
        this.choices = this.$store.getters.choices;
        this.totalVotes = this.$store.getters.totalVotes;
        this.populateChart();
    },
}
</script>

<style scoped>
.choice-row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
}

</style>

