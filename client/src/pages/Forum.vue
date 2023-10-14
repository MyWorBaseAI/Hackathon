<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card flat border>
          <v-card-title class="d-flex justify-space-between align-center">
            <v-list-item v-if="true" class="post-item-list pl-0" density="compact">
              <template #prepend>
                <v-avatar color="primary" size="45">
                  <span>DK</span>
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-bold text-h6 mb-1">Where Is My Health ?</v-list-item-title>
              <v-list-item-subtitle>Doooooseeee Meeem</v-list-item-subtitle>
            </v-list-item>
            <span v-else class="text-h5 font-weight-bold">Where is My Health?</span>
            <span class="text-body-2">
              Pain intensity
              <v-chip color="orange" class="ml-2" label>4/5</v-chip>
            </span>
          </v-card-title>
          <v-card-text class="py-0">
            <div>
              <v-chip label density="comfortable" color="secondary" class="text-caption">stared March 20, 2025. 20:12</v-chip>
              <v-chip label density="comfortable" color="secondary" class="text-caption ml-2">published March 20, 2025. 20:12</v-chip>
            </div>
          </v-card-text>
          <v-card-text>
            <v-card-title class="px-0 py-0 text-body-h6 font-weight-bold">Description</v-card-title>
            <v-card color="grey-lighten-5" flat>
              <v-card-text class="text-grey-darken-3">
                Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. За ручеек буквоград он? Себя залетают за имени безопасную о своего сбить повстречался прямо злых текст? Единственное, речью. Семь толку рекламных наш своих до, дороге большого страна переулка вопроса решила злых океана диких моей безорфографичный послушавшись выйти одна! Себя залетают родного всеми своего агентство даже. Безопасную большой то сих однажды?
              </v-card-text>
            </v-card>
          </v-card-text>
          <v-card-text class="pt-0 d-flex justify-space-between flex-wrap align-center">
            <div class="d-flex flex-wrap" style="gap: 5px">
              <v-chip density="comfortable" link class="text-caption" color="primary" label v-for="i in 4" :key="i">Category {{i+1}}</v-chip>
            </div>
            <span class="text-caption text-gray d-flex align-center">
              
            </span>
          </v-card-text>
          <v-card-text class="pt-0 d-flex justify-space-between flex-wrap align-center">
            <div class="d-flex flex-wrap px-2 text-caption" style="gap: 2px">
              <span>153 views</span>/<span>6 replies</span>
            </div>
            <span class="text-caption text-gray d-flex align-center">
              Feb 4, 2014 at 20:56
              <v-icon class="ml-2" size="x-small">mdi-clock-outline</v-icon>
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <div class="w-100 d-flex justify-space-between align-center py-0">
          <span class="text-h6">106 Replies</span>
          <div style="width: 170px;">
            <v-select label="Order By" hide-details variant="outlined" density="compact" flat />
          </div>
        </div>
        <v-list class="comment-list">
          <v-list-group>
            <template v-slot:activator="{ props, isOpen }">
              <v-list-item border class="py-3" append-icon :ripple="false">
                <template #prepend style="align-self: start;">
                  <v-btn to="/profile/2" variant="text" color="white" rounded="circle" size="45" class="mr-2">
                    <v-avatar color="primary" size="45">
                      <span>AC</span>
                    </v-avatar>
                  </v-btn>
                </template>
                <v-list-item-title class="mt-1">Doooooseeee Meem</v-list-item-title>
                <p class="text-caption text-grey-darken-2">
                  Далеко-далеко за словесными горами в стране гласных, и согласных живут рыбные тексты. Рукопись, повстречался наш диких сих скатился подзаголовок имеет однажды, силуэт свою, послушавшись возвращайся путь решила грустный переписали но пояс снова.
                </p>
                <v-list-item-action class="mt-3 d-flex align-center justify-space-between">
                  <div>
                    <v-btn v-bind="props" class="text-caption mr-1" rounded="xl" density="compact" variant="outlined">10 comments <v-icon>mdi-menu-{{isOpen?'up':'down'}}</v-icon></v-btn>
                    <v-btn class="text-caption mr-1" rounded="xl" density="compact" variant="outlined"><v-icon class="mr-1">mdi-thumb-up-outline</v-icon> 10</v-btn>
                    <v-btn class="text-caption" rounded="xl" density="compact" variant="outlined"><v-icon class="mr-1">mdi-thumb-down-outline</v-icon> 5</v-btn>
                  </div>
                  <span class="text-caption text-gray d-flex align-center">
                    Feb 4, 2014 at 20:56
                    <v-icon class="ml-2" size="x-small">mdi-clock-outline</v-icon>
                  </span>
                </v-list-item-action>
              </v-list-item>
            </template>

            <v-list-item v-for="i in 6" :key="i" class="py-2">
                <template #prepend>
                  <v-avatar color="primary">
                    <span>AC</span>
                  </v-avatar>
                </template>
                <v-list-item-title>Doooooseeee Meem</v-list-item-title>
                <p class="text-caption text-grey-darken-2">
                  Далеко-далеко за словесными горами в стране гласных, и согласных живут рыбные тексты. Рукопись, повстречался наш диких сих скатился подзаголовок имеет однажды, силуэт свою, послушавшись возвращайся путь решила грустный переписали но пояс снова.
                </p>
                <v-list-item-action class="mt-3 d-flex align-center justify-space-between">
                  <div>
                    <v-btn class="text-caption mr-1" rounded="xl" density="compact" variant="outlined"><v-icon class="mr-1">mdi-thumb-up-outline</v-icon> 10</v-btn>
                    <v-btn class="text-caption" rounded="xl" density="compact" variant="outlined"><v-icon class="mr-1">mdi-thumb-down-outline</v-icon> 5</v-btn>
                  </div>
                  <span class="text-caption text-gray d-flex align-center">
                    Feb 4, 2014 at 20:56
                    <v-icon class="ml-2" size="x-small">mdi-clock-outline</v-icon>
                  </span>
                </v-list-item-action>
              </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>

</script>

<style>
.comment-list .v-list-item__prepend{
  margin-top: 8px;
  align-self: flex-start !important;
}
</style>