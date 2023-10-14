<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent width="250" elevation="0" :expand-on-hover="mobile">
    <v-list nav density="compact" color="primary" variant="flat" class="mt-2">
        <v-list-item v-for="l,i in links['doctor']" :key="i" link :to="l.url">
            <template #prepend>
                <v-icon>{{l.icon}}</v-icon>
            </template>
            <v-list-item-title>{{l.title}}</v-list-item-title>
        </v-list-item>
    </v-list>
    <v-btn position="absolute" elevation="1" v-if="!mobile" :icon="`mdi-chevron-${!rail ? 'left' : 'right'}`" size="x-small" @click="rail = !rail" style="right: -15px"></v-btn>

  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { useDisplay } from 'vuetify'

const mobile = useDisplay().mobile;

watch(mobile, () => {
  if (mobile) rail.value = true;
  else rail.value = false;
});
const rail = ref(false);
const drawer = ref(true)
const links = {
  patient: [
    { url: '/', icon: 'mdi-home', title: 'Your Questions' },
    { url: '/create', icon: 'mdi-plus-box', title: 'Add Question' },
    { url: '/chats', icon: 'mdi-message-text', title: 'Chat' },
  ],
  doctor: [
    { url: '/', icon: 'mdi-home', title: 'Dashboard' },
    { url: '/chats', icon: 'mdi-message-text', title: 'Chat' },
  ]
}
</script>