<template>
    <div>
        <v-data-table :items="lobbyItems" show-select v-model="selected" item-value="user">
            <template #item.status="{ item }">
                <span v-if="item.status == 'pedding'" class="px-3 py-1" style="background: #96CCD5 0% 0% no-repeat padding-box;
box-shadow: 2px 3px 6px #00000029;
border-radius: 34px;">รอยืนยันสิทธิ์</span>
            </template>
            <template #item.team="{ item }">
                <div class="text-capitalize">{{ item.team }}</div>
            </template>
        </v-data-table>
    </div>
</template>
<script setup>
import { ref } from "vue";
const selected = ref([])
const lobbyItems = ref([
    { user: 'user01', team: 'c', date: '10 Jan 2568', status: 'pedding', note: '' },
    { user: 'user02', team: 'c', date: '10 Jan 2568', status: 'pedding', note: '' },
    { user: 'user03', team: 'd', date: '10 Jan 2568', status: 'pedding', note: '' },
    { user: 'user04', team: 'e', date: '10 Jan 2568', status: 'pedding', note: '' },
    { user: 'user05', team: 'f', date: '10 Jan 2568', status: 'pedding', note: '' },
    { user: 'user06', team: 'c', date: '10 Jan 2568', status: 'pedding', note: '' }
])
</script>
<style></style>