<template>
    <v-container class="px-md-16">
        <v-card class="card-stat-shadow pa-8">
        <v-row> 
            <v-col v-for="(stat, index) in stats" :key="index" cols="12" sm="6" md="3">
                <v-card class="py-2 card-stat-shadow h-100" :style="{ backgroundColor: stat.color, color: stat.textColor }">
                    <v-card-title class="text-h6">{{ stat.title }}</v-card-title>
                    <v-card-text v-if="stat.subCategories" class="text-body-2"> 
                        <v-row v-for="(item, index) in stat.subCategories" :key="index" >
                            <v-col cols="4" md="5" class="text-h6 truncate-text-1 font-weight-bold py-0 pr-0">
                                <!-- <span> -->
                                    {{ item.title }}
                                <!-- </span> -->
                            </v-col>
                            <v-col cols="2" class="text-h6 font-weight-bold text-end pa-0">
                                <!-- <span> -->
                                    {{ item.count }}
                                <!-- </span> -->
                            </v-col>
                            <v-col cols="auto" class="text-h6 py-0 px-1 text-end">
                                <span v-if="index == stat.subCategories.length-1">กิจกรรม</span>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-text v-else class="text-h6"> 
                        <span class="text-h6 font-weight-bold">
                            {{ stat.count }}
                        </span>
                        <span>
                            กิจกรรม
                        </span> 
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
</v-card>
    
    </v-container>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
    { title: 'กิจกรรมสนับสนุนทั้งหมด', count: 22, color: '#FEFCED', textColor: '#65632C' },
    { title: 'สนับสนุนเครือข่ายสื่อ', count: 7, color: '#FFD7D5', textColor: '#803935' },
    { title: 'สนับสนุน Influencer', count: 14, color: '#61A8D0', textColor: '#243050' },
    { title: 'สนับสนุนวิชาการ', count: 1, color: '#EDE67B' , textColor: '#656119',
        subCategories:[
            { title: 'เพจ', count: 3},
            { title: 'บทความ', count: 10},
            { title: 'เสวนา', count: 5},
        ]
    }
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
