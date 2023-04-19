<template>
    <v-container
        v-if="isExist">
        <v-container>
            <v-card
                class="mx-auto"
                max-width="604"
                height="500"
                outlined
            >
                <v-card-title class="text-h5 mb-1">
                    {{ single_episode.name }}
                </v-card-title>
                <v-card-subtitle>
                    {{ single_episode.episode }}
                </v-card-subtitle>
                <v-container class="d-flex justify-space-between mt-10">
                    <v-card-text>{{ single_episode.air_date }}</v-card-text>
                    <div class="d-flex justify-end">
                        <v-card-text class="numb_text">Number of characters: {{ characters_count }}</v-card-text>
                        <v-btn
                            @click='toggle = !toggle'
                            class="mx-2"
                            fab
                            icon
                            dark
                        >
                            <v-icon>
                            mdi-plus
                            </v-icon>
                        </v-btn>
                    </div>
                    <v-list class="pop-up-window overflow-auto "
                            v-show='toggle'
                    >
                        <v-list-item
                            v-for="(character, index) in arr_characters"
                            :key='index'
                            v-bind:character="character"
                        >
                            <v-list-item-title>{{ character.name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-container>
            </v-card>
        </v-container>
        <v-container class="mt-20">
            <v-sheet
                class="mx-auto"
                max-width="2200"
            >
                <v-slide-group>
                    <LiteCard
                        v-for="card in random_arr_episodes"
                        v-bind:key="card.id"
                        v-bind:card="card"
                    />
                </v-slide-group>
            </v-sheet>
        </v-container>
    </v-container>
    <v-container  v-if="!isExist">
        The episode does not exist. Please check the URL
    </v-container>
</template>
<script>
import LiteCard from '@/components/LiteCard.vue'
    export default {
        components: {
            LiteCard
        },

        data(){
            return{
                src: null,
                isExist: false,
                toggle: false,
                single_episode: [],
                characters_count: null,
                random_arr_episodes: [],
                arr_characters: [],
            }
        },
        created() {
            this.src = this.$route.params.id;
        },
        watch: {
          "$route": "getEpisode"
        },
        methods: {

            async getEpisode() {
                let arr_episodes = this.$store.state.episodes
                this.isExist = !!arr_episodes[this.src]
                let episode = arr_episodes.find((item) => item.id === parseInt(this.$route.params.id));
                if (episode !== undefined){
                this.single_episode = episode;
                await this.getCharacters()
                await this.randomEpisodes();
                } else {
                this.single_episode = undefined;
                }

            },
            async randomEpisodes() {
                let episodes = this.$store.state.episodes;
                let random_numbers = []
                this.random_arr_episodes.length = 0
                if (episodes !== undefined) {
                  while (random_numbers.length < 6) {
                    let random = Math.floor(Math.random() * episodes.length) + 1;
                    if (!random_numbers.includes(random)) {
                      random_numbers.push(random)
                      this.random_arr_episodes.push(episodes[random])
                    }
                  }
                }
            },
            async getCharacters() {
                this.characters_count = this.single_episode.characters.length;
                let arr_id = []
                for (let id in this.single_episode.characters) {
                    let url = this.single_episode.characters[id]
                    let id_characters = url.substr(url.lastIndexOf('/')+1);
                    arr_id.push(id_characters)
                }
                await this.$store.dispatch('DO_CHARACTERS', arr_id)
                this.arr_characters = this.$store.getters.CHARACTERS
            },
        },
        mounted() {
            this.getEpisode()
        }
    }


</script>

<style>
.pop-up-window {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 300px
}
</style>
