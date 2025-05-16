<template>
  <v-container>
    <v-card class="rounded-xl py-5 my-2 px-5" elevation="3">
      <v-card-title class="d-flex align-center justify-space-between" color="#f5f5f5">
        <div class="d-flex align-center">
          <v-avatar size="48" class="mr-3" color="#2a354799">
            <v-img :src="post?.profile_image" v-if="post?.profile_image" class="w-100" />
            <v-icon v-else>mdi-account</v-icon>
          </v-avatar>
          <div>
            <div class="text-subtitle-2 font-weight-bold">
              {{ post?.display_name || post?.account_name || "ไม่ระบุชื่อ" }}
              <v-btn :href="post?.url_post" target="_blank" color="blue" small icon="mdi-link-variant" variant="text" />
            </div>
            <div class="text-caption grey--text">{{ formatDate(post?.date) ||'date' }}</div>
          </div>
        </div>
        <div>
          <v-chip :prepend-icon="getSentimentIcon(post?.sentiment)" :color="getSentimentColor(post?.sentiment)">
            <span class="font-weight-medium"> {{ getSentimentLabel(post?.sentiment) }}</span>
          </v-chip>
          <!-- <v-btn :color="getSentimentColor(post.sentiment)" class="text-caption">
            {{ getSentimentLabel(post.sentiment) }}
          </v-btn> -->
        </div>
      </v-card-title>

      <v-card-text>
        <div class="text-body-1 mb-3 px-5" v-html="highlightedText" />
        <v-btn v-if="isTextLong" @click="toggleShowMore" variant="text" size="small" class="ml-5">
          {{ showMore ? "ย่อ" : "ดูเพิ่มเติม" }}
        </v-btn>

        <v-img v-if="post?.photos && post?.photos.length > 0" :src="post?.photos[0]" class="rounded-lg"
          max-height="400px" />
      </v-card-text>

      <v-card-actions class="d-flex justify-space-between">
        <div>
          <v-btn icon>
            <v-icon color="#2a3547">mdi-thumb-up</v-icon>
            <span class="ml-1">{{ post?.likes_count ||0 }}</span>
          </v-btn>
          <v-btn icon>
            <v-icon color="#2a3547">mdi-comment</v-icon>
            <span class="ml-1">{{ post?.comments_count||0 }}</span>
          </v-btn>
          <v-btn icon>
            <v-icon color="#2a3547">mdi-share</v-icon>
            <span class="ml-1">{{ post?.shares_count||0 }}</span>
          </v-btn>
        </div>
        <!-- <v-btn :href="post.url_post" target="_blank" color="blue" text small>View More</v-btn> -->
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { computed, ref } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  data: {
    type: Object,// data.keywords
  },
});

const showMore = ref(false);
const textLimit = 550;
const isTextLong = computed(() => props.post.full_text?.length > textLimit);

const displayText = computed(() => {
  if (!props.post.full_text) return "";
  return showMore.value || !isTextLong.value
    ? props.post.full_text
    : props.post.full_text.slice(0, textLimit) + "...";
});

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};

const formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD | HH:mm:ss");
};

const getSentimentLabel = (val) => {
  if (val === 1) return "Positive";
  if (val === 0) return "Neutral";
  if (val === -1) return "Negative";
  return "Unknown";
};
const getSentimentIcon = (val) => {
  if (val === 1) return "mdi-emoticon-outline";   // Positive
  if (val === 0) return "mdi-emoticon-neutral-outline"; // Neutral
  if (val === -1) return "mdi-emoticon-sad-outline";    // Negative
  return "mdi-help-circle-outline"; // fallback
};
const getSentimentColor = (val) => {
  if (val === 1) return "green lighten-1";
  if (val === 0) return "light-blue-darken-3";
  if (val === -1) return "red lighten-1";
  return "grey";
};

const flatKeywords = computed(() => {
  return props.data?.keywords?.flat() || [];
});

const highlightedText = computed(() => {
  const text = showMore.value || !isTextLong.value
    ? props.post.full_text
    : props.post.full_text.slice(0, textLimit) + "...";
  return getHighlightedText(text, flatKeywords.value);
});
const getHighlightedText = (text, keywords) => {
  if (!text || keywords.length === 0) return text;

  const escapedKeywords = keywords
    .filter(Boolean)
    .map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // escape regex

  const regex = new RegExp(`(${escapedKeywords.join("|")})`, "gi");

  return text.replace(regex, (match) => `<mark>${match}</mark>`);
};
</script>

<style scoped>
.v-container {
  max-width: 1000px;
}

.v-btn span {
  font-size: 12px;
}

mark {
  background-color: #00968875 !important;
  padding: 0 2px;
  border-radius: 2px;
}
</style>
