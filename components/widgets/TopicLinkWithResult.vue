<template>
    <v-row>
        <v-col v-for="(card, index) in props.cards" :key="index" cols="12" md="4">
            <v-card
              class="pa-8"
              rounded="lg"
              elevation="3"
              @click="selectCard(card)"
              :class="{ 'bg-grey-lighten-2': selectedCard === card }"
            >
              <span class="text-h6">ประเด็น</span>
              <div class="pa-2">
                <v-chip size="x-large" color="#F4F4F4" variant="flat">
                  <span>{{ card.title }}</span>
                </v-chip>
              </div>
              <div class="pt-2">
                <span class="text-h6">Link(url)</span>
              </div>
              <div class="pa-2">
                <div v-for="(link, idx) in card.url" :key="idx" class="pa-2">
                  <v-chip size="x-large" color="#F4F4F4" variant="flat">
                    <span style="color: #2ab6ea">{{ link }}</span>
                  </v-chip>
                </div>
              </div>
              <div>
                <div class="pt-6">
                  <span class="text-h6">รูปแนบ</span>
                </div>
                <div v-for="(image, idx) in card.photo" :key="idx">
                  <v-img
                    class="bg-grey-lighten-2"
                    height="200"
                    aspect-ratio="16/9"
                    :src="image"
                    cover
                  ></v-img>
                </div>
              </div>
            </v-card>

        </v-col>

        <v-col cols="12" v-if="selectedCard">
            <span class="text-h6">ผลปฏิบัติการ</span>
            <v-divider class="border-opacity-75 dashed-divider my-5"></v-divider>
            <v-card class="pa-5 card-stat-shadow" border="sm" rounded="lg">
                <v-row class="justify-end">
                    <v-btn @click="selectedCard = null" variant="text" color="red">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-row>
                <v-card-item>
                    <div>
                        <span class="text-h6">ประเด็นย่อย</span>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            :placeholder="
                            selectedCard ? selectedCard.title : 'กรุณากรอกประเด็นย่อย'
                            "
                            disabled
                        ></v-text-field>
                    </div>

                    <div>
                    <span class="text-h6">รายละเอียด</span>
                    <v-text-field
                        density="compact"
                        variant="outlined"
                        placeholder="กรอกรายละเอียด"
                    ></v-text-field>
                    </div>

                    <v-col cols="12" class="px-0">
                        <span style="font-size: 16px">Link URL</span>
                        <v-row v-for="(link, index) in selectedCard.url"
                        :key="'link-url-' + index">
                            <v-col class="pb-0">
                                <v-text-field density="compact" 
                                    placeholder="Link URL" rounded="lg"
                                    v-model="selectedCard.url[index]" 
                                    variant="outlined" clearable
                                    @blur="fetchPreview(selectedCard.url, index)"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col v-if="index === 0" cols="auto" class="pb-0">
                                <v-btn density="compact" rounded="md" color="#46AFC7"
                                    @click="addLink(selectedCard.url)" height="63%" min-width="40" size="small">
                                    <v-icon style="color: white; font-size: 20px">mdi-plus</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col v-else cols="auto">
                                <v-btn color="red" icon size="small" variant="text" @click="removeLink(selectedCard.url,index)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-col>  
                            <PreviewLinkCard v-if="previews.length != 0" :preview="previews[index]" />
                        </v-row>
                    </v-col>
                    
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
<script setup>
import PreviewLinkCard from "../cards/PreviewLinkCard.vue";
const props = defineProps({
    cards: {
        type: Array,
        default: null
    }
});
let selectedCard = ref(null);
const previews = ref([]);
function selectCard(card) {
    selectedCard.value = card; // เก็บข้อมูลของ card ที่ผู้ใช้เลือก
};
async function  fetchPreview (content, index)  {
    const url = content[index];
    if (!url) return;

    try {
        const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
        const data = await res.json();

        if (data.status === "success") {
            previews.value[index] = {
                title: data.data.title,
                description: data.data.description,
                image: data.data.image?.url || "",
                site: data.data.publisher || "Unknown",
                url,
            };
        }
    } catch (error) {
        console.error("Error fetching preview:", error);
    }
    // emitLinkPagesValue();
};
function addLink(dataLinks) {
    dataLinks.push("");
};
function removeLink(url, index){ 
    url.splice(index, 1);
    previews.value.splice(index,1)
};
</script>
<style>
    
</style>