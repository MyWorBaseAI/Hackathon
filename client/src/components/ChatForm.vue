<template>
    <v-footer app height="60" class="pr-2" color="background">
        <v-row>
            <v-col class="d-flex align-center pl-1 pr-3">
                <input type="file" hidden id="send-file-chat" @change="sendFile" />
                <v-text-field class="normal-input" bg-color="surface" autofocus v-model="text" @keypress.enter="sendHandler" hide-details density="compact" variant="solo" placeholder="Сообшение..." flat
                    :append-inner-icon="isEdited?'mdi-pencil-off':''" @click:append-inner="$emit('edit-off'), text=''"></v-text-field>
                <!-- <v-btn @click="clickFileInput" size="40" class="ml-2" variant="flat" color="primary">
                    <v-icon>mdi-paperclip</v-icon>
                </v-btn> -->
                <v-menu transition="fade-transition" :close-on-content-click="false">
                    <template #activator="{ props }">
                        <v-btn v-bind="props" size="40" class="ml-2" variant="flat" color="primary">
                            <v-icon>mdi-emoticon-happy-outline</v-icon>
                        </v-btn>
                    </template>
                    <v-card elevation="1" width="260" color="background">
                        <v-card-text class="pa-2">
                            <v-sheet height="250" width="100%" class="d-flex flex-wrap overflow-auto pa-1 gap">
                                <v-btn v-for="smile, i in smiles" size="35" flat color="primary" @click="text+=smile">{{ smile }}</v-btn>
                            </v-sheet>
                        </v-card-text>
                    </v-card>
                </v-menu>
                <!-- <v-btn @mousedown="startRecording" @mouseup="stopRecording" size="40" class="ml-2" :color="!isRecording?'primary':'secondary'" variant="flat">
                    <v-icon>mdi-microphone-outline</v-icon>
                </v-btn> -->
                <v-btn @click="sendHandler" size="40" class="ml-2" variant="flat" color="primary">
                    <v-icon>mdi-{{isEdited?'email-edit':'send'}}</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, defineEmits, defineProps, watch, toRef } from 'vue'

const smiles = ["😀","😃","😄","😁","😆","😅","😂","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","🥺","😢","😭","😤","😠","😡","🤬","🤯","😳","🥵","🥶","😶","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😮","😵","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾","🤲","👐","🙌","👏","🤝","👍","👎","👊","✊","🤛","🤜","🤞","✌️","🤟","🤘","👌","🤏","👈","👉","👆","👇","☝️","✋","🤚","🖐","🖖","👋","🤙","💪","🦾","🖕","✍️","🙏","🦶","🦵","🦿","💄","💋","👄","🦷","👅","👂","🦻","👃","👣","👀","👤","👥","👶","👧","🧒","👦","👩","🧑","👨","👩‍🦱","🧑","👨‍🦱","👩‍🦰","🧑","👦","👱‍♀️","👱","👱‍♂️","👩‍🦳","🧑","👨‍🦳","👩‍🦲","🧑","👨‍🦲","🧔","🧔","🧔","👵","👴","👲","👳‍♀️","👳","👳‍♂️","🧕","👮‍♀️","👮","👮‍♂️","👷‍♀️","💂‍♀️","🕵️‍♀️","👩‍⚕️","🧑","🧶","🧵","🧥","🥼","🦺","👚","👕","👖","🩲","🩳","👔","👗","👙","🩱","👘","🥻","🥿","👠","👡","👢","👞","👟","🥾","🧦","🧤","🧣","🎩","🧢","👒","🎓","🥽","🌂"]
const emit = defineEmits()
const props = defineProps({
    text: String,
    isEdited: Boolean
})

const text = ref('')

watch(toRef(props, 'text'), (v) => {
    if(v) text.value = v
})

const mediaRecorder = ref(null)
const recordedChunks = ref([])
const isRecording = ref(false)

//text
const sendHandler = () => props.isEdited ? updateMessage() : addMessage()

const addMessage = () => {
  if(!text.value.trim()) return
  emit('addMessage', text.value)
  text.value = ''
}

const updateMessage = () => {
    if(!text.value.trim()) return
    emit('updateMessage', text.value)
    text.value = ''
}

//audio
const startRecording = () => {
    isRecording.value = true;
    recordedChunks.value = [];
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
        mediaRecorder.value = new MediaRecorder(stream);
        mediaRecorder.value.addEventListener('dataavailable', handleDataAvailable);
        mediaRecorder.value.start();
    })
    .catch((error) => {
        console.error('Error accessing microphone:', error);
        isRecording.value = false;
    });
}
const stopRecording = () => {
    isRecording.value = false;
    mediaRecorder.value?.stop();
}
const handleDataAvailable = (event) => {
  if (event.data.size > 0) {
    recordedChunks.value.push(event.data);
    if(!event.data) return

    const formdata = new FormData()
    formdata.append('type', getType(event.data.type))
    formdata.append('file', event.data)
    formdata.append('fileName', 'audio-'+Date.now())
    formdata.append('fileSize', formatSize(event.data.size))
    formdata.append('text', text.value)
    emit('addMessage', formdata)
    text.value = ''
  }
}

//file
const clickFileInput = () => document.getElementById('send-file-chat').click()
const getType = (type) => {
    return String(type).split('/')[0]
}
const formatSize = (size) => {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
    return (size / Math.pow(1024, i) as any).toFixed(2) * 1 + ' ' + ['b', 'kb', 'mb', 'gb', 'tb'][i]
}
const sendFile = (e) => {
    if(!e.target.files[0]) return
    const formdata = new FormData()
    formdata.append('type', getType(e.target.files[0].type))
    formdata.append('file', e.target.files[0])
    formdata.append('fileName', e.target.files[0].name)
    formdata.append('fileSize', formatSize(e.target.files[0].size))
    formdata.append('text', text.value)
    emit('addMessage', formdata)
    text.value = ''
}
</script>

<style>
.gap {
    gap: 4px;
}    
</style>