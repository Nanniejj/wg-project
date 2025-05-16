<template>
    <v-card class="pa-5 card-stat-shadow" border="sm" rounded="lg" >
        <!-- header -->
        <v-col cols="12" class="d-flex justify-space-between px-0">
            <span class="text-h6">ช่องทาง</span>
            <v-icon v-if="showCase" @click="removeWidget" color="#F44336" icon="mdi-delete" size="20"></v-icon>
        </v-col>
  
        <v-divider class="border-opacity-75 dashed-divider"></v-divider>
        <v-col cols="12" class="px-0">
            <span class="text-h6">จังหวัด</span>
            <v-autocomplete  
                v-model="selectedProvice"
                placeholder="เลือกจังหวัด"
                density="compact"
                item-title="name_th"
                item-value="id"
                :items="provices" 
                variant="outlined"
                hide-details
                :disabled="showCase"
                @update:model-value="emitLinkProviceValue()"
            >
            </v-autocomplete>
        </v-col>

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
                        hide-details
                        :disabled="showCase"
                        @blur="fetchPreview(url, index)"
                    >
                    </v-text-field>
                    <!-- Preview Card Below Input -->
                </v-col>
                <v-col v-if="index === url.length -1" cols="auto" class="pb-0">
                    <v-btn density="compact" rounded="md" class="h-100" color="#46AFC7" :disabled="showCase"
                        @click="addLink(url)" height="63%" min-width="40" size="small">
                        <v-icon style="color: white; font-size: 20px">mdi-plus</v-icon>
                    </v-btn>
                </v-col>
                <v-col v-else cols="auto">
                    <v-btn color="red" icon size="small" variant="text" @click="removeLink(url,index)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-col>  
                <PreviewLinkCard v-if="previews[index]" :preview="previews[index]" />
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
    showCase: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        default: 'low',
    }
});
const emit = defineEmits('linkProviceValue', 'widgetPriority', 'deleteWidget');
const selectedProvice = ref(null);
const url = ref(['']);
const previews = ref([]);
const provices = ref([]);
const selectedPriority = ref(props.priority);
const prioritise = ref([
    {title:"ต่ำ", value:"low"},
    {title:"ปานกลาง", value:"medium"},
    {title:"สูง", value:"high"},
]);
function addLink(url) {
    url.push('');
}

function removeLink(url, index) {
    url.splice(index, 1);
    previews.value.splice(index, 1);
    emitLinkProviceValue();
}
function emitLinkProviceValue() {
    let data = {
        selectedProvice: selectedProvice.value,
        url: url.value,
    };
    emit('linkProviceValue', data);
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
    emitLinkProviceValue();
};
function handlePriority() {
    // console.log('ส่งค่า widget Priority:', selectedPriority.value)
    emit('widgetPriority',selectedPriority.value)
};
function removeWidget() {
    emit('deleteWidget')
};
onMounted(async () => {
    provices.value = await getProvinces();
    console.log('Provinces: ', provices.value);
    
});
</script>
<style>
    
</style>