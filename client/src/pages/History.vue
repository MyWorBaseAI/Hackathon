<template>
  <v-container class="pt-5">
    <v-row>
      <v-col cols="12" v-for="i in 6" :key="6" class="py-2">
        <v-card link flat border to="/forum/1">
          <!-- <template #prepend>
            <div class="h-100p d-flex flex-column justify"></div>
          </template> -->
          <v-card-title class="d-flex justify-space-between flex-wrap align-start">
            <v-list-item v-if="true" class="post-item-list pl-0" density="compact">
              <template #prepend>
                <v-avatar color="primary" size="45">
                  <span>DK</span>
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-bold text-h6 mb-1">Where Is My Health ?</v-list-item-title>
              <v-list-item-subtitle>Doooooseeee Meeem</v-list-item-subtitle>
            </v-list-item>
            <span v-else class="font-weight-medium">Where Is My Health ?</span> <br>
            <div class="d-flex align-center">
              <v-chip label variant="text" density="comfortable" class="text-caption text-grey"><v-icon size="x-small" class="mr-1">mdi-eye-outline</v-icon> 255</v-chip>
              <v-chip label color="green" variant="flat" density="comfortable" class="text-caption ml-0">5 asnwers <v-icon size="x-small" class="ml-2">mdi-check</v-icon></v-chip>
            </div>
          </v-card-title>
          <v-card-text class="text-grey-darken-2 text-caption">
            Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Рот над свою жизни, грустный гор собрал имени сбить. Курсивных предложения lorem щеке силуэт это, не алфавит заголовок домах агентство рот там речью текстов безорфографичный путь ручеек переписывается которой мир!
          </v-card-text>
          <v-card-text class="pt-0 d-flex justify-space-between flex-wrap align-center">
            <div class="d-flex flex-wrap" style="gap: 5px">
              <v-chip density="comfortable" link class="text-caption" color="primary" label v-for="i in 4" :key="i">Category {{i+1}}</v-chip>
            </div>
            <span class="text-caption text-gray d-flex align-center">
              Feb 4, 2014 at 20:56
              <v-icon class="ml-2" size="x-small">mdi-clock-outline</v-icon>
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>

</script>

<style>
.post-item-list .v-list-item__prepend {

}
</style>