<template>
  <v-container fluid class="h-100">
    <v-row class="h-100" align="center" justify="center">
        <!-- <v-col class="12"> -->
            <v-card max-width="400" min-width="300" width="100%">
                <v-card-title class="text-center">TASDIQLASH KODI</v-card-title>
                <v-card-subtitle class="text-center">+998 00 000 00 00 raqamiga sms kod yuborildi</v-card-subtitle>
                <v-card-text>
                    <v-form>
                        <v-row justify="center">
                            <v-col cols="8" class="pb-0">
                                <v-otp-input v-model="code" length="4" placeholder="-" hide-details density="compact"></v-otp-input>
                            </v-col>
                            <!-- <v-col cols="12" class="py-0">
                                <v-btn block height="43" elevation="1" variant="outlined">
                                    Qayta yuborish 00:00
                                </v-btn>
                            </v-col> -->
                            <v-col cols="12">
                                <v-btn @click="fn" :disabled="!(code?.length>=4)" :loading="loading" block height="43" elevation="1" color="primary">
                                    Tasdiqlah
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        <!-- </v-col> -->
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { verify } from '../api/auth'
import { checkToken } from '../api'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { MutationTypes } from '../interfaces/store-types'

const { commit } = useStore()
const router = useRouter()
const email = ref(localStorage.getItem('verify-email') || '')
const code = ref('')
const loading = ref(false)
const fn = async () => {
    loading.value = true
    const { data } = await verify({ email: email.value, code: code.value })
    if(data.status === 'ok') {
        console.log(data);
        commit(MutationTypes['SET_TOKEN'], data.token)
        commit(MutationTypes['SET_USER'], data.user)
        checkToken()
        router.push(data.user.registered?'/':'/register')
    }
    loading.value = false
}
</script>

<style>
.normal-input::placeholder {
    font-size: 11px !important;
}
</style>