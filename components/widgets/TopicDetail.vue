<template>
     <v-row class="py-5">
        <!-- {{ props.localTaskData.content_id.length }} -->
        <!-- admin กำหนดประเด็นมาให้ -->
        <v-col v-if="props.localTaskData.content_id.length !== 0" cols="12" class="px-0">
            <v-row v-for="(content, index) in localTaskData.content_id" :key="index">
                <v-col cols="12">
                    <v-card
                        border rounded="lg"
                        class="pa-4 card-stat-shadow d-flex align-center justify-space-between"
                    >
                        <div class="d-flex align-center">
                        <!-- <v-icon @click="triggerHiddenCard(content)" class="mr-2" color="grey">mdi-file-document-outline</v-icon> -->
                        <span class="font-weight-medium text-body-1">
                            ประเด็น : 
                            <span class="text-grey">
                                {{ getTopicDetail(content.topic_id) }}
                            </span> 
                        </span>
                        </div>
                        <span v-if="content.show" @click="triggerHiddenCard(content)" class="text-h6 text-right">
                            <v-icon color="blue lighten-2">mdi-chevron-down</v-icon>
                        </span>
                        <span v-else @click="triggerHiddenCard(content)" class="text-h6 text-right">
                            <v-icon color="blue lighten-2">mdi-chevron-up</v-icon>
                        </span>
                        <!-- <v-icon color="blue lighten-2" class="rotate-icon">mdi-chevron-down</v-icon> -->
                    </v-card>
                </v-col>
                <v-col v-if="content.show" cols="12" class="py-0">
                    <v-card rounded="lg" class="pa-4 card-stat-shadow">
                        <v-col v-if="content.detail" cols="12" class="px-0">
                            <v-icon class="mr-2" color="grey">mdi-clipboard-text</v-icon>
                            <span class="text-h6">หัวเรื่อง : 
                                <span class="text-grey">
                                    {{ content.detail }}
                                </span> 
                            </span>
                        </v-col>
                        <v-col v-else cols="12" class="px-0">
                            <span class="text-h6">หัวเรื่อง</span>
                            <v-text-field
                                v-model="detail"
                                density="compact"
                                placeholder="ใส่หัวเรื่อง"
                                variant="outlined"
                                rounded="lg"
                                clearable
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" class="px-0">
                            <span style="font-size: 16px">Link URL</span>
                            <v-row v-for="(link, index) in url"
                            :key="'link-url-' + index">
                                <v-col class="pb-0">
                                    <v-text-field density="compact" 
                                        placeholder="Link URL" rounded="lg"
                                        v-model="url[index]" 
                                        variant="outlined" clearable
                                        @blur="fetchPreview(url, index)"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col v-if="index === url.length -1" cols="auto" class="pb-0">
                                    <v-btn density="compact" rounded="md" color="#46AFC7"
                                        @click="addLink(url)" height="63%" min-width="40" size="small">
                                        <v-icon style="color: white; font-size: 20px">mdi-plus</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col v-else cols="auto">
                                    <v-btn color="red" icon size="small" variant="text" @click="removeLink(url,index)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-col>  
                                <PreviewLinkCard v-if="previews.length != 0" :preview="previews[index]" />
                            </v-row>
                        </v-col>
        
                        <v-col cols="12" class="px-0">
                            <span class="text-h6">Image</span>
                            <vue-dropzone
                                ref="myVueDropzone"
                                id="dropzone"
                                :options="dropzoneOptions"
                                class="custom-dropzone"
                            />
                        </v-col>
            
                        <v-col cols="12" class="pt-5 px-0">
                            <span class="text-h6">Tagged topic ({{ tags_topic.length }})</span>
                            <v-combobox
                                v-model="tags_topic"
                                placeholder="Enter a tag"
                                variant="solo"
                                chips
                                clearable
                                closable-chips
                                multiple
                            >
                                <template v-slot:chip="{ props, item }">
                                <v-chip v-bind="props" variant="elevated" color="teal">
                                    <span>{{ item.raw }}</span>
                                    
                                </v-chip>
                                </template>
                            </v-combobox>
                        </v-col>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>

        <!-- user กรอกประเด็นเอง -->
        <v-col cols="12" v-else class="px-0">
            <v-row>
                <v-col cols="12">
                    <v-card
                        border rounded="lg"
                        class="card-stat-shadow d-flex align-center justify-space-between"
                    >
                        <v-col>
                            <!-- <span class="text-h6"> ประเด็น</span> -->
                            <v-select
                                density="compact"
                                label="ประเด็น"
                                placeholder="เลือกประเด็น"
                                variant="outlined"
                                rounded="lg"
                                :items="topics"
                                item-title="name"
                                item-value="name"
                                v-model="newContent.topic"
                                style="margin-top: 5px"
                                hide-details
                            ></v-select>
                        </v-col>
                        <v-col cols="auto" v-if="newContent.show" @click="triggerHiddenCard(newContent)" class="text-h6 text-right">
                            <v-icon color="blue lighten-2">mdi-chevron-down</v-icon>
                        </v-col>
                        <v-col cols="auto" v-else @click="triggerHiddenCard(newContent)" class="text-h6 text-right">
                            <v-icon color="blue lighten-2">mdi-chevron-up</v-icon>
                        </v-col>
                    </v-card>
                </v-col>
                <v-col v-if="newContent.show" cols="12">
                    <v-card rounded="lg" class="pa-4 card-stat-shadow" >
                        <!-- <v-col cols="12">
                            <span class="text-h6"> ประเด็น</span>
                            <v-select
                                density="compact"
                                placeholder="เลือกประเด็น"
                                variant="outlined"
                                rounded="lg"
                                :items="topics"
                                item-title="name"
                                item-value="name"
                                v-model="selectedTopic"
                                style="margin-top: 5px"
                            ></v-select>
                        </v-col> -->
                        <v-col cols="12">
                            <span class="text-h6">หัวเรื่อง</span>
                            <v-text-field
                                density="compact"
                                v-model="detail"
                                placeholder="ใส่หัวเรื่อง"
                                variant="outlined"
                                rounded="lg"
                                clearable
                            ></v-text-field>
                           
                        </v-col>
                        <v-col cols="12">
                            <span style="font-size: 16px">Link URL</span>
                            <v-row v-for="(link, index) in url"
                            :key="'link-url-' + index">
                                <v-col class="pb-0">
                                    <v-text-field density="compact" 
                                        placeholder="Link URL" rounded="lg"
                                        v-model="url[index]" 
                                        variant="outlined" clearable
                                        @blur="fetchPreview(url, index)"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col v-if="index === url.length -1" cols="auto" class="pb-0">
                                    <v-btn density="compact" rounded="md" color="#46AFC7"
                                        @click="addLink(url)" height="63%" min-width="40" size="small">
                                        <v-icon style="color: white; font-size: 20px">mdi-plus</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col v-else cols="auto">
                                    <v-btn color="red" icon size="small" variant="text" @click="removeLink(url,index)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-col>  
                                <PreviewLinkCard v-if="previews.length != 0" :preview="previews[index]" />
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <span class="text-h6">Image</span>
                            <vue-dropzone
                                ref="myVueDropzone"
                                id="dropzone"
                                :options="dropzoneOptions"
                                class="custom-dropzone"
                            />
                        </v-col>
            
                        <v-col cols="12" class="pt-5">
                            <span class="text-h6">Tagged topic ({{ tags_topic.length }})</span>
                            <v-combobox
                                v-model="tags_topic"
                                placeholder="Enter a tag"
                                variant="solo"
                                chips
                                clearable
                                closable-chips
                                multiple
                            >
                                <template v-slot:chip="{ props, item }">
                                <v-chip v-bind="props" variant="elevated" color="teal">
                                    <span>{{ item.raw }}</span>
                                
                                </v-chip>
                                </template>
                            </v-combobox>
                        </v-col>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script setup>
