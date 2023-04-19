<template>
  <v-app>
    <v-container class="d-flex flex-wrap">
      <a class="main-link" href="/">
        <h1 class="mr-auto">Rick & Morty API</h1>
      </a>
    </v-container>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({

  }),

  created() {
    this.$store.dispatch('doUpdateEpisodes')
  }

};
</script>

<style>
 .main-link{
   text-decoration: none;
   color: #121212;
   padding-left: 10px;
   transition: color 0.2s;
 }
 .main-link:hover{
   color: #919090;
 }
</style>
