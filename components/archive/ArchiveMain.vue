<template>
    <v-container>
        <!-- Title -->
        <v-row>
            <v-col>
                <div class="font-title2 base-color">Archive</div>
            </v-col>
            <v-col cols="auto">
                <v-btn class="font-weight-bold" color="#46AFC7" rounded> Create new </v-btn>
            </v-col>
        </v-row>


        <!-- Search Bar -->
        <v-row class="mb-4" justify="center" align="center">
            <v-col cols="12" md="">
                <v-text-field v-model="search" placeholder="SEARCH" hide-details rounded variant="solo-filled"
                    append-inner-icon="mdi-camera-party-mode" @click:append-inner="toggleMarker">
                </v-text-field>
            </v-col>
            <v-col cols="auto"> <v-btn class="font-weight-bold" color="#2A3547" rounded> SEARCH </v-btn></v-col>
            <v-col cols="auto">
                <v-row justify="end">
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" rounded>
                                <v-icon>mdi-filter-outline</v-icon>
                                <span class="ml-2">Source by</span>
                            </v-btn>
                        </template>
                        <v-list>
                            <!-- Loop through menu options -->
                            <v-list-item v-for="(option, index) in menuOptions" :key="index" :value="index">
                                <v-list-item-title>
                                    <v-icon :icon="option.icon" class="me-2"></v-icon>
                                    {{ option.title }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-row>
            </v-col>
        </v-row>

        <!-- Categories -->
        <v-container>
            <v-row class="mb-4" justify="start">
                <v-col cols="12" md="4">
                    <v-card class="pa-5 card-stat-shadow card-archive" max-width="230">
                        <v-row justify="center" align="center">
                            <v-col justify="center" align="center" cols="4">
                                <div style="background-color:#FECE2F;" class="pa-2 text-center box-a-menu">
                                    <v-icon color="white" size="30">mdi-image-outline</v-icon>
                                </div>
                            </v-col>
                            <v-col>
                                <div class="font-subtitle"> Image </div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="pa-5 card-stat-shadow card-archive" max-width="230">
                        <v-row justify="center" align="center">
                            <v-col justify="center" align="center" cols="4">
                                <div style="background-color:#210504;" class="pa-2 text-center box-a-menu">
                                    <v-icon color="white" size="30">mdi-file-chart-outline</v-icon>
                                </div>
                            </v-col>
                            <v-col>
                                <div class="font-subtitle"> Infographic </div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="pa-5 card-stat-shadow card-archive" max-width="230">
                        <v-row justify="center" align="center">
                            <v-col justify="center" align="center" cols="4">
                                <div style="background-color:#6BB9DB;" class="pa-2 text-center box-a-menu">
                                    <v-icon color="white" size="30">mdi-video-box</v-icon>
                                </div>
                            </v-col>
                            <v-col>
                                <div class="font-subtitle"> Video </div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <!-- Sort By Dropdown -->

    </v-container>
</template>

<script setup>
import { ref } from "vue";

const search = ref("");
const menuOptions = ref([
    { title: "Name", icon: "mdi-format-letter-case" },
    { title: "Latest date", icon: "mdi-calendar-range" },
    { title: "Tags", icon: "mdi-tag-outline" },
    { title: "Location", icon: "mdi-map-marker-outline" },
    { title: "Document", icon: "mdi-file-document-outline" },
]);
</script>

<style scoped>
:hover.card-archive {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    cursor: pointer;
}

.box-a-menu {
    box-shadow: inset 0px 0px 0px #00000029, 2px 3px 6px #00000029;
    border-radius: 13px;
}
</style>
