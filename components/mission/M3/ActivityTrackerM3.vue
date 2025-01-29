<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <div class="font-title2 font-weight-medium my-5"> ติดตามความเคลื่อนไหวทางกายภาพ</div>
                <v-data-table :headers="headers" :items="items" class="elevation-1 table-m3" :mobile="isMobile">
                    <!-- Customize header -->
                    <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
                        <tr>
                            <template v-for="column in columns" :key="column.key">
                                <th :style="{ width: column.width }">
                                    <v-chip variant="flat" :color="getTeamColor(column.title)"
                                        class="my-2 w-100 text-center">
                                        <span class="font-weight-medium text-white mx-auto w-100 mx-auto">{{
                                            column.title }}</span> </v-chip>

                                </th>
                            </template>
                        </tr>
                    </template>

                    <!-- Item templates -->
                    <template #item.group="{ item }">
                        <div v-if="item.group" class="text-center pa-5">
                            {{ item.group }}
                        </div>
                    </template>
                    <template #item.columnC="{ item }">
                        <div class="d-flex flex-wrap" >
                            <div class="ma-2 pa-2" v-for="img in item.columnC"> <v-avatar size="55" color="primary"
                                    class="ma-2">
                                    <v-icon icon="mdi-account"></v-icon>
                                </v-avatar>
                                <div class="mt-1">username</div>
                            </div>
                        </div>


                    </template>
                    <template #item.columnD="{ item }">
                        <div class="d-flex flex-wrap" >
                            <div class="ma-2 pa-2" v-for="img in item.columnD"> <v-avatar size="55" color="primary"
                                    class="ma-2">
                                    <v-icon icon="mdi-account"></v-icon>
                                </v-avatar>
                                <div class="mt-1">username</div>
                            </div>
                        </div>
                    </template>
                    <template #item.columnE="{ item }">
                        <div class="d-flex flex-wrap" >
                            <div class="ma-2 pa-2" v-for="img in item.columnE"> <v-avatar size="55" color="primary"
                                    class="ma-2">
                                    <v-icon icon="mdi-account"></v-icon>
                                </v-avatar>
                                <div class="mt-1">username</div>
                            </div>
                        </div>
                    </template>
                    <template #item.columnF="{ item }">
                        <div class="d-flex flex-wrap" >
                            <div class="ma-2 pa-2" v-for="img in item.columnF"> <v-avatar size="55" color="primary"
                                    class="ma-2">
                                    <v-icon icon="mdi-account"></v-icon>
                                </v-avatar>
                                <div class="mt-1">username</div>
                            </div>
                        </div>
                    </template>
                    <template #item.columnG="{ item }">
                        <div class="d-flex flex-wrap" >
                            <div class="ma-2 pa-2" v-for="img in item.columnG"> <v-avatar size="55" color="primary"
                                    class="ma-2">
                                    <v-icon icon="mdi-account"></v-icon>
                                </v-avatar>
                                <div class="mt-1">username</div>
                            </div>
                        </div>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
const { getTeamColor, getMissionColor, getTeamColorSoft } = useColors();

const headers = ref([
    { title: 'Group', align: 'start', value: 'group', width: '150px' },
    { title: 'C', value: 'columnC', align: 'center', width: '150px' },
    { title: 'D', value: 'columnD', align: 'center', width: '150px' },
    { title: 'E', value: 'columnE', align: 'center', width: '150px' },
    { title: 'F', value: 'columnF', align: 'center', width: '150px' },
    { title: 'G', value: 'columnG', align: 'center', width: '150px' },
]);

