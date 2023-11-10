<template>
  <v-container class="pt-5">
    <v-row>
      <v-col cols="12" v-for="post, i in posts" :key="i" class="py-2">
        <v-card link flat border :to="`/forum/${post._id}`">
          <v-card-title class="d-flex justify-space-between flex-wrap align-start">
            <v-list-item v-if="getters.role === 'doctor'" class="post-item-list pl-0" density="compact">
              <template #prepend>
                <v-avatar color="primary" size="45">
                  <span style="text-transform: uppercase;">{{post.sender?.name?.[0] || '😷'}}</span>
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-bold text-h6 mb-1">{{ post.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ post.sender?.name || 'Anonymus' }}</v-list-item-subtitle>
            </v-list-item>
            <span v-else class="font-weight-medium">{{ post.title }}</span> <br>
            <div class="d-flex align-center">
              <v-chip label color="secondary" variant="outlined" density="comfortable" class="text-caption text-grey"><v-icon size="x-small" class="mr-1">mdi-eye-outline</v-icon> {{ post.views }}</v-chip>
              <v-chip label color="green" variant="flat" density="comfortable" class="text-caption ml-1">{{ post.comments }} ответов <v-icon size="x-small" class="ml-2">mdi-check</v-icon></v-chip>
            </div>
          </v-card-title>
          <v-card-text class="text-grey-darken-2 text-caption">
            {{ post.text }}
          </v-card-text>
          <v-card-text class="pt-0 d-flex justify-space-between flex-wrap align-center">
            <!-- <div class="d-flex flex-wrap" style="gap: 5px">
              <v-chip density="comfortable" link class="text-caption" color="primary" label v-for="i in 4" :key="i">Category {{i+1}}</v-chip>
            </div> -->
            <span class="text-caption mt-2 mt-sm-0 text-gray d-flex align-center">
              <!-- Feb 4, 2014 at 20:56 -->
              {{ new Date(post.createdAt).toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', }) }}
              <v-icon class="ml-1" size="x-small">mdi-clock-outline</v-icon>
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { get_posts } from '../api/post'
import { ref } from 'vue'
import { IPosts } from '../interfaces'
import { useStore } from 'vuex'

const { getters } = useStore()
const posts = ref<IPosts[]>([])

const init = async () => {
  const { data } = await get_posts()
  if(data.status==="ok") posts.value = data.result  
}

init()

</script>