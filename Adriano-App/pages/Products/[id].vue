<template>
    <v-container>
        <h1>Product {{ id }}</h1>
    </v-container>
</template>

<script setup>



definePageMeta({
    layout: 'shop-layout'
})

const { id } = useRoute().params


</script>



<style lang="css" scoped>
    body{
        font-size:10vw
    }
</style>