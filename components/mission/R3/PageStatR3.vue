<template>
    <v-container>
        <v-card class="pa-10 card-stat-shadow">
            <v-row>
                <v-col v-for="(item, index) in items" :key="index" cols="2" md="" class="">
                    <div>
                        <div class="text-h6 font-weight-bold">{{ item.team }}</div>
                        <div>
                            <span class="text-h5 font-weight-bold">{{ item.province }}</span> 
                            <span class="ml-2">ช่องทาง</span>
                        </div>
                        <div>
                            <span class="text-h5 font-weight-bold">{{ item.channel }}</span> 
                            <span class="ml-2">ช่องทาง</span>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script setup>
const items = [
    { team: "C", province: 10, channel: 50 },
    { team: "D", province: 10, channel: 50 },
    { team: "E", province: 10, channel: 50 },
    { team: "F", province: 10, channel: 50 },
    { team: "G", province: 10, channel: 50 },
];
</script>

<style scoped>
.v-card {
    border-radius: 12px;
}
</style>