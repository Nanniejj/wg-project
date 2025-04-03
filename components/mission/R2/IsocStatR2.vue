<template>
    <v-container>
        <v-card class="pa-10 card-stat-shadow">
            <v-row>
                <v-col cols="4" md="2">
                    <div class="text-h6 font-weight-bold">เพจ ISOC จังหวัด</div>
                    <div class="text-h5 font-weight-bold">79</div>
                    <div class="text-body-2">ช่องทาง</div>
                </v-col>
                <v-divider vertical class=""></v-divider>
                <v-col v-for="(item, index) in stats" :key="index" cols="4" md="2" class="text-center">
                    <div >
                        <div class="text-h6 font-weight-bold">{{ item.label }}</div>
                        <div class="text-h5 font-weight-bold">{{ item.count }}</div>
                        <div class="text-body-2">โพสต์</div>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script setup>
const stats = [
    { label: "C", count: 129 },
    { label: "D", count: 129 },
    { label: "E", count: 129 },
    { label: "F", count: 129 },
    { label: "G", count: 129 },
];
</script>

<style scoped>
.v-divider {
    height: auto;
}
</style>