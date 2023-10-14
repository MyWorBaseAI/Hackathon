<template>
  <v-container>
    <v-row>
        <v-col>
            <v-card flat border>
                <!-- <v-card-title></v-card-title> -->
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="9">
                            <span class="font-weight-bold text-h6 text-black">What happened?</span>
                            <v-text-field placeholder="Write about a problem" class="mt-1" hide-details density="compact" flat variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="0" sm="3"></v-col>
                        <v-col cols="12" sm="9">
                            <span class="font-weight-bold text-h6 text-black">When did it start?</span>
                            <v-row class="pt-1">
                                <v-col cols="6">
                                    <v-text-field label="Start" type="date" placeholder="Write about a problem" class="mt-1" hide-details density="compact" flat variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="End" type="date" placeholder="Write about a problem" class="mt-1" hide-details density="compact" flat variant="outlined"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="9">
                            <span class="font-weight-bold text-h6 text-black">Causes</span>
                            <div class="d-flex flex-wrap align-start mt-1" style="gap: 5px">
                                <v-chip label density="comfortable" color="secondary" class="text-caption" v-for="item, i in items" :key="i">{{ item }}</v-chip>
                            </div>
                            <v-textarea placeholder="Write about a problem" class="mt-3" hide-details density="compact" flat variant="outlined" no-resize />
                        </v-col>
                        <v-col cols="12" sm="9">
                            <span class="font-weight-bold text-h6 text-black">Current pain intensity</span>
                            <v-slider color="secondary" density="compact" hide-details step="1" :max="5" show-ticks="always" tick-size="3">
                                <template #append>
                                    4/5
                                </template>
                            </v-slider>
                        </v-col>
                        <v-col cols="12" sm="9">
                            <span class="font-weight-bold text-h6 text-black">Additional information</span>
                            <v-text-field multiple chips placeholder="Describe your file" class="mt-1" hide-details density="compact" flat variant="outlined">
                                <template #prepend>
                                    <v-btn variant="outlined" @click="fileinputclick">
                                        <v-icon>mdi-folder</v-icon> (0)
                                    </v-btn>
                                    <input type="file" multiple hidden id="file-input-23">
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-btn block color="primary" flat height="45">Submit</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const shipping = ref(0)
const step = ref(1)
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
</script>