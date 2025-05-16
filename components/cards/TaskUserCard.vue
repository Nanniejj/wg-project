<template>
    <div>
        <v-card rounded="lg" class="pa-4" elevation="4">
            <!-- header card -->
            <v-row>
                <v-col cols="auto" sm="2">
                    <v-avatar :color="getMissionColor(props.item.mission)" rounded="lg"></v-avatar>
                </v-col>
                <v-col cols="7" sm="10" class="px-0 py-2 px-sm-2">
                    <v-card-title class="px-sm-2 pa-0 px-md-4 pa-lg-0">{{ props.item.mission }}</v-card-title>
                    <v-card-subtitle class="px-sm-2 pa-0 px-md-4 pa-lg-0">{{ getMissionName(item.mission) }}</v-card-subtitle>
                </v-col>
            </v-row>

            <!-- description -->
            <div class="pb-3 pt-3">
                <v-card-text class="pa-2 px-0 truncate-text-1">
                    รายระเอียด : {{ props.item.description || "-" }}
                </v-card-text>
            </div>

            <!-- status -->
            <v-row>
                <v-col cols="7" sm="7" md="6" lg="7" class="text-start py-0 d-flex align-end">
                    <v-card-text class="px-0 truncate-text-1" v-if="(props.item.start_date) && (props.item.end_date)">
                        <v-icon icon="mdi-calendar-blank"></v-icon>
                        {{ formatDate(props.item.start_date) }} - {{ formatDate(props.item.end_date) }}
                    </v-card-text>
                    <v-card-text class="px-0 truncate-text-1" v-else><v-icon icon="mdi-calendar-blank"></v-icon> -
                    </v-card-text>
                </v-col>
                <v-col cols="5" sm="5" md="6" lg="5" class="text-end pa-0 d-flex align-end">
                    <v-card-text class="py-4 px-2"
                        :style="{ color: getColorPriority(getPriorityTitle(props.item.priority)) }">ระดับ{{
                        getPriorityTitle(props.item.priority) }}</v-card-text>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>
<script setup>
const { getTeamColor, getMissionColor, getMissionName, getColorPriority } = useColors();
const props = defineProps({
    item: Object,
    title: String,
    // status: String,
});
const priority = ref([
    {title:"ทั้งหมด", value:"all"},
    {title:"ต่ำ", value:"low"},
    {title:"ปานกลาง", value:"medium"},
    {title:"สูง", value:"high"},
]);

function getPriorityTitle (itemValue) {
    return priority.value.find(item => item.value === itemValue ).title
};
</script>
<style></style>