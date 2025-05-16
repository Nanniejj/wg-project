<template>
    <v-container>
        <v-card class="pa-3 pa-md-10 card-stat-shadow">
            <v-row>
                <v-col cols="4" md="2">
                    <div class="text-h6 font-weight-bold">เพจ ISOC จังหวัด</div>
                    <div class="text-h5 font-weight-bold">{{ data?.total_pages || 0 }}</div>
                    <div class="text-body-2">ช่องทาง</div>
                </v-col>
                <v-divider vertical class=""></v-divider>

                <v-col cols="4" md="2" class="text-center">
                    <v-icon size="30" color="#79afb8">mdi-comment-edit-outline</v-icon>
                    <!-- <div class="text-h6 font-weight-bold">โพสต์ทั้งหมด</div> -->
                    <div class="text-h5 font-weight-bold"> {{ data?.total_summary?.post_count || 0 }}</div>
                    <div class="text-body-2">posts</div>
                </v-col>
                <v-col cols="4" md="2" class="text-center">
                    <v-icon size="30" color="#79afb8">mdi-comment-text-multiple-outline</v-icon>
                    <!-- <div class="text-h6 font-weight-bold">shares</div> -->
                    <div class="text-h5 font-weight-bold">{{ data?.total_summary?.comments_count || 0 }}</div>
                    <div class="text-body-2">comments</div>
                </v-col>
                <v-col cols="4" md="2" class="text-center">
                    <v-icon size="30" color="#79afb8">mdi-thumb-up-outline</v-icon>
                    <!-- <div class="text-h6 font-weight-bold">likes</div> -->
                    <div class="text-h5 font-weight-bold">{{ data?.total_summary?.likes_count || 0 }}</div>
                    <div class="text-body-2">likes</div>
                </v-col>
                <v-col cols="4" md="2" class="text-center">
                    <v-icon size="30" color="#79afb8">mdi-share-outline</v-icon>
                    <!-- <div class="text-h6 font-weight-bold">shares</div> -->
                    <div class="text-h5 font-weight-bold">{{ data?.total_summary?.shares_count || 0 }}</div>
                    <div class="text-body-2">shares</div>
                </v-col>
                <!-- <v-col cols="4" md="2" class="text-center">
                    <div class="text-h6 font-weight-bold">shares</div>
                    <div class="text-h5 font-weight-bold">{{ data?.total_summary?.shares_count || 0 }}</div>
                    <div class="text-body-2">shares</div>
                </v-col> -->
            </v-row>
            <v-row justify="center" align="center">
                <v-col cols="" md="">
                    <v-row>
                        <v-col class="text-center" cols="6" md="6">
                            <v-chip color="cyan" class="ma-2">
                                <v-icon icon="mdi-circle" start></v-icon>
                                Active
                            </v-chip>
                            <!-- <div class="text-h6 font-weight-bold">มีการใช้งาน</div> -->
                            <div class="text-h5 font-weight-bold">{{ data?.active_pages || 0 }} <span
                                    class="text-body-2">เพจ</span></div>
                            <div class="box-scroll-at">
                                <div v-for="(list, k) in data?.data">
                                    <div v-if="list.active">
                                        {{ list.name_th }}</div>
                                </div>
                            </div>
                        </v-col>
                        <v-col class="text-center" cols="6" md="6">
                            <v-chip color="pink" class="ma-2">
                                <v-icon icon="mdi-circle" start></v-icon>
                                Inactive
                            </v-chip>
                            <!-- <div class="text-h6 font-weight-bold">ไม่มีการใช้งาน</div> -->
                            <div class="text-h5 font-weight-bold">{{ data?.inactive_pages || 0 }} <span
                                    class="text-body-2">เพจ</span></div>
                            <!-- <div class="text-body-2">เพจ</div> -->
                            <div class="box-scroll-it">
                                <div v-for="(list, k) in data?.data">
                                    <div v-if="!list.active">
                                       {{ list.name_th }} </div>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
                <!-- <v-col cols="" md="">
                    <div v-for="(list, k) in data?.data" class="box-scroll">
                        {{ list.name_th }} 
                    </div>
                </v-col> -->
                <v-col cols="" md="">
                    <PieChartActive :active="data?.active_pages || 0" :inactive="data?.inactive_pages || 0" />
                </v-col>
                <v-col>
                    <SentimentChart :positive="data?.total_summary?.sentiment_count?.positive || 0"
                        :neutral="data?.total_summary?.sentiment_count?.neutral || 0"
                        :negative="data?.total_summary?.sentiment_count?.negative || 0" class="py-2" />
                </v-col>
            </v-row>

            <!-- <v-row>
                <v-col v-for="(item, index) in stats" :key="index" cols="4" md="2" class="text-center">
                    <div>
                        <div class="text-h6 font-weight-bold">{{ item.label }}</div>
                        <div class="text-h5 font-weight-bold">{{ item.count }}</div>
                        <div class="text-body-2">โพสต์</div>
                    </div>
                </v-col>
            </v-row> -->
        </v-card>
    </v-container>
</template>

<script setup>
import SentimentChart from "./components/chart/SentimentChart.vue";
import PieChartActive from "./components/chart/PieChartActive.vue";

const stats = [
    { label: "C", count: 129 },
    { label: "D", count: 129 },
    { label: "E", count: 129 },
    { label: "F", count: 129 },
    { label: "G", count: 129 },
];
const data = ref([]);
onMounted(async () => {
    try {
        data.value = await getPageActive();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
});
</script>

<style scoped>
.box-scroll-at {
    padding: 10px;
    overflow-y: scroll;
    max-height: 180px;
    background-color: #e0f7f9;
    border-radius: 20px;
   
}
.box-scroll-it {
    padding: 10px;
    overflow-y: scroll;
    max-height: 180px;
    background-color: #fce4ec;
    border-radius: 20px;
   
}
.box-scroll-at::-webkit-scrollbar,
.box-scroll-it::-webkit-scrollbar {
  width: 2px;
}

.box-scroll-at::-webkit-scrollbar-thumb,
.box-scroll-it::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.box-scroll-at,
.box-scroll-it {
  scrollbar-width: thin;          /* Firefox */
  scrollbar-color: rgba(0,0,0,0.2) transparent;
}

.box-scroll-at::-webkit-scrollbar-button,
.box-scroll-it::-webkit-scrollbar-button {
  display: none;
  height: 0;
  width: 0;
}

.v-divider {
    height: auto;
}
</style>