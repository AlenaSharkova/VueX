<template>
    <v-col>
        <v-card
            width="250"
            height="120">
                <v-card-text> {{card.name}} </v-card-text>
                <v-card-actions class="btn-detailed"> 
                    <v-btn
                        color="#02932e"
                        text
                    >
                        <router-link 
                            style="text-decoration: none; color: inherit;"
                            :to="'/episode/' + card.id">
                            More detailed
                        </router-link>
                    </v-btn>
                </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
    export default {
        name: 'LiteCard',
        props: ['card'],
        
    }
</script>

<style>
    .btn-detailed {
        position: absolute;
        bottom: 5px;
    }
</style>