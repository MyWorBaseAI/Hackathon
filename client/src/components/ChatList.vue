<template>
    <v-card border flat rounded="0" height="100%" :width="isSmallScreen?'100%':'300px'" class="pb-12" color="background">
        <!-- <v-card-text class="px-2 pt-2 pb-0">
            <v-text-field  v-model="search"
                class="normal-input" placeholder="Search" flat
                hide-details density="compact" variant="outlined"
                append-inner-icon="mdi-magnify" bg-color="surface" />
        </v-card-text> -->
        <v-list nav bg-color="transparent" mandatory class="pt-2" height="100%" lines="2">
            <div class="d-flex w-100 justify-center" v-if="chats.length===0">
                <v-chip label>Пусто</v-chip>
            </div>
            <v-list-item height="65" class="py-3" v-for="chat, i in chats" :key="i" link @click="selectChat(chat)" :active="current_chat?._id === chat._id">
                <template v-slot:prepend>
                    <v-avatar>
                        <v-img cover :src="chat.user.image || '/noimg.jpg'"></v-img>
                    </v-avatar>
                </template>
                <v-list-item-title class="text-body-2">{{ chat.user.name || '😷' }}</v-list-item-title>
                <v-list-item-title class="text-caption mt-1">{{ chat.last_message ? chat.last_message.text : "Пусто" }}</v-list-item-title>
                <template #append>
                    <div class="d-flex flex-column align-end">
                        <v-btn :disabled="role !== 'doctor'" v-show="!chat.open" @click.stop="openChat(chat, i)" size="40" class="ml-2" variant="flat" color="primary">
                            <v-icon>mdi-lock-open-variant</v-icon>
                        </v-btn>
                        <!-- <div class="text-caption text-grey">{{ chat.messages?.[0]?.created_at && new Date(chat.messages[0]?.created_at).toLocaleTimeString("en-US", { hour12: false, hour: "numeric", minute: "numeric" }) }}</div> -->
                    </div>
                </template>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { get_chats, open_chat } from '../api/chat'

export default {
    name: "ChatList",
    data() {
        return {
            search: "",
        }
    },
    props: ['isSmallScreen'],
    computed: mapGetters(['chats', 'current_chat', 'userid', 'role']),
    methods: {
        ...mapMutations(['SET_CHAT', 'SET_CHATS', 'OPEN_CHAT']),
        async selectChat(id) {
            this.SET_CHAT(id)
        },
        async openChat(chat, index) {
            // if(ch)
            await open_chat(chat._id)
            this.OPEN_CHAT(index)
        }
    },
    async created(){
        const { data } = await get_chats(this.userid)
        this.SET_CHATS(data.result)
    },
}
</script>