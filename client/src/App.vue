<template>
    <v-app>
        <TabBar />
        <!-- <NavBar /> -->
        <v-main>
            <router-view />
        </v-main>
        <!-- <BottomBar /> -->
    </v-app>
</template>

<script setup lang="ts">
// import NavBar from './components/NavBar.vue'
import TabBar from './components/TabBar.vue'
// import BottomBar from '../components/BottomBar.vue'

</script>

<style>
* {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
