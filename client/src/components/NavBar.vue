<template>
  <v-navigation-drawer :rail="true" permanent :model-value="true" expand-on-hover>
    <v-list nav density="compact" color="primary" variant="flat">
        <v-list-item v-for="l,i in links" :key="i" link :to="l.url">
            <template #prepend>
                <v-icon>{{l.icon}}</v-icon>
            </template>
            <v-list-item-title>{{l.title}}</v-list-item-title>
        </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const links = [
    { url: '/', icon: 'mdi-home', title: 'Dashboard' },
    { url: '/register', icon: 'mdi-form-select', title: 'Forum' },
    { url: '/verify', icon: 'mdi-plus-box', title: 'New' },
    { url: '/register', icon: 'mdi-message-text', title: 'Chat' },
    { url: '/verify', icon: 'mdi-cog', title: 'Settings' },
]
</script>