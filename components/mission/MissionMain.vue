<template>
    <div>
        <v-select clearable label="Select Mission" :items="items" variant="outlined"></v-select>
        <MissionM1/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9']
        }
    },
}
</script>
<style></style>