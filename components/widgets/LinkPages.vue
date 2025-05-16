<template>
    <v-card class="pa-5 card-stat-shadow" border="sm" rounded="lg" >
        <!-- header -->
        <v-col v-if="showCase" cols="12" class="pa-0 text-end">
            <v-icon @click="removeWidget" color="#F44336" icon="mdi-delete" size="20"></v-icon>
        </v-col>
        <!-- edit title -->
        <v-col v-if="!openSetTitle" cols="12" class="px-0">
            <span class="text-h6 pe-2">{{ title }}</span>
            <v-icon v-if="showCase" @click="handleSettingTitle" color="#46AFC7" icon="mdi-pencil-outline" size="20"></v-icon>
        </v-col>
        <v-col v-else cols="12" class="px-0">
            <v-row>
                <v-col>
                    <v-text-field density="compact" 
                        placeholder="ระบุหัวข้อ" rounded="lg"
                        v-model="setTitle" 
                        variant="outlined" clearable
                        hide-details
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="auto">
                    <v-btn
                            class="text-none text-subtitle-1"
                            color="#FF9800"
                            variant="flat"
                            @click="handleSettingTitle"
                        >
                            ยืนยัน
                        </v-btn>
                </v-col>
            </v-row>
        </v-col>

        <v-divider class="border-opacity-75 dashed-divider"></v-divider>


        <!-- input -->
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
                        hide-details
                        :disabled="showCase"
                    >
                    </v-text-field>
                    <!-- Preview Card Below Input -->
                </v-col>
                <v-col v-if="index === url.length -1" cols="auto" class="pb-0">
                    <v-btn density="compact" rounded="md" color="#46AFC7" 
                    class="h-100" :disabled="showCase"
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
    

        <!-- priority -->
        <v-col cols="4" class="px-0">
            <Priority 
                v-model="selectedPriority" 
                @handlePriority="handlePriority"
            />
            <!-- <span style="font-size: 16px">ระดับความสำคัญ</span>
            <v-select
                placeholder="เลือกระดับความสำคัญ"
                density="compact"
                variant="outlined"
                rounded="lg"
                :items="prioritise"
                item-title="title"
                item-value="value"
                v-model="selectedPriority"
                @update:model-value="handlePriority"
                hide-details
            ></v-select> -->
        </v-col>
    </v-card>
</template>
<script setup>
import { ref } from 'vue';
import PreviewLinkCard from '../cards/PreviewLinkCard.vue';
import Priority from './_WidgetPriority.vue';
const props = defineProps({
    title: {
        type: String,
        default: 'Title',
    },
    showCase: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        default: 'low',
    }

});
const emit = defineEmits('linkPagesValue', 'widgetSetting','widgetPriority', 'deleteWidget');
const url = ref(['']);
const previews = ref([]);
const selectedPriority = ref(props.priority);
const openSetTitle = ref(false)
let setTitle = '';
const prioritise = ref([
    {title:"ต่ำ", value:"low"},
    {title:"ปานกลาง", value:"medium"},
    {title:"สูง", value:"high"},
]);
function handleSettingTitle() {
    openSetTitle.value = !openSetTitle.value
    if (openSetTitle && setTitle) {
        let setting = { title: ref(setTitle).value }
        // console.log("setting === ", setting);
        
        emit('widgetSetting', setting)
    }
}
function handlePriority() {
    console.log('ส่งค่า widget Priority:', selectedPriority.value)
    emit('widgetPriority',selectedPriority.value)
    // emit('widgetPriority',data)
}
function removeWidget() {
    emit('deleteWidget')
}
function addLink(url) {
    url.push('');
}

function removeLink(url, index) {
    url.splice(index, 1);
    previews.value.splice(index, 1);
    emitLinkPagesValue();
}
function emitLinkPagesValue() {
    emit('linkPagesValue', url.value);
}
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
    emitLinkPagesValue();
};

</script>
<style>
    
</style>