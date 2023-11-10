<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-title>Редактировать Данные</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-label>Фото</v-label>
                  <v-file-input v-model="user.image" variant="outlined" placeholder="example@mail.com" density="compact" hide-details>
                    <template #prepend>
                      <v-avatar color="primary">
                        <v-img :src="getters.user?.image || '/noimg.jpg'" height="220" width="100%" cover></v-img>
                      </v-avatar>
                    </template>
                  </v-file-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-label>Имя и Фамиля</v-label>
                  <v-text-field v-model="user.name" :rules="rules" variant="outlined" density="compact" hide-details></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-label>Электроння почта</v-label>
                  <v-text-field v-model="user.email" :rules="rules" variant="outlined" placeholder="example@mail.com" density="compact" hide-details></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-btn @click="updateUser" :disabled="!disabledBtn" block height="42" color="primary" variant="flat">
                    Сохранить
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <input type="file" id="fileInput" hidden @change="updateUser">
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
// import { useI18n } from 'vue-i18n'
import { edit_user } from '../api/user'
import { rules } from '../utils/rules'

const { getters, commit } = useStore()
// const { t } = useI18n()

const show = ref(false)
const form = ref(null)
const disabledBtn = computed(() => {
  if(
    getters.user?.name === user.value.name &&
    getters.user?.email === user.value.email
  ) return false
  else return true
})

const user = ref({
  ...getters.user,
})

const clickFileInput = () => document.getElementById('fileInput').click()

const updateUser = async (e) => {
  const { valid } = await form.value.validate();
  if (valid) {
    const { data } = await edit_user({email: user.value.email, name: user.value.name})
    console.log(data);
    if(data.status === "ok") commit('SET_USER', data.result)
  }
}
</script>

<style>
  .v-hover-item {
    transition: filter .4s ease-in-out;
  }

  .v-hover-item.on-hover {
    filter: brightness(.8);
  }

  .show-btns {
    color: rgba(255, 255, 255, 1) !important;
  }
</style>