<template>
    <v-card border flat rounded="0" height="100%" :width="isSmallScreen?'100%':'300px'" class="pb-12" color="background">
        <v-card-text class="px-2 pt-2 pb-0">
            <v-text-field  v-model="search"
                class="normal-input" placeholder="Search" flat
                hide-details density="compact" variant="outlined"
                append-inner-icon="mdi-magnify" bg-color="surface" />
        </v-card-text>
        <v-list nav bg-color="transparent" mandatory class="pt-2" height="100%" lines="2">
            <div class="d-flex w-100 justify-center" v-if="chats.length===0">
                <v-chip label>Empty Chat</v-chip>
            </div>
            <v-list-item height="65" class="py-3" v-for="chat, i in chats" :key="i" link @click="selectChat(i, chat.id)" :active="current_chat?.id === chat.id">
                <template v-slot:prepend>
                    <v-avatar>
                        <v-img cover :src="chat.users?.[0]?.image || '/icons/noimg.jpg'"></v-img>
                    </v-avatar>
                </template>
                <v-list-item-title class="text-body-2">{{ chat.users[0]?.name }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption mt-1">{{ chat.messages?.[0] ? chat.messages[0].text : {en:'Empty',ru:"Пустой",uz:"Bo'sh"}[locale] }}</v-list-item-subtitle>
                <template #append>
                    <div class="d-flex flex-column align-end">
                        <div class="text-caption text-grey">{{ chat.messages?.[0]?.created_at && new Date(chat.messages[0]?.created_at).toLocaleTimeString("en-US", { hour12: false, hour: "numeric", minute: "numeric" }) }}</div>
                    </div>
                </template>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
import { ref } from 'vue'
import { mapGetters, mapMutations, useStore } from 'vuex'
// import { useI18n } from 'vue-i18n'
// import * as chatApi from '../api/chat'
// import { get_users } from '../api/user'
// import { addchat, removechat } from '../api/socket'

export default {
    name: "ChatList",
    props: ['isSmallScreen'],
    computed: mapGetters(['chats', 'current_chat', 'userid']),
    methods: {
        ...mapMutations(['setChat', 'setChats', 'appendMessages', 'addChat']),
        async selectChat(i, id) {
            // if(!this.chats[i]?.chatmessages) {
            //     const { data } = await chatApi.get_messages(id)
            //     this.appendMessages([i, data.result])
            // }
            // this.setChat(id)
        },
    },
    setup(){
        // const { t, locale } = useI18n()
        const { getters } = useStore()
        // const searchedUsers = ref([])
        const search = ref('')
        // const debounceSearch = debounce(async (e) => {
        //     if(!e.trim()) return searchedUsers.value = []
        //     const { data } = await get_users(`search=${e}&userid=${getters.userid}`)
        //     searchedUsers.value = data.users
        // }, 500)
        
        return { search, getters }
    },
    async created(){
        // const { data } = await chatApi.get_chats(this.userid)
        // this.setChats(data.result)
    }
}
</script>