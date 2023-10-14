<template>
    <v-app-bar flat color="transition" border>
        <template v-slot:prepend>
            <v-avatar size="40">
                <v-img src="/logo-main-02.svg"></v-img>
            </v-avatar>
        </template>

        <v-app-bar-title>
            <v-img width="100" class="mt-2" src="/logo-master-03.svg"></v-img>
        </v-app-bar-title>

        <!-- <v-menu transition="fade-transition">
            <template v-slot:activator="{props}">
                <v-btn class="mx-2 px-2" v-bind="props" flat height="40" width="40" variant="text">
                    {{ languages[0].lang }}
                    <v-avatar size="25" class="ml-3">
                        <v-img cover :src="languages[0].img" />
                    </v-avatar>
                </v-btn>
            </template>

            <v-list elevation="2" density="compact">
                <v-list-item v-for="(item, i) in languages" link :key="i" @click="changeLang(item.lang)">
                    <template v-slot:prepend>
                        <v-img :src="item.img" width="27" height="23" cover />
                    </template>

                    <v-list-item-title class="ml-4 text-caption" v-text="item.title"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu> -->
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
      </v-app-bar>
</template>

<script setup lang="ts">
const languages = [
  { lang: 'en', img: '/flags/us.svg', title: "English" },
  { lang: 'ru', img: '/flags/ru.svg', title: "Русский" },
  { lang: 'uz', img: '/flags/uz.svg', title: "O'zbekcha" },
]
</script>