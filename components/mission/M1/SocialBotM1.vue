<template >
    <div>
        <div>
            <div class="font-title2 font-weight-medium mt-8">จำนวน Social Bot</div>
            <v-card class="pa-5 card-stat-shadow">
                <v-row v-if="socialBot.length">
                    <v-col v-for="(bot, index) in socialBot" :key="index" cols="6" sm="3" md="">
                        <div class="text-center mx-auto">
                            <div class="mb-3">
                                <v-img v-if="bot.platform === 'facebook'" src="/cfb.png" width="50" height="50"   class="text-center mx-auto"/>
                                <v-img v-if="bot.platform === 'instagram'" src="/cig.png" width="50" height="50"  class="text-center mx-auto"/>
                                <v-img v-if="bot.platform === 'x'" src="/ctw.png" width="50" height="50"  class="text-center mx-auto"/>
                                <v-img v-if="bot.platform === 'youtube'" src="/cyt.png" width="50" height="50"  class="text-center mx-auto"/>
                                <v-img v-if="bot.platform === 'tiktok'" src="/tt.png" width="50" height="50"  class="text-center mx-auto"/>
                            </div>
                            <div class="font-title3 font-weight-medium">{{ bot.platform }}</div>
                            <div class="text-h4 font-weight-medium">{{ formatNumber(bot.count) }}</div>
                            <div :class="{
                                'text-green-darken-3': bot.change > 0,
                                'text-red': bot.change < 0,
                                'text-muted': bot.change === 0
                            }">
                                <v-icon small>
                                    {{ bot.change > 0 ? 'mdi-arrow-up' : bot.change < 0 ? 'mdi-arrow-down' : 'mdi-minus'
                                        }} </v-icon>
                                        {{ bot.change > 0 ? '+' : '' }}{{ bot.change !== 0 ? bot.change : '' }}
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </div>

    </div>
</template>

<script setup>
const { getTeamColor } = useColors();
import { ref } from "vue";
const socialBot = ref([
    { platform: "facebook", count: 1030, change: 50 },
    { platform: "x", count: 650, change: 50 },
    { platform: "youtube", count: 200, change: -5 },
    { platform: "tiktok", count: 30, change: 0 },
    { platform: "instagram", count: 50, change: 0 },
]);


</script>
<style >
    
</style>