<template>
  <v-container class="h-100">
    <v-row class="h-100" align="center" justify="center">
        <v-card max-width="400" width="100%" flat border>
            <!-- <v-card-text class="d-flex justify-center pb-0">
                <v-avatar size="150" rounded>
                    <v-img src="/logo-2.svg"></v-img>
                </v-avatar>
            </v-card-text> -->
            <v-card-title class="text-center text-primary text-h5 font-weight-bold my-2">Войти в систему</v-card-title>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-col cols="12" class="pb-0">
                            <v-text-field v-model="email" prepend-inner-icon="mdi-at" variant="outlined" color="primary" hide-details density="comfortable" label="Электронная почта"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-btn @click="fn" :loading="loading" flat :disabled="!email.trim()" block height="43" variant="flat" class="text-none font-weight-bold" color="primary">
                                Отправить код
                            </v-btn>
                        </v-col>
                        <!-- <v-col cols="12" class="d-flex justify-center">
                            <v-btn :href="getGoogleUrl()" flat block height="43" variant="outlined" class="text-none font-weight-bold" color="secondary">
                                <v-icon class="mr-2">mdi-google</v-icon> Войти с помощью Google 
                            </v-btn>
                        </v-col> -->
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { login } from '../api/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const loading = ref(false)
const fn = async () => {
    loading.value = true
    const { data } = await login({ email: email.value })
    if(data.status === 'ok') {
        localStorage.setItem('verify-email', email.value)
        router.push('/verify')
    }
    loading.value = false
}
</script>

<style>
.normal-input::placeholder {
    font-size: 11px !important;
}
</style>