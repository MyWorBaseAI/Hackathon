<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card flat border v-if="post?._id">
          <v-card-title class="d-flex justify-space-between align-center">
            <v-list-item v-if="getters.role === 'doctor'" class="post-item-list pl-0" density="compact">
              <template #prepend>
                <v-avatar color="primary" size="45">
                  <span>{{post.sender?.name?.[0] || '😷' }}</span>
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-bold text-subtitle mb-1">{{ post.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ post.sender?.name || 'Anonymus' }}</v-list-item-subtitle>
            </v-list-item>
            <span v-else class="font-weight-bold">{{ post.title }}</span>
            <span class="text-body-2">
              Интенсивность боли
              <v-chip color="orange" class="ml-2" label>{{ post.intensity }}/5</v-chip>
            </span>
          </v-card-title>
          <v-card-text class="py-0">
            <div>
              <v-chip label density="comfortable" color="secondary" class="text-caption mr-2"> C {{ new Date(post.start_date).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', }) }}</v-chip>
              <v-chip label density="comfortable" color="secondary" class="text-caption mt-1 mt-sm-0">До {{ new Date(post.end_date).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', }) }}</v-chip>
            </div>
          </v-card-text>
          <v-card-text>
            <v-card-title class="px-0 py-0 text-body-h6 text-grey-darken-3 font-weight-medium">Проявленные симптомы</v-card-title>
            <v-card color="grey-lighten-5" flat>
              <v-card-text class="text-grey-darken-3">
                <p style="white-space: pre-line" v-html="post.text"></p>
              </v-card-text>
            </v-card>
          </v-card-text>
          <!-- <v-card-text class="pt-0 d-flex justify-space-between flex-wrap align-center">
            <div class="d-flex flex-wrap" style="gap: 5px">
              <v-chip density="comfortable" link class="text-caption" color="primary" label v-for="i in 4" :key="i">Category {{i+1}}</v-chip>
            </div>
            <span class="text-caption text-gray d-flex align-center">
              
            </span>
          </v-card-text> -->
          <v-card-text class="pt-0 d-flex justify-space-between flex-wrap align-center">
            <div class="d-flex flex-wrap px-2 text-caption" style="gap: 2px">
              <span>{{ post.views?.length }} просмотров</span>/<span>{{ post.comments?.length }} ответов</span>
            </div>
            <span class="text-caption text-gray d-flex align-center">
              {{ new Date(post.createdAt).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', }) }}
              <v-icon class="ml-1" size="x-small">mdi-clock-outline</v-icon>
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <div class="w-100 d-flex justify-space-between align-center py-0">
          <span class="text-h6">{{ post.comments?.length }} Ответов</span>
          <!-- <div style="width: 185px;">
            <v-select v-model="sorting" label="Сортировать по" :items="sorters" items-title="title" items-value="value" @update:modelValue="init" hide-details variant="outlined" density="compact" flat />
          </div> -->
        </div>
        <v-list class="comment-list">
          <v-list-group class="mb-1" v-for="comment, i in post.comments" :key="i">
            <template v-slot:activator="{ props, isOpen }">
              <v-list-item border class="py-3" append-icon :ripple="false">
                <template #prepend>
                  <v-btn :to="`/profile/${comment?.sender?._id}`" :disabled="comment?.sender?.role !== 'doctor'" variant="text" color="white" rounded="circle" size="45" class="mr-2">
                    <v-avatar color="primary" size="45">
                      <span>{{ comment?.sender?.name?.[0] }}</span>
                    </v-avatar>
                  </v-btn>
                </template>
                <v-list-item-title class="text-subtitle-1 font-weight-medium">{{ comment?.sender?.name }}</v-list-item-title>
                <p class="text-caption pb-0 text-grey-darken-2 mb-2">
                  {{ comment.text }}
                </p>
                <v-list-item-action class="d-flex align-center justify-space-between">
                  <div>
                    <v-btn v-bind="props" @click="apply_comments(i, comment._id, !!comment?.child)" class="text-caption mr-1" rounded="xl" density="compact" variant="outlined">{{ comment?.child?.length || comment?.reviews }} ответов <v-icon>mdi-menu-{{isOpen?'up':'down'}}</v-icon></v-btn>
                    <v-btn @click="like(i, comment._id)" color="primary" class="text-caption mr-1" rounded="xl" density="compact" :variant="comment?.likes?.includes(getters.userid)?'flat':'outlined'"><v-icon class="mr-1">mdi-thumb-up-outline</v-icon> {{ comment.likes?.length }}</v-btn>
                    <v-btn @click="dislike(i, comment._id)" color="secondary" class="text-caption" rounded="xl" density="compact" :variant="comment?.dislikes?.includes(getters.userid)?'flat':'outlined'"><v-icon class="mr-1">mdi-thumb-down-outline</v-icon> {{ comment.dislikes?.length }}</v-btn>
                    <v-btn @click="parent=comment._id" color="black" class="text-caption ml-5" rounded="xl" density="compact" variant="outlined"><v-icon class="mr-1">mdi-reply</v-icon> ответить</v-btn>
                  </div>
                  <span class="text-caption text-gray d-flex align-center">
                    {{ new Date(comment.createdAt).toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', }) }}
                    <v-icon class="ml-1" size="x-small">mdi-clock-outline</v-icon>
                  </span>
                </v-list-item-action>
              </v-list-item>
            </template>

            <v-list-item v-for="c, i in comment?.child || []" :key="i" class="py-2">
              <template #prepend>
                <v-avatar color="primary">
                  <span>{{ c.sender?.name?.[0] }}</span>
                </v-avatar>
              </template>
              <v-list-item-title class="pt-0 mt-0">{{ c.sender?.name }}</v-list-item-title>
              <p class="text-caption text-grey-darken-2">{{ c.text }}</p>
              <v-list-item-action class="mt-1 d-flex align-center justify-space-between">
                <div>
                  <v-btn class="text-caption mr-1" rounded="xl" density="compact" variant="outlined"><v-icon class="mr-1">mdi-thumb-up-outline</v-icon> {{ c.likes?.length }}</v-btn>
                  <v-btn class="text-caption" rounded="xl" density="compact" variant="outlined"><v-icon class="mr-1">mdi-thumb-down-outline</v-icon> {{ c.dislikes?.length }}</v-btn>
                </div>
                <span class="text-caption text-gray d-flex align-center">
                  {{ new Date(c.createdAt).toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', }) }}
                  <v-icon class="ml-1" size="x-small">mdi-clock-outline</v-icon>
                </span>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
  <ChatForm border @addMessage="addComment" v-if="getters.role === 'doctor'" />
</template>

<script lang="ts" setup>
import ChatForm from '../components/ChatForm.vue'
import { ref } from 'vue'
import { get_post_by_id, view_post } from '../api/post'
import { useRoute } from 'vue-router'
import { get_comments, add_comment, dislike_comment, like_comment } from '../api/comment'
import { useStore } from 'vuex'
import { IPosts } from '../interfaces'

const { getters } = useStore()
const { params } = useRoute()
const post = ref<IPosts|any>({})

const parent = ref(null)
const sorting = ref('newest')

const sorters = [
  { title: "Популярные", value: 'favourite' },
  { title: "Новые", value: 'newest' },
  { title: "Старые", value: 'oldest' },
]

const init = async () => {
  const { data } = await get_post_by_id(params.id as string, sorting.value)

  if(data.status == "ok") {
    post.value = data.result
    await view_post(params.id as string)
  }
}

const apply_comments = async (i1: number, id: string, c: boolean) => {
  if(c) return 
  const { data } = await get_comments(id)
  if(data.status === "ok") {
    post.value.comments[i1].child = data.result
  }
}

const addComment = async (text: string) => {
  const { data } = await add_comment({
    sender: getters.userid,
    text,
    post: post.value?._id,
    parent: parent.value,
  })
  if(data.result.parent) {
    const index = post.value.comments.findIndex((c: any) => c._id === parent.value)
    if(post.value.comments[index].child){
      post.value.comments[index].child.push(data.result)
    }else{
      Object.assign(post.value.comments[index], { child: [data.result] })
    }
    
  }else{
    post.value.comments.push(data.result)
  }
  parent.value = null;
}

const like = async (ind: number, id: string) => {
  const { data } = await like_comment(id)
  
  if(data.status === "ok") {
    const likeind = post.value.comments[ind].likes.findIndex((l: string) => l === getters.userid)
    if(data.userLiked) post.value.comments[ind].likes.splice(likeind, 1)
    else post.value.comments[ind].likes.push(getters.userid)

    if(data.userDisLiked){
      const l1 = post.value.comments[ind].dislikes.findIndex((l: string) => l === getters.userid)
      post.value.comments[ind].dislikes.splice(l1, 1)
    }
  }
}

const dislike = async (ind: number, id: string) => {
  const { data } = await dislike_comment(id)
  
  if(data.status === "ok") {
    const likeind = post.value.comments[ind].dislikes.findIndex((l: string) => l === getters.userid)
    if(data.userDisLiked) post.value.comments[ind].dislikes.splice(likeind, 1)
    else post.value.comments[ind].dislikes.push(getters.userid)

    if(data.userLiked){
      const l1 = post.value.comments[ind].likes.findIndex((l: string) => l === getters.userid)
      post.value.comments[ind].likes.splice(l1, 1)
    }
  }
}

init()
</script>

<style>
.comment-list .v-list-item__prepend{
  margin-top: 4px;
  align-self: flex-start !important;
}
</style>