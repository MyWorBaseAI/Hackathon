<template>
  <v-container class="h-100">
    <v-row class="h-100" align="center" justify="center">
        <v-card max-width="400" width="100%" flat border>
            <v-card-text class="d-flex justify-center pb-0">
                <v-avatar size="150" rounded>
                    <v-img src="/logo-2.svg"></v-img>
                </v-avatar>
            </v-card-text>
            <v-card-title class="text-center text-primary text-h5 font-weight-bold">Tizimga Kirish</v-card-title>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-col cols="12" class="d-flex justify-center">
                            <v-btn :href="getGoogleUrl()" flat block height="43" elevation="1" class="text-none" color="secondary">
                                <v-icon class="mr-5">mdi-google</v-icon> Sign in with Google
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { getGoogleUrl } from '../utils/googleUrl'

</script>

<style>
.normal-input::placeholder {
    font-size: 11px !important;
}
</style>