import vueDropzone from "dropzone-vue3";
import PreviewLinkCard from "../cards/PreviewLinkCard.vue";
const props = defineProps({
    localTaskData: {
        type: Object,
        default:null
    }
})
const topics = ref();
const tags_topic = ref([]);
const url = ref(['']);
const previews = ref([]);
const dropzoneOptions = ref({
    url: "https://httpbin.org/post",
    thumbnailWidth: 100,
    thumbnailHeight: 100,
    maxFilesize: 1,
    acceptedFiles: "image/jpeg,image/png",
    maxFiles: 2,
    headers: { "My-Awesome-Header": "header value" },
    dictDefaultMessage: `
      <div style="text-align: center;margin-top:-40px">
        <i class="mdi mdi-upload-circle" style="font-size: 40px; color: #29A0AF;"></i>
        <p style="font-size: 14px;">Drag files here or click to upload</p>
      </div>
    `,
});
const newContent = ref({
    topic : null
})
function triggerHiddenCard(card) {
    // ฟังก์ชันที่ใช้ในการแสดงหรือซ่อน card
    card.show = !card.show;
    console.log("content == ", card);
    
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
function getTopicDetail(id) { 
    // console.log("topics:", topics);
    let list = Array.isArray(topics) ? topics : topics.value;
    let detail = list?.find((topic) => topic._id === id);
    return detail ? detail.name : null;
};
onMounted(async() => {
    topics.value = await getTopics('M6')
});
</script>
<style scoped>
.custom-dropzone {
    background-color: #E9E9E9;
    height: 100px; 
    border: 2px dashed #707070; /* กำหนดขอบ */
    border-radius: 10px; /* กำหนดมุมโค้ง */
}
</style>