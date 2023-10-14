<template>
  <v-app-bar flat color="transition" border class="px-md-10 px-0">
    <!-- <template v-slot:prepend>
        <v-avatar size="40">
            <v-img src="/logo-main-02.svg"></v-img>
        </v-avatar>
    </template> -->
    <v-app-bar-title>
        <v-img width="100" class="mt-2" src="/logo-master-03.svg"></v-img>
    </v-app-bar-title>
    <span class="text-body-2 mr-4">John Doe</span>
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

          <v-list-item-title class="text-caption">Settings</v-list-item-title>
        </v-list-item>
        <v-list-item link >
          <template v-slot:prepend>
            <v-icon style="margin-inline-end: -10px">mdi-logout-variant</v-icon>
          </template>

          <v-list-item-title class="text-caption">Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <template #extension>
      <div class="px-3">
        <v-tabs slider-color="secondary">
          <v-tab color="primary" height="35" class="text-body-2" variant="flat" v-for="l, i in links" :key="i" :to="l.url">{{l.title}}</v-tab>
        </v-tabs>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
const languages = [
  { lang: 'en', img: '/flags/us.svg', title: "English" },
  { lang: 'ru', img: '/flags/ru.svg', title: "Русский" },
  { lang: 'uz', img: '/flags/uz.svg', title: "O'zbekcha" },
]
const links = [
  { url: '/', icon: 'mdi-home', title: 'Dashboard' },
  { url: '/chats', icon: 'mdi-message-text', title: 'Chat' },
]
</script>