<template>
    <v-container>
        <v-card class="card-stat-shadow pa-8">
        <v-row> 
            <v-col v-for="(stat, index) in stats" :key="index" cols="12" sm="6" md="3">
                <v-card :color="stat.color" dark class="pa-5 card-stat-shadow">
                    <v-card-title class="text-h6 text-white">{{ stat.title }}</v-card-title>
                    <v-card-subtitle class="text-h4 font-weight-bold">{{ stat.count }} ประเด็น</v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
</v-card>
        <v-card class="mt-4 card-stat-shadow">
            <v-card-title>ตอบโต้ข้อมูลบิดเบือนแล้วกับสถาบัน</v-card-title>
            <v-card-text>
                <v-chip v-for="(topic, index) in topics" :key="index" class="ma-1" variant="outlined" size="lg">
                   <span class="pa-2">ประเด็นที่ {{ index + 1 }} {{ topic }}</span> 
                </v-chip>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
    { title: 'ทั้งหมด', count: 22, color: '#713479' },
    { title: 'ตอบโต้ข้อมูลบิดเบือนเกี่ยวกับสถาบัน', count: 7, color: '#53a4b2' },
    { title: 'ตอบโต้กลุ่มเห็นต่าง', count: 14, color: '#EF6D40' },
    { title: 'อื่นๆ', count: 1, color: '#462929' }
])

const topics = ref([
    'แนวความคิดประชาธิปไตย',
    'ความมั่นคงของประเทศประกอบไปด้วย',
    'ความมั่นคงของประเทศประกอบไปด้วย',
    'ความมั่นคงของประเทศประกอบไปด้วย',
    'ความมั่นคงของประเทศประกอบไปด้วย',
    'ความมั่นคงของประเทศประกอบไปด้วย',
    'ความมั่นคงของประเทศประกอบไปด้วย'
])
</script>


<style scoped>

</style>
