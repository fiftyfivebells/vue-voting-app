<template>
    <div class='flex-parent'>
        <v-layout>
            <v-flex v-if='warningFlag'>
                <h3>Are you sure you want to delete this poll?</h3>
                <h4>Selected poll: {{ selected.question }}</h4>
                <div>
                    <v-btn @click='deletePoll'>Yes</v-btn>
                    <v-btn @click='warningFlag = false'>No</v-btn>
                </div>
            </v-flex>
            <v-flex v-if='!warningFlag' xs6 offset-xs3>
                <h3>My Polls</h3>
                <div v-for='(poll, idx) in polls' :key='idx'>
                    <v-divider></v-divider>
                    <div>
                        <h4 @click='setPoll(poll)'>{{ poll.question }}</h4>
                        <div>
                            <v-btn @click='prepareDelete(poll)'>Delete</v-btn>
                        </div>
                    </div>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    data() {
        return {
            polls: null,
            selected: null,
            warningFlag: false,
        }
    },
    methods: {
        async setPoll(poll) {
            await this.$store.dispatch('setPoll', poll);
            this.$router.push('/poll');
        },
        prepareDelete(poll) {
            this.selected = poll;
            this.warningFlag = true;
        },
        async deletePoll() {
            const index = this.polls.indexOf(this.selected);
            this.polls.splice(index, 1);            
            await this.$store.dispatch('deletePoll', this.selected);
        },
        showMyPolls() {
            const allPolls = this.$store.getters.polls;
            if (allPolls) {
                this.polls = allPolls.filter((poll) => {
                    return this.$store.getters.username === poll.author;
                });
            } else {
                this.$router.push('/polls');
            }    
        }
    },
    async mounted() {
        this.showMyPolls()
    }
}
</script>

<style scoped>
.flex-parent {
    height: 75vh;
    display: flex;
    align-content: flex-start;
}

.list-item {
    cursor: pointer;
}

</style>

