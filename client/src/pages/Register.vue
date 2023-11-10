<template>
  <v-container class="h-100">
    <v-row class="h-100" align="center" justify="center">
        <!-- <v-col class="12"> -->
            <v-card max-width="400" min-width="300" width="100%">
                <v-card-title class="text-center">Заполните все поля</v-card-title>
                <!-- <v-card-subtitle class="text-center">+998 00 000 00 00 raqamiga sms kod yuborildi</v-card-subtitle> -->
                <v-card-text>
                    <v-form ref="form">
                        <v-row>
                            <v-col cols="12">
                                <v-select :rules="rules" v-model="sdata.gender" :items="['Мужский','Женский']" placeholder="Пол" hide-details density="compact" variant="outlined" />
                            </v-col>
                            <v-col cols="12">
                                <v-select :rules="rules" v-model="sdata.category" :items="categories" placeholder="Специальность" hide-details density="compact" variant="outlined" />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field type="number" min="0" :rules="rules" v-model="sdata.age" placeholder="Возраст" hide-details density="compact" variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field type="number" min="0" :rules="rules" v-model="sdata.experience" placeholder="Опыт" hide-details density="compact" variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-btn @click="skip" block height="43" variant="outlined" elevation="1" color="primary">
                                    Я не доктор
                                </v-btn>
                            </v-col>
                            <v-col cols="6">
                                <v-btn block @click="send" height="43" elevation="1" color="primary">
                                    Сохранить
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
import { ref } from "vue";
import { categories } from '../utils/categoires'
import { edit_user } from '../api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { rules } from '../utils/rules'

const router = useRouter()
const { commit } = useStore()
const form = ref(null)
const tab = ref(0)
const sdata = ref({
    gender: null,
    age: null,
    experience: null,
    category: null,
})

const skip = () => {
    update({ registered: true })
}

const send = async () => {
    const { valid } = await form.value.validate()
    if(valid) update({...sdata.value, role: "doctor", registered: true})
}

const update = async (formdata) => {
    const { data } = await edit_user(formdata)
    commit('SET_USER', data.result)
    router.push('/')
}
</script>

<style>
.normal-input::placeholder {
    font-size: 11px !important;
}
</style>