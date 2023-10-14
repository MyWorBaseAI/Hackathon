<template>
    <v-container>
        <v-row dense>
            <v-col cols="12">
                <v-card height="140">
                    <v-img src="https://picsum.photos/600/200?random" cover height="100%"
                        gradient="to top right, rgba(98,0,238,1), rgba(85,102,199,.2)"
                    >
                        <v-card-title class="text-white">Community Forums</v-card-title>
                        <v-card-subtitle class="text-white">Community Forums</v-card-subtitle>
                        <v-card-text>
                            <v-btn color="secondary" rounded="xl" flat>New Discussion</v-btn>
                        </v-card-text>
                    </v-img>
                </v-card>
            </v-col>
            <v-col cols="12">
                <span>New to the forum? Here's where to start:</span>
                <br>
                <span class="text-h5">Featured Groups</span>
                <v-list>
                    <v-list-item v-for="l,i in lists" :key="i">
                        <template #prepend>
                            <v-icon>{{l.icon}}</v-icon>
                        </template>
                        <v-list-item-title>{{l.title}}</v-list-item-title>
                        <v-list-item-subtitle>{{l.subtitle}}</v-list-item-subtitle>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
const lists = [
    { icon: 'mdi-head-snowflake-outline', title: 'Anxiety Disorders', subtitle: 'Mental health' },
    { icon: 'mdi-virus', title: 'Coronavirus (COVID-19)', subtitle: 'Infections' },
    { icon: 'mdi-head-snowflake-outline', title: 'Despression', subtitle: 'Mental health' },
    { icon: 'mdi-head-snowflake-outline', title: 'Hip Replacement', subtitle: 'Operations and surgical procedures' },
    { icon: 'mdi-head-snowflake-outline', title: 'Irritable Bowel Syndrome', subtitle: 'Operations and surgical procedures' },
]
</script>