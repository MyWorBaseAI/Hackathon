<template>
  <v-container style="height: calc(100vh - 120px)" class="d-flex">
    <ChatList :isSmallScreen="isSmallScreen" />
    <v-dialog fullscreen :scrim="false" transition="slide-x-reverse-transition" color="background" :model-value="getters.chat!==null" location="right" v-if="isSmallScreen" @update:modelValue="commit('SET_CHAT', null)">
      <v-layout full-height>
        <MessageContainer />
      </v-layout>
    </v-dialog>
    <v-layout v-else>
      <MessageContainer v-if="getters.chat!==null" />
      <div class="h-100 w-100 d-flex justify-center align-center bg-surface" v-else>
        <v-chip label>Пусто</v-chip>
      </div>
    </v-layout>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ChatList from '../components/ChatList.vue'
import MessageContainer from '../components/MessageContainer.vue'
import { useStore } from 'vuex'
import { MutationTypes } from '../interfaces/store-types'
// import { useI18n } from 'vue-i18n'
import { joinchat, getmessage } from '../api/socket'

// const { locale, t } = useI18n()
const { getters, commit } = useStore()
const isSmallScreen = ref(false)

getmessage((message) => commit('ADD_MESSAGE', message))
// getchat((chat) => commit('addChat', chat))
// removeinchat((id) => commit('removeChat', id))
// deleteinmessage(data => commit('deleteMessage', data))
// editinmessage(data => commit('editMessage', data))

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 700;
};

onMounted(() => {
  joinchat(getters.userid)
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>