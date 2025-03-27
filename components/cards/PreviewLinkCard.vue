<template>
  
    <v-card v-if="preview"
        border="1" elevation="1" 
        class="d-flex w-100 border-sm pa-2 pa-md-4 ma-4 align-center text-decoration-none" :href="preview.url"
        target="_blank">
        <v-row class="d-none d-md-flex">
            <v-col cols="12" md="8" lg="9" >
                <a :href="preview.url" target="_blank"
                    class="text-blue-darken-2 text-decoration-none font-weight-medium">
                    {{ preview.title }}
                </a>
                <v-card-title class="px-0">{{ preview.title }}</v-card-title>
                <v-card-subtitle class="px-0">{{ preview.site }}</v-card-subtitle>
                <v-card-text class="px-0 pb-0 truncate-text-3">
                    {{ preview.description }}
                </v-card-text>
                <div class="text-grey-darken-1 text-body-2 truncate-text-3">
                    {{ preview.metadata }}
                </div>
            </v-col>
            <v-col cols="12" md="4" lg="3" class="">
                <v-avatar size="200" class="w-100" rounded="0">
                    <v-img v-if="preview.image" :src="preview.image" alt="preview image" cover></v-img>
                </v-avatar>
            </v-col>
        </v-row>
        <v-col col="12" class="d-sm-block d-md-none pa-0">
            <v-col cols="12" md="8" lg="9" class="px-0 pt-0" >
                <a :href="preview.url" target="_blank"
                    class="text-blue-darken-2 text-decoration-none font-weight-medium">
                    {{ preview.title }}
                </a>
                <v-card-title class="px-0">{{ preview.title }}</v-card-title>
                <v-card-subtitle class="px-0">{{ preview.site }}</v-card-subtitle>
                <v-card-text class="px-0 pb-0 truncate-text-3">
                    {{ preview.description }}
                </v-card-text>
                <div class="text-grey-darken-1 text-body-2 truncate-text-3">
                    {{ preview.metadata }}
                </div>
            </v-col>
            <v-col cols="12" md="4" lg="3" class="pa-0">
                <v-avatar size="200" class="w-100" rounded="0">
                    <v-img v-if="preview.image" :src="preview.image" alt="preview image" cover></v-img>
                </v-avatar>
            </v-col>
        </v-col>

    </v-card>
  </template>
  
  <script setup>
  defineProps({
    preview: Object,
  });
  </script>
  