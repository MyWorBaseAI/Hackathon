<template>
  <v-container fluid class="h-screen">
    <v-row class="h-100" align="center" justify="center">
        <v-col class="6"></v-col>
        <v-col class="6">
            <v-card>
                <v-card-title class="text-center">TIZIMGA KIRISH</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field color="primary" class="normal-input" density="compact" hide-details placeholder="__-___-__-__" variant="outlined">
                                    <template #prepend>
                                        <!-- <div style="margin-bottom: 2px;" class="bg-primary h-100 rounded-sm d-flex align-center px-2"> -->
                                            <v-icon size="20">mdi-phone</v-icon>
                                            <span style="margin-bottom: 2px;">+998</span>
                                        <!-- </div> -->
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-btn block height="43" elevation="1" color="primary">
                                    sms kod olish
                                </v-btn>
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

</script>

<style>
.normal-input::placeholder {
    font-size: 11px !important;
}
</style>