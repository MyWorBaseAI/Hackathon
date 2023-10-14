<template>
<v-card max-width="600">
  <v-card-title>Call To Users {{ me }}</v-card-title>
  <v-card-text>
    <v-row>
      <v-col cols="10">
        <v-text-field v-model="userid" hide-details flat density="compact" variant="outlined" placeholder="Type here user id.."></v-text-field>
      </v-col>
      <v-col cols="2" class="pl-0">
        <v-btn block color="green" height="42" @click="callUser"><v-icon>mdi-phone</v-icon></v-btn>
      </v-col>
    </v-row>
  </v-card-text>
  <v-card-text v-if="calling">
    <v-row>
      <v-col cols="6">
        <video ref="localVideo" autoplay width="180" height="250"></video>
        my id: {{ me }}
      </v-col>
      <v-col cols="6">
        <video ref="remoteVideo" autoplay width="180" height="250"></video>
        id: {{userid}}
      </v-col>
    </v-row>
    <div>
      <v-btn variant="outlined" @click="toggleAudio">
        <v-icon>mdi-microphone{{enableAudio?'-off':''}}</v-icon>
      </v-btn>
      <v-btn variant="outlined" @click="toggleVideo">
        <v-icon>mdi-video{{enableVideo?'-off':''}}</v-icon>
      </v-btn>
      <v-btn variant="outlined" @click="endCall" color="red">
        <v-icon>mdi-phone-hangup</v-icon>
      </v-btn>
    </div>
  </v-card-text>
</v-card>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from "vue";
import { io } from "socket.io-client";
import Peer from "peerjs";


const peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: 9000,
  debug: 3,
  config: {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
    ]
  },
})
const socket = io("http://localhost:4000")
const me = ref("");
const userid = ref("");

const localStream = ref(null)
const remoteStream = ref(null)

const localVideo = ref(null)
const remoteVideo = ref(null)

const conn = ref(null)

const calling = ref(false)
const incomecall = ref(false)

const enableAudio = ref(null)
const enableVideo = ref(null)

socket.on('me', (id: string) => me.value = id)

const callUser = () => {
  socket.emit('call-user', { receiverId: userid.value, senderId: me.value })
}

socket.on('incoming-call', data => {
  incomecall.value = true
  if(!confirm('Hang up the Call for user:'+data.senderId)){
    socket.emit('end-call', {userId: data})
  }else{
    socket.emit('answer-call', { answer: me.value, callerId: data.senderId })
  }
  incomecall.value = false
})

const beginCall = () => {
  calling.value = true
  navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((ls) => {
    localVideo.value.srcObject = ls

    localStream.value = ls

    peer.on('call', call => {
      call.answer(localStream)

      call.on('stream', rs => {
        remoteVideo.value.srcObject = rs
      })
    })
  })
}

socket.on('call-answered', data => {
  console.log(data);
  beginCall()
})

const toggleAudio = () => {
  enableAudio.value = !enableAudio.value
}

const toggleVideo = () => {
  enableVideo.value = !enableVideo.value
}

const endCall = () => {
  socket.emit('call-user', userid.value)
}
</script>