const items = ref([
    {
        group: 'กลุ่มทุนต่างชาติ (5)',
        columnC: ['/path/to/image1.png', '/path/to/image2.png', '/path/to/image19.png', '/path/to/image20.png'],
        columnD: ['/path/to/image3.png', '/path/to/image4.png'],
        columnE: ['/path/to/image5.png'],
        columnF: ['/path/to/image6.png', '/path/to/image7.png'],
        columnG: ['/path/to/image8.png', '/path/to/image9.png'],
    },
    {
        group: 'กลุ่มจุดประเด็น (9)',
        columnC: ['/path/to/image10.png', '/path/to/image11.png'],
        columnD: ['/path/to/image12.png'],
        columnE: ['/path/to/image13.png', '/path/to/image14.png'],
        columnF: ['/path/to/image15.png'],
        columnG: ['/path/to/image16.png', '/path/to/image17.png'],
    },
    {
        group: 'กลุ่มสร้างกระแส ชี้นำเยาวชน (10)',
        columnC: ['/path/to/image18.png'],
        columnD: ['/path/to/image19.png', '/path/to/image20.png'],
        columnE: ['/path/to/image21.png', '/path/to/image22.png'],
        columnF: ['/path/to/image23.png'],
        columnG: ['/path/to/image24.png', '/path/to/image25.png'],
    },
    {
        group: 'กลุ่มแพร่กระจาย (13)',
        columnC: ['/path/to/image18.png'],
        columnD: ['/path/to/image19.png', '/path/to/image20.png'],
        columnE: ['/path/to/image21.png', '/path/to/image22.png'],
        columnF: ['/path/to/image23.png'],
        columnG: ['/path/to/image24.png', '/path/to/image25.png'],
    },
    {
        group: 'กลุ่มนักวิชาการ(6)',
        columnC: ['/path/to/image18.png'],
        columnD: ['/path/to/image19.png', '/path/to/image20.png'],
        columnE: ['/path/to/image21.png', '/path/to/image22.png'],
        columnF: ['/path/to/image23.png'],
        columnG: ['/path/to/image24.png', '/path/to/image25.png'],
    },
    {
        group: 'กลุ่ม NGos(2)',
        columnC: ['/path/to/image18.png'],
        columnD: ['/path/to/image19.png', '/path/to/image20.png'],
        columnE: ['/path/to/image21.png', '/path/to/image22.png'],
        columnF: ['/path/to/image23.png'],
        columnG: ['/path/to/image24.png', '/path/to/image25.png'],
    },
    {
        group: 'กลุ่มส.ส. (22)',
        columnC: ['/path/to/image18.png'],
        columnD: ['/path/to/image19.png', '/path/to/image20.png'],
        columnE: ['/path/to/image21.png', '/path/to/image22.png'],
        columnF: ['/path/to/image23.png'],
        columnG: ['/path/to/image24.png', '/path/to/image25.png'],
    },
]);

const isMobile = ref(false);
if (process.client) {
    isMobile.value = window.innerWidth < 860;

    const updateIsMobile = () => {
        isMobile.value = window.innerWidth < 960;
    };

    watchEffect(() => {
        window.addEventListener("resize", updateIsMobile);
        return () => {
            window.removeEventListener("resize", updateIsMobile);
        };
    });
}
</script>
<style>
.table-m3 .v-table__wrapper>table>tbody>tr>td:nth-child(2) {
    background: #e3d5eb;
}

.table-m3 .v-table__wrapper>table>tbody>tr>td:nth-child(3) {
    background: #E2F0D9;
}

.table-m3 .v-table__wrapper>table>tbody>tr>td:nth-child(4) {
    background: #FFF2CD;
}

.table-m3 .v-table__wrapper>table>tbody>tr>td:nth-child(5) {
    background: #DEEAF6;
}

.table-m3 .v-table__wrapper>table>tbody>tr>td:nth-child(6) {
    background: #FBD7DB;
}


.table-m3.v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>td,
.v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>th {
    border-bottom: 1px dashed #afafaf !important;
    padding: 20px;
}

.table-m3.v-table>.v-table__wrapper>table>tbody>tr>td,
.v-table>.v-table__wrapper>table>thead>tr>td,
.v-table>.v-table__wrapper>table>tfoot>tr>td {
    height: unset;
    /* margin: 20px; */
}
</style>
<style scoped>
.custom-header {
    background-color: #f5f5f5;
    text-align: center;
    font-weight: bold;
    border-radius: 4px;
    padding: 8px;
    margin: 4px;
}

.text-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>