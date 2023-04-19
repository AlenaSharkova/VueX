import {createStore} from 'vuex'
import axios from 'axios'

export default createStore({
    state: { 
        episodes: [],

        characters: []
    },

    getters: {
        EPISODES: state => {
            return state.episodes
        },
        CHARACTERS: state => {
            return state.characters
        }
    },

    mutations: {
        SET_EPISODES: (state, payload) => {
            state.episodes.push(...payload)
        },
        SET_CHARACTERS: (state, payload) => {
            state.characters = payload;
        }
    },

    actions: {
        async doUpdateEpisodes(context){
            await axios.get('https://rickandmortyapi.com/api/episode')
                .then(async (main) => {
                    context.commit('SET_EPISODES', main.data.results)
                    for (let i = 2; i <= main.data.info.pages; i++) {
                        await axios.get('https://rickandmortyapi.com/api/episode?page=' + i)
                            .then((res) => {
                                context.commit('SET_EPISODES', res.data.results)
                            })
                    }
                })
        },
        DO_CHARACTERS: async (context, arr_id_characters) => {
           try {
                let {data} = await axios.get('https://rickandmortyapi.com/api/character/'+arr_id_characters)
                
                if (data) {
                    context.commit('SET_CHARACTERS', data)
                } else {
                    alert(`Ошибка в CHARACTER`);
                }
            } catch(error) {
                console.log('error in CHARACTER')
            }
        },
    },
    modules: {}
})
