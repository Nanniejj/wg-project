<template>
    <div>
        <div class="font-title2 font-weight-medium my-5"> Top 5 (Engagement) </div>
        <div v-for=" (post,i) in 5" :key="i">
            <PostCard />
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style></style>