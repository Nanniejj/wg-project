<template>
    <div>
        <span style="font-size: 16px">ระดับความสำคัญ</span>
        <v-select
            placeholder="เลือกระดับความสำคัญ"
            density="compact"
            variant="outlined"
            rounded="lg"
            :items="prioritise"
            item-title="title"
            item-value="value"
            :model-value="modelValue"
            @update:model-value="onChange"
            hide-details
        ></v-select>
    </div>
</template>
<script setup>
const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue', 'handlePriority'])
const prioritise = ref([
    {title:"ต่ำ", value:"low"},
    {title:"ปานกลาง", value:"medium"},
    {title:"สูง", value:"high"},
]);
const onChange = (value) => {
  emit('update:modelValue', value) // อัปเดต v-model
  emit('handlePriority')           // trigger event
}
</script>
<style lang="">
    
</style>