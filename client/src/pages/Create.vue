<template>
  <v-container>
    <v-row>
        <v-col>
            <v-card flat border>
                <v-card-text>
                    <v-form ref="form">
                        <v-row>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold text-h6 text-black">What happened?</span>
                                <v-text-field v-model="postData.title" :rules="rules" placeholder="Write about a problem" class="mt-1" hide-details density="compact" flat variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="0" md="3"></v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold text-h6 text-black">When did it start?</span>
                                <v-row class="pt-1">
                                    <v-col cols="6">
                                        <v-text-field v-model="postData.start_date" :rules="rules" label="Start" type="date" placeholder="Write about a problem" class="mt-1" hide-details density="compact" flat variant="outlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field v-model="postData.end_date" :rules="rules" label="End" type="date" placeholder="Write about a problem" class="mt-1" hide-details density="compact" flat variant="outlined"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold text-h6 text-black">Causes</span>
                                <div class="d-flex flex-wrap align-start mt-1" style="gap: 5px">
                                    <v-chip label density="comfortable" color="secondary" class="text-caption" v-for="item, i in items" :key="i">{{ item }}</v-chip>
                                </div>
                                <v-textarea v-model="postData.text" :rules="rules" placeholder="Write about a problem" class="mt-3" hide-details density="compact" flat variant="outlined" no-resize />
                            </v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold text-h6 text-black">Current pain intensity</span>
                                <v-slider v-model="postData.intensity" color="secondary" density="compact" hide-details step="1" :max="5" show-ticks="always" tick-size="3">
                                    <template #append>
                                        {{postData.intensity}} / 5
                                    </template>
                                </v-slider>
                            </v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold text-h6 text-black">Additional information</span>
                                <v-text-field v-model="postData.file_desc" multiple chips placeholder="Describe your file" class="mt-1" hide-details density="compact" flat variant="outlined">
                                    <template #prepend>
                                        <v-btn variant="outlined" @click="fileinputclick">
                                            <v-icon>mdi-folder</v-icon> (0)
                                        </v-btn>
                                        <input type="file" multiple hidden id="file-input-23">
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-btn block color="primary" flat height="45" @click="valid">Submit</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
import { IPosts } from '../interfaces'
import { rules } from '../utils/rules'
import { create_post } from '../api/post'
import { useStore } from 'vuex'

const { getters } = useStore()
const form = ref<any|null>(null)
const postData = ref<IPosts>({
    title: "",
    categories: [],
    end_date: "",
    file_desc: "",
    intensity: 0,
    start_date: "",
    text: "",
})
const files = ref<File[]|null>(null)

const items = [
    'Does the patient have any allergies?',
    'Is the patient taking any medications?',
    'Has the patient previously had any serious illness or surgery?',
    'Is there loss of consciousness or changes in consciousness?',
    'Do you have breathing problems?',
]
const categoires = [
    'Category-1',
    'Category-2',
    'Category-3',
    'Category-4',
    'Category-5',
    'Category-6',
    'Category-7',
]
const fileinputclick = () => document.getElementById('file-input-23').click()

const valid = async () => {
    const { valid } = await form.value.validate();
    if (valid) {
        const formdata = new FormData()
        Object.keys(postData.value).map((key) => {
            formdata.append(key, postData.value[key])
        })
        formdata.append('sender', getters.userid)
        await create_post(formdata)
        Object.assign(postData.value, {
            title: "",
            categories: [],
            end_date: "",
            file_desc: "",
            intensity: 0,
            start_date: "",
            text: "",
        })
        alert('Successfully Created')
    }
}
</script>