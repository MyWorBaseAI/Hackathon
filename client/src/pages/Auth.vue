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
import { onMounted, useAttrs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDefaults } from 'vuetify/lib/framework.mjs'
import { useStore } from 'vuex'
import { checkToken } from '../api/index'

const { query } = useRoute()
const { commit } = useStore()
const router = useRouter()

const { token, registered, ...userdata } = query
commit('SET_TOKEN', token)
if(userdata.image === "undefined") delete userdata.image
commit('SET_USER', {
  ...userdata, 
  registered: JSON.parse(registered as any),
})

checkToken()

router.push(registered==='true'?'/':'/register')
</script>