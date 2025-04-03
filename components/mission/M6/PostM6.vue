<template>
    <div>
        <div>
            <v-chip variant="elevated" color="#F8D581" size="x-large" class="mt-4"> <span
                    class="text-h6">ราชินีแข่งเรือใบ</span></v-chip>
        </div>
        <v-row>
            <v-col>
                <div class="font-title2 font-weight-medium my-5"> Top 5 (Engagement) </div>
                <div v-for=" (post, i) in 5" :key="i">
                    <PostCard />
                </div>
            </v-col>
            <v-col>
                <div class="font-title2 font-weight-medium my-5"> Top 5 (Engagement) </div>
                <div v-for=" (post, i) in 5" :key="i">
                    <PostCard />
                </div>
            </v-col>
        </v-row>

    </div>
</template>
<script setup>

</script>
<style></style>