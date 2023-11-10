<template>
  <v-app-bar flat height="60" class="pr-2" color="background">
      <v-btn @click="commit('SET_CHAT', null)" size="40" variant="flat" color="primary">
          <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-list-item class="pl-3">
          <template v-slot:prepend>
              <v-avatar size="45">
                  <v-img cover :src="getters.current_chat?.user?.image || '/noimg.jpg'"></v-img>
              </v-avatar>
          </template>
          <v-list-item-title class="text-body-2">{{ getters.current_chat?.user?.name || '😷' }}</v-list-item-title>
          <v-list-item-subtitle class="text-caption">{{ getters.current_chat?.user?.email || '' }}</v-list-item-subtitle>
      </v-list-item>
      <v-spacer></v-spacer>
      <!-- <v-btn size="40" class="ml-2" variant="flat" color="primary" @click="deleteMessage">
        <v-icon>mdi-{{!showDelete?'delete':'close'}}</v-icon>
      </v-btn> -->
      <v-btn size="40" v-show="getters.current_chat?.open" class="ml-2" variant="flat" color="primary" target="_blank" href="https://meet.google.com/new">
        <v-icon>mdi-phone</v-icon>
      </v-btn>
  </v-app-bar>
  <v-sheet class="chat-box" id="chatbox">
    <div class="w-100 px-2 pb-1">
      <div v-for="message in getters.current_chat?.messages||[]" :key="message._id" class="w-100 d-flex align-center pt-1" :class="message.sender?._id === getters.userid ? 'justify-space-between' : 'justify-start'">
        <div class="mr-1">
          <v-checkbox v-show="showDelete" v-model="selectedDeleteId" density="compact" :value="message._id" hide-details></v-checkbox>
        </div>
        <div class="d-flex justify-center">
          <v-sheet :color="message.sender?._id === getters.userid ? 'primary' : 'surface'" :border="message.sender?._id !== getters.userid" max-width="300" rounded class="px-2 py-1" > 
            <!-- @dblclick.stop="changeForEdit(message)" -->
            <!-- <v-avatar size="270" class="my-1" rounded v-if="message.type === 'image'">
              <v-img :src="message.file" width="100px"></v-img>
            </v-avatar> -->
            <!-- <v-avatar size="270" class="my-1" rounded v-else-if="message.type === 'video'">
              <video :src="message.file" controls></video>
            </v-avatar> -->
            <!-- <div class="w-100 d-flex" v-else-if="message.type === 'application'">
              <v-btn size="45" rounded class="mr-2 mt-1" variant="tonal" :href="message.file" target="_blank">
                <v-icon>mdi-file</v-icon>
              </v-btn>
              <div>
                <div class="text-caption text-gray audio-text-width mt-1">
                  {{ message.fileName }}
                </div>
                <span class="text-caption">{{ message.fileSize }}</span>
              </div>
            </div> -->
            <p class="text-body-2" v-html="message.text.replace(/(https?:\/\/\S+)/g, `<a href='$1' target='_blank' class='text-blue-accent-1'>$1</a>`)"></p>
            <!-- <v-icon v-if="message.updated_at !== message.created_at" class="ml-1" size="10">mdi-pencil</v-icon> -->
          </v-sheet>
          <span class="text-caption text-grey-accent-3 ml-1 align-self-end">{{  new Date(message.createdAt).toLocaleTimeString("en-US", { hour12: false, hour: "numeric", minute: "numeric" }) }}</span>
        </div>
      </div>
    </div>
  </v-sheet>
  <ChatForm v-show="getters.current_chat?.open" @addMessage="addMessage" @updateMessage="updateMessage" @edit-off="editOff" :isEdited="!!editedMessage" :text="editedMessage?.text"/>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import ChatForm from './ChatForm.vue'
import { useStore } from 'vuex'
import * as chatApi from '../api/chat'
import * as chatSocket from '../api/socket'

const { getters, commit } = useStore()

const chatbox = ref(null)
const showDelete = ref(false)
const selectedDeleteId = ref([])
const editedMessage = ref(null)

const addMessage = async messageData => {
  // if(typeof messageData === "string") {
    const { data } = await chatApi.create_message({
      chat: getters.current_chat._id,
      sender: getters.userid,
      text: messageData,
    })
    chatSocket.sendmessage(data.result)
  // }else{
  //   messageData.append("sender_id", getters.userid)
  //   messageData.append("chat_id", getters.current_chat.id)
  //   const { data } = await chatApi.send_message(messageData)
  //   chatSocket.sendmessage(data.result)
  // }
  setTimeout(scrollToBottomChat, 200) 
}

const updateMessage = async text => {
  if(!editedMessage.value?.id) return
  if(editedMessage.value.text !== text) {
    const { data } = await chatApi.edit_message(editedMessage.value.id, { text })
    chatSocket.editmessage(data.result)
  }
  editOff()
}

// const deleteMessage = async () => {
//   if(showDelete.value) {
//     showDelete.value = false
//     if(selectedDeleteId.value.length !== 0) {
//       const { data } = await chatApi.delete_messages(selectedDeleteId.value.join(','))
//       console.log(data);
//       chatSocket.deletemessage({messages: selectedDeleteId.value, chat_id: getters.current_chat?.id })
//     }
//   }else{
//     showDelete.value = true
//   }
//   selectedDeleteId.value = []
// }

// const changeForEdit = message => {
//   if(message.sender?.id !== getters.userid) return
//   editedMessage.value = message
// }

const editOff = () => {
  editedMessage.value = null
}

const scrollToBottomChat = () => {
  nextTick(() => {
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight
  })
}
</script>

<style>
.chat-box {
  position: relative;
  width: 100%;
  top: 60px;
  height: calc(100% - 120px);
  overflow-y: auto;
  scroll-behavior: smooth;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column-reverse;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.my-video {
  position: absolute;
  bottom: 120px;
  right: 30px;
  width: 120px;
  height: 150px;
}
</style>