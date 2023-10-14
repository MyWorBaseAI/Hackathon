<template>
  <v-container>
    <v-row>
        <v-col cols="12">
            <v-list-item border lines="3" class="pa-3 profile-list">
                <template #prepend>
                    <v-avatar size="100" class="mr-3">
                        <v-img cover src="https://www.elitesingles.co.uk/wp-content/uploads/sites/59/2019/11/ed_de_articleimages2.jpg" />
                    </v-avatar>
                </template>
                <span class="text-h5">Baklajan Bordered</span>
                <div class="my-2">
                    <v-chip label color="primary" density="comfortable">Expert For Eyes and Nouse</v-chip>
                </div>
                <div class="text-body-2 mt-3 text-grey-darken-1">
                    <span>255 reviews</span>
                    <span class="ml-4">65 rates</span>
                </div>
                <template #append>
                    <v-btn variant="flat" color="primary">Send Request</v-btn>
                </template>
            </v-list-item>
        </v-col>
        <v-col cols="12" md="6">
            <v-sheet border width="100%" class="pa-3">
                <v-table density="comfortable">
                    <tbody>
                        <tr v-for="item in 4" :key="item">
                            <td><v-chip label variant="flat" color="primary">Label {{item+1}}</v-chip></td>
                            <td class="text-right">12 replies</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-sheet>
        </v-col>
        <v-col cols="12" md="6">
            <v-sheet border width="100%" class="pa-3">
                <v-table density="comfortable">
                    <tbody>
                        <tr v-for="item in 4" :key="item">
                            <td><v-chip label variant="flat" color="primary">Label {{item}}</v-chip></td>
                            <td class="text-right text-caption text-grey" >4 Feb, 2014 20:15</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-sheet>
        </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

</script>

<style>
.profile-list .v-list-item__append{
    height: 100%;
    display: flex;
    align-items: end;
}
</style>