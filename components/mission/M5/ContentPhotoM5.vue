<template>
     <v-card class="card-stat-shadow pa-8">
    <div class="font-title2 font-weight-medium my-5">Content</div>
    <div>
      <v-img
          :lazy-src="`./M5pic.png`"
          :src="`./M5pic.png`"
          
          class="bg-grey-lighten-2 w-100"
          cover
        ></v-img>
    </div>
    <v-row class="d-none">
      <v-col
        v-for="n in 12"
        :key="n"
        class="d-flex child-flex"
        cols="3"
      >
        <v-img
          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
          :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
          aspect-ratio="1"
          class="bg-grey-lighten-2"
          cover
        >
          <template v-slot:placeholder>
            <v-row
              align="center"
              class="fill-height ma-0"
              justify="center"
            >
              <v-progress-circular
                color="grey-lighten-5"
                indeterminate
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row></v-card>
  </template>