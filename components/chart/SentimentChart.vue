<template>
    <v-row class="d-flex flex-column ga-2">
        <!-- Positive -->
        <v-col>
            <v-row class="align-center">
                <v-col cols="auto">
                    <v-icon size="35" color="green lighten-1">mdi-emoticon-happy-outline</v-icon>
                </v-col>
                <v-col>
                    <v-progress-linear :model-value="valpos" height="20" color="green lighten-1" rounded class="mb-1" />

                </v-col>
                <v-col cols="auto">
                    <div class="text-caption font-weight-bold text-positive">
                        {{ positive | numFormat }} posts
                    </div>
                </v-col>
            </v-row>
        </v-col>

        <!-- Neutral -->
        <v-col>
            <v-row class="align-center">
                <v-col cols="auto">
                    <v-icon size="35" color="light-blue-darken-3">mdi-emoticon-neutral-outline</v-icon>
                </v-col>
                <v-col>
                    <v-progress-linear :model-value="valneutral" height="20" color="light-blue-darken-3" rounded
                        class="mb-1" />

                </v-col>
                <v-col cols="auto">
                    <div class="text-caption font-weight-bold text-neutral">
                        {{ neutral | numFormat }} posts
                    </div>
                </v-col>
            </v-row>
        </v-col>

        <!-- Negative -->
        <v-col>
            <v-row class="align-center">
                <v-col cols="auto">
                    <v-icon size="35" color="red lighten-1">mdi-emoticon-sad-outline</v-icon>
                </v-col>
                <v-col>
                    <v-progress-linear :model-value="valnag" height="20" color="red lighten-1" rounded class="mb-1" />

                </v-col>
                <v-col cols="auto">
                    <div class="text-caption font-weight-bold text-negative">
                        {{ negative | numFormat }} posts
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
const { positive, neutral, negative } = defineProps<{
    positive: number
    neutral: number
    negative: number
}>()

const maxValue = computed(() =>
    Math.max(positive, neutral, negative)
)

const valpos = computed(() =>
    maxValue.value > 0 ? (positive * 100) / maxValue.value : 0
)

const valneutral = computed(() =>
    maxValue.value > 0 ? (neutral * 100) / maxValue.value : 0
)

const valnag = computed(() =>
    maxValue.value > 0 ? (negative * 100) / maxValue.value : 0
)
</script>


<style scoped>
.text-positive {
    color: #53b993;
    margin-left: 8px;
    min-width: fit-content;
}

.text-neutral {
    color: #368ab6;
    margin-left: 8px;
    min-width: fit-content;
}

.text-negative {
    color: #f06964;
    margin-left: 8px;
    min-width: fit-content;
}
</style>
