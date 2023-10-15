<template>
  <v-container>
    <v-row>
        <v-col>
            <v-card flat border>
                <v-card-text>
                    <v-form ref="form">
                        <v-row>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold text-h6 text-black">Что вас беспокоит?</span>
                                <v-text-field v-model="postData.title" :rules="rules" placeholder="Опишите вашу проблему" class="mt-1" hide-details density="compact" flat variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold text-h6 text-black">Когда это началось?</span>
                                <v-row class="pt-1">
                                    <v-col cols="6">
                                        <v-text-field v-model="postData.start_date" :rules="rules" label="Началось" type="date" class="mt-1" hide-details density="compact" flat variant="outlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field v-model="postData.end_date" :rules="rules" label="До" type="date" class="mt-1" hide-details density="compact" flat variant="outlined"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold text-h6 text-black">Какие у вас наблюдаются симптомы?</span>
                                <span class="d-flex text-caption text-grey-darken-1 mb-2">Примерные вопросы</span>
                                <div class="d-flex flex-wrap align-start mt-1" style="gap: 5px">
                                    <v-chip label density="comfortable" color="secondary" class="text-caption" v-for="item, i in items" :key="i">{{ item }}</v-chip>
                                </div>
                                <v-textarea v-model="postData.text" :rules="rules" placeholder="Напишите подробную информацию" class="mt-3" hide-details density="compact" flat variant="outlined" no-resize />
                            </v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold text-h6 text-black">Какова сейчас интенсивность боли по шкале от 1 до 5?</span>
                                <v-slider v-model="postData.intensity" color="secondary" density="compact" hide-details step="1" :max="5" show-ticks="always" tick-size="3">
                                    <template #append>
                                        {{postData.intensity}} / 5
                                    </template>
                                </v-slider>
                            </v-col>
                            <!-- <v-col cols="12" md="9">
                                <span class="font-weight-bold text-h6 text-black">Выберите категорию</span>
                                <v-select :items="categories" multiple v-model="postData.categoires" :rules="rules" class="mt-1" hide-details density="compact" flat variant="outlined" />
                            </v-col> -->
                            <!-- <v-col cols="12" md="9">
                                <span class="font-weight-bold text-h6 text-black">Дополнительная информация</span>
                                <span class="d-flex text-caption text-grey-darken-1 mb-2">Оставьте дополнительные файлы которые помогут нам узнать по подробней о вашей проблеме</span>
                                <v-text-field v-model="postData.file_desc" multiple chips placeholder="Опишите ваши файлы" class="mt-1" hide-details density="compact" flat variant="outlined">
                                    <template #prepend>
                                        <v-btn variant="outlined" @click="fileinputclick">
                                            <v-icon>mdi-folder</v-icon> (0)
                                        </v-btn>
                                        <input type="file" multiple hidden id="file-input-23">
                                    </template>
                                </v-text-field>
                            </v-col> -->
                            <v-col cols="12" sm="6" md="4">
                                <v-btn block color="primary" flat height="45" @click="valid">Опубликовать вопрос</v-btn>
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
import { categories } from '../utils/categoires'

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
    'Имеется ли у вас аллергия?',
    'Принимали ли вы какие то лекарства?',
    'Были ли ранее у вас серьезные заболевания или операции?',
    'Есть ли потеря сознания или изменения в сознании?',
    'Есть ли проблемы с дыханием?',
]

const fileinputclick = () => document.getElementById('file-input-23').click()

const valid = async () => {
    const { valid } = await form.value.validate();
    if (valid) {
        await create_post({...postData.value, sender: getters.userid} as any)
        Object.assign(postData.value, {
            title: "",
            categories: [],
            end_date: "",
            file_desc: "",
            intensity: 0,
            start_date: "",
            text: "",
        })
        alert('Создано успешно')
    }
}
</script>