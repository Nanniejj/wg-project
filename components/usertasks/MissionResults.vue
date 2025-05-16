<template>
    <v-container>
        <!-- Test Mission Results in same file -->

        <!-- widgets list -->
        <v-row>
            <v-col cols="12" class="px-0" v-for="(item, index) in currentComponents" :key="index">
                <component
                    :is="item.component"
                    v-bind="item.props"
                />
            </v-col>
        </v-row>

        <!-- save button -->
        <v-row class="justify-end">
            <v-col cols="auto">
                <v-btn
                variant="outlined"
                size="large"
                rounded="lg"
                @click="addCard"
                class="custom-btn"
                >
                <span class="text-h6">บันทึก</span>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { ref, watch } from 'vue'
const components = import.meta.glob('../widgets/*.vue')
const componentMap = {
    "link page": "LinkPages",
    "fandom detail": "FandomDetails",
    "link provice": "LinkProvice",
    "link HVT": "LinkHVT",
    "activity": "Activity",
    "leader": "Leader",
    "add Parson Button": "AddParsonButton",
    "annual Plan": "AnnualPlan",
    "objective Plan": "ObjectivePlan",
    "import File Button": "ImportFileButton",
    "table HVT": "TableHVT",
    "add network button": "AddNetworkButton",
    "topic detail": "TopicDetail",
    "topic link with result": "TopicLinkWithResult"
};
const props = defineProps({
    widgetsList: {
        type: Array,
        default: () => []
    }
});

const widgets = ref([
  { id: 1, name: "link page" },
  { id: 2, name: "fandom detail" },
  { id: 3, name: "link provice" },
  { id: 4, name: "link HVT" },
  { id: 5, name: "activity" },
  { id: 6, name: "leader" },
  { id: 7, name: "add Parson Button" },
  { id: 8, name: "annual Plan" },
  { id: 9, name: "objective Plan" },
  { id: 10, name: "import File Button" },
  { id: 11, name: "table HVT" },
  { id: 12, name: "add network button" },
  { id: 13, name: "topic detail" },
  { id: 14, name: "topic link with result" }
])

// [{ component: defineAsyncComponent, props: { title: ... } }]
const currentComponents = ref([])

async function loadComponentsWithProps(widgetConfigs) {
  currentComponents.value = []

  for (const config of widgetConfigs) {
    const widget = widgets.value.find(w => w.id === config.id)
    if (!widget) continue

    const fileName = componentMap[widget.name]
    const importPath = `../widgets/${fileName}.vue`
    const loader = components[importPath]
    if (!loader) continue

    const comp = await loader()
    currentComponents.value.push({
      component: comp.default,
      props: config.props || {}
    })
  }
}

watch(() => props.widgetsList, (newList) => {
  loadComponentsWithProps(newList)
}, { immediate: true })
</script>