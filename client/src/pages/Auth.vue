<template>
  <v-container class="h-100">
    <v-row class="h-100" justify="center" align="center">
        <v-sheet border class="d-flex justify-center align-center" width="200" height="200">
            <v-progress-circular color="primary" indeterminate :size="76"></v-progress-circular>
        </v-sheet>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const { query } = useRoute()
const { commit } = useStore()
const router = useRouter()

const { token, ...userdata } = query
commit('SET_TOKEN', token)
commit('SET_USER', userdata)
router.push('/')
</script>