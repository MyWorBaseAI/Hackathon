<template>
  <v-app-bar flat color="transition" border class="px-md-10 px-0">
    <v-app-bar-title>
        <v-img width="100" class="mt-0" src="/logo-master-03.svg"></v-img>
    </v-app-bar-title>
    <template v-if="getters.logged && getters.user.registered === true">
      <div class="mr-4 d-flex flex-column text-right pt-1">
        <span class="text-body-2" style="line-height: .8rem;">{{ getters.user?.name }}</span>
        <span class="text-caption text-grey">{{ getters.user?.email }}</span>
      </div>
      <v-menu transition="fade-transition">
        <template v-slot:activator="{props}">
          <v-btn class="mr-2" v-bind="props" size="35" variant="flat" rounded="circle">
            <v-avatar size="35">
              <v-img cover :src="'/noimg.jpg'" />
            </v-avatar>
          </v-btn>
        </template>

        <v-list elevation="2" density="compact" width="150">
          <v-list-item link to="/settings">
            <template v-slot:prepend>
              <v-icon style="margin-inline-end: -10px">mdi-cog</v-icon>
            </template>

            <v-list-item-title class="text-caption">Настройки</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="commit('LOGOUT')">
            <template v-slot:prepend>
              <v-icon style="margin-inline-end: -10px">mdi-logout-variant</v-icon>
            </template>

            <v-list-item-title class="text-caption">Выйти</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <template #extension v-if="getters.logged && getters.user.registered === true">
      <div class="px-3 w-100 d-flex justify-space-between align-center">
        <v-tabs rounded slider-color="secondary">
          <v-tab rounded="sm" color="primary" height="35" class="text-body-2" variant="flat" v-for="l, i in links" :key="i" :to="l.url">{{l.title}}</v-tab>
        </v-tabs>
        <v-tabs v-if="getters.role !== 'doctor'">
          <v-tab rounded="sm" color="primary" height="35" to="/create" slider-color="secondary" class="text-body-2" variant="flat">Задать вопрос</v-tab>
        </v-tabs>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'

const { getters, commit } = useStore()
const languages = [
  { lang: 'en', img: '/flags/us.svg', title: "English" },
  { lang: 'ru', img: '/flags/ru.svg', title: "Русский" },
  { lang: 'uz', img: '/flags/uz.svg', title: "O'zbekcha" },
]
const links = [
  { url: '/', icon: 'mdi-home', title: 'Моя лента' },
  { url: '/chats', icon: 'mdi-message-text', title: 'Чаты' },
]
</script>