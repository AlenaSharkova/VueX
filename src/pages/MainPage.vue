<template>
  <v-container class="d-flex flex-wrap">
    <LiteCard
    v-bind:key="card.id"
    v-for="card in getEpisodes"
    class="card"
        v-bind:card="card"
    />

    <router-view/>
  </v-container>
</template>

<script>
import LiteCard from '@/components/LiteCard.vue'

export default {
  components: {
    LiteCard
  },
  data: () => ({

  }),

  computed: {
    getEpisodes() {
      return this.$store.getters.EPISODES;
    }
  },
}
</script>

<style>
  .card{
    display: flex;
    justify-content: center;
  }
</style>
