<template>
    <div>
        <span><span class="text-h6 mx-2"> {{ name || "บุคคลที่เลือก" }} </span> วันที่ {{ formattedDate }}</span>
        <div v-if="loading">กำลังโหลดข้อมูล...</div>
        <div v-else-if="error">เกิดข้อผิดพลาด: {{ error }}</div>
        <div v-else>
            <div v-if="posts.length > 0">
                <PostCard v-for="(post, index) in posts" :key="index" :post="post" :data="data" />
                <v-pagination v-model="currentPage" :length="pagination.totalPages" class="mt-6" color="primary" rounded
                    @update:modelValue="fetchPosts" />
            </div>
            <div v-else>
                ไม่พบโพสต์ในวันดังกล่าว
            </div>
        </div>
    </div>
</template>

<script setup>
import PostCard from '../components/post/PostCard.vue';
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import axios from "axios";
import { ref, onMounted } from "vue";

// ดึงค่าจาก query param
const route = useRoute();
const hvtId = route.query.hvtId;
const date = route.query.date;
const sentiment = route.query.sentiment;

// ข้อมูลสำหรับแสดง
const name = ref("");
const posts = ref([]);
const data = ref([]);
const loading = ref(true);
const error = ref(null);
const pagination = ref({ page: 1, totalPages: 1 });
const currentPage = ref(1);
// แปลงวันที่ให้อ่านง่าย
const formattedDate = dayjs(date).locale("th").format("D MMMM YYYY");

const fetchPosts = async () => {
    try {
        loading.value = true;
        error.value = null;

        const result = await getPosts(
            hvtId,sentiment,
            date + "T00:00:00",
            date + "T23:59:59",
            10, currentPage.value
        );

        data.value = result;
        posts.value = result.posts;
        name.value = result.persons.toLocaleString();
        pagination.value = result.pagination;
    } catch (err) {
        error.value = err.message || "ไม่สามารถโหลดข้อมูลได้";
        console.error("Error loading posts:", err);
    } finally {
        loading.value = false;
    }
};

// ✅ โหลดตอนเริ่มต้น
onMounted(() => {
    fetchPosts();
});
</script>

<style scoped>
.post-card {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
}
</style>