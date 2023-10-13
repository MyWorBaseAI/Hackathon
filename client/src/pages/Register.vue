<template>
  <v-container fluid class="h-screen">
    <v-row class="h-100" align="center" justify="center">
        <!-- <v-col class="12"> -->
            <v-card max-width="400" min-width="300" width="100%">
                <v-card-title class="text-center">MA'LUMOTLARNI TO'LDIRING</v-card-title>
                <!-- <v-card-subtitle class="text-center">+998 00 000 00 00 raqamiga sms kod yuborildi</v-card-subtitle> -->
                <v-card-text>
                    <div class="d-flex justify-center pb-3">
                        <v-tabs v-model="tab">
                            <v-tab variant="flat" color="primary">Bemor</v-tab>
                            <v-tab variant="flat" color="primary">Shifokor</v-tab>
                        </v-tabs>
                    </div>
                    <v-window v-model="tab">
                        <v-window-item :value="0">
                            <v-form>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field placeholder="First Name" hide-details density="compact" variant="outlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field placeholder="Second Name" hide-details density="compact" variant="outlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field placeholder="Age" hide-details density="compact" variant="outlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="8">
                                        <v-text-field placeholder="Gender" hide-details density="compact" variant="outlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-btn block height="43" elevation="1" color="primary">
                                            Yuborish
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-window-item>
                        <v-window-item :value="1">
                            <v-form>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field label="First Name" hide-details density="compact" variant="outlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Second Name" hide-details density="compact" variant="outlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field placeholder="Age" hide-details density="compact" variant="outlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="8">
                                        <v-text-field placeholder="Gender" hide-details density="compact" variant="outlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="9">
                                        <v-text-field placeholder="Category" hide-details density="compact" variant="outlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field placeholder="Work Exp." hide-details density="compact" variant="outlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-btn block height="43" elevation="1" color="primary">
                                            Yuborish
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card>
        <!-- </v-col> -->
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";


const tab = ref(0)
</script>

<style>
.normal-input::placeholder {
    font-size: 11px !important;
}
</style>