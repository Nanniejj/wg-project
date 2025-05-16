<template>
    <v-container>
        <!-- widgets list -->
        <v-row>
            <v-col cols="12" class="px-0" v-for="(item, index) in currentComponents" :key="index">
                <component
                    :is="item.component"
                    v-bind="item.props"
                    :showCase="true"
                    :priority="item.priority"
                    @widgetSetting="data => handleSetting(data,index)"
                    @deleteWidget="removeWidget(index)"
                    @widgetPriority="data => handlePriority(data,index)"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { ref, watch } from 'vue'
const components = import.meta.glob('../widgets/*.vue');
const emit = defineEmits('updateWidgetList')
const props = defineProps({
    widgetsList: {
        type: Array,
        default: () => []
    }
});
const componentMap = {
    "link page": "LinkPages",
    "fandom detail": "FandomDetails",
    "link province": "LinkProvice",
    "link hvt": "LinkHvt",
    "activity": "Activity",
    "leader": "Leader",
    "add parson button": "AddParsonButton",
    "annual plan": "AnnualPlan",
    "objective plan": "ObjectivePlan",
    "import file button": "ImportFileButton",
    "table hvt": "TableHvt",
    "add network button": "AddNetworkButton",
    "topic detail": "TopicDetail",
    "topic link with result": "TopicLinkWithResult"
};
const currentComponents = ref([]);


function removeWidget(index) {
   props.widgetsList.splice(index, 1)
};
function handleSetting(widget_props, index) {
    const widget = props.widgetsList[index];
    // สร้าง widget ใหม่ โดยใช้ props ที่อัปเดต
    const updatedWidget = {
        ...widget,
        props: widget_props
    };
    // ใช้ splice เพื่อแทนที่ widget เดิม
    props.widgetsList.splice(index, 1, updatedWidget);
};
function handlePriority(priority, index) {
    const widget = props.widgetsList[index];
    const updatedWidget = {
        ...widget,
        priority: priority
    };
    props.widgetsList.splice(index, 1, updatedWidget);
    emit('updateWidgetList')
};
async function loadComponentsWithProps(widgetConfigs) {
    currentComponents.value = []
    for (const config of widgetConfigs) {
        const fileName = componentMap[config.name]
        const importPath = `../widgets/${fileName}.vue`
        const loader = components[importPath]
        if (!loader) continue

        const comp = await loader()
            currentComponents.value.push({
            component: comp.default,
            props: config.props || {},
            priority: config.priority || null
        })
    }
};
watch(
  () => props.widgetsList,
  (newVal) => {
    loadComponentsWithProps(newVal)
  },
  { immediate: true, deep: true }
)
</script>