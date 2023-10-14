<template>
  <v-container class="h-screen">
    <v-row class="h-100" align="center" justify="center">
        <!-- <v-col class="12"> -->
            <v-card max-width="400" min-width="300" width="100%">
                <v-card-title class="text-center">TASDIQLASH KODI</v-card-title>
                <v-card-subtitle class="text-center">+998 00 000 00 00 raqamiga sms kod yuborildi</v-card-subtitle>
                <v-card-text>
                    <v-form>
                        <v-row justify="center">
                            <v-col cols="8">
                                <v-otp-input length="4" placeholder="-" hide-details density="compact"></v-otp-input>
                            </v-col>
                            <v-col cols="12" class="pb-0">
                                <v-btn block height="43" elevation="1" variant="outlined">
                                    Qayta yuborish 00:00
                                </v-btn>
                            </v-col>
                            <v-col cols="12">
                                <v-btn block height="43" elevation="1" color="primary">
                                    Tasdiqlah
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        <!-- </v-col> -->
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

</script>

<style>
.normal-input::placeholder {
    font-size: 11px !important;
}
</style>