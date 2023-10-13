<template>
  <!-- <div>
    <video ref="localVideo" autoplay></video>
    <video ref="remoteVideo" autoplay></video>
    <div>
      <button @click="startCall">Start Call</button>
      <button @click="answerCall">Answer Call</button>
      <button @click="toggleVideo">Toggle Video</button>
      <button @click="toggleAudio">Toggle Audio</button>
    </div>
  </div> -->
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { io } from 'socket.io-client'
import Peer from 'peerjs'
// import SimplePeer from 'simple-peer'

export default defineComponent({
  name: "Video-Call",
  data(){
    return{
      socket: {}, //io('http://localhost:4000/')
      peer: null,
      localStream: null
    }
  },
  async mounted() {
    // this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    // this.$refs.localVideo.srcObject = this.localStream;
    // this.setupSocketListeners();
  },
  methods: {
    setupSocketListeners() {
      this.socket.on('offer', (offer, fromId) => {
        this.handleOffer(offer, fromId);
      });

      this.socket.on('answer', answer => {
        this.handleAnswer(answer);
      });

      this.socket.on('ice-candidate', candidate => {
        this.handleIceCandidate(candidate);
      });
    },
    startCall() {
      this.peer = new Peer(undefined, { path: '/myapp', port: 9000, host: 'localhost' });
      this.setupPeerListeners();
    },
    answerCall() {
      this.peer = new Peer(undefined, { path: '/myapp', port: 9000, host: 'localhost' });
      this.setupPeerListeners();
    },
    handleOffer(offer, fromId) {
      this.peer.signal(offer);
      this.peer.on('signal', answer => {
        this.socket.emit('answer', answer, fromId);
      });
    },
    handleAnswer(answer) {
      this.peer.signal(answer);
    },
    handleIceCandidate(candidate) {
      this.peer.signal(candidate);
    },
    setupPeerListeners() {
      this.peer.on('stream', stream => {
        this.$refs.remoteVideo.srcObject = stream;
      });

      this.peer.on('signal', signal => {
        if (signal.type === 'offer') {
          this.socket.emit('offer', signal);
        } else if (signal.candidate) {
          this.socket.emit('ice-candidate', signal);
        }
      });
    },
    toggleVideo() {
      this.localStream.getVideoTracks()[0].enabled = !this.localStream.getVideoTracks()[0].enabled;
    },
    toggleAudio() {
      this.localStream.getAudioTracks()[0].enabled = !this.localStream.getAudioTracks()[0].enabled;
    },
  },
}) 
</script>

<style scoped>

</style>
