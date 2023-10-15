<template>
  <v-container>
    <v-row>
        <v-col cols="12">
            <v-list-item v-if="user?._id" border lines="3" class="pa-3 profile-list">
                <template #prepend>
                    <v-avatar size="100" class="mr-3">
                        <v-img cover :src="user.image || '/noimg.jpg'" />
                    </v-avatar>
                </template>
                <span class="text-h6">{{ user.name }}</span>
                <div class="my-2">
                    <v-chip label color="primary" density="comfortable">{{ user.category }}</v-chip>
                </div>
                <div class="my-2">
                    <v-chip label color="primary" density="comfortable">{{ user.experience }} - лет опыта</v-chip>
                </div>
                <!-- <div class="text-body-2 mt-3 text-grey-darken-1">
                    <span>255 reviews</span>
                    <span class="ml-4">65 rates</span>
                </div> -->
                <template #append v-if="getters.role !== 'doctor'">
                    <v-btn variant="flat" color="primary" @click="send(user._id, getters.userid)" :disabled="user.followers.includes(getters.userid)">Отправить заяавку</v-btn>
                </template>
            </v-list-item>
        </v-col>
        <!-- <v-col cols="12" md="6">
            <v-sheet border width="100%" class="pa-3">
                <v-table density="comfortable">
                    <tbody>
                        <tr v-for="item in 4" :key="item">
                            <td><v-chip label variant="flat" color="primary">Label {{item+1}}</v-chip></td>
                            <td class="text-right">12 replies</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-sheet>
        </v-col>
        <v-col cols="12" md="6">
            <v-sheet border width="100%" class="pa-3">
                <v-table density="comfortable">
                    <tbody>
                        <tr v-for="item in 4" :key="item">
                            <td><v-chip label variant="flat" color="primary">Label {{item}}</v-chip></td>
                            <td class="text-right text-caption text-grey" >4 Feb, 2014 20:15</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-sheet>
        </v-col> -->
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { get_user } from '../api/user'
import { create_chats } from '../api/chat'
import { useStore } from 'vuex'
import { IPosts } from '../interfaces'

const { getters } = useStore()
const { params } = useRoute()
const user = ref<IPosts|any>({})


const init = async () => {
  const { data } = await get_user(params.id as string)
  
  user.value = data.result
}

const send = async (doctor: string, me: string) => {
    user.value.followers.push(me)

    await create_chats({
        users: [doctor, me],
        open: false,
    } as any)
}

init()
</script>

<style>
.profile-list .v-list-item__append{
    height: 100%;
    display: flex;
    align-items: end;
}
</style>