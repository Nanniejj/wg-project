<template>
    <v-row class="justify-end">
        <div>
            <v-btn 
                :color="props.buttonColor"
                size="large" 
                rounded="lg" 
                @click="openDialog"
            >
                <v-icon class="mr-1" color="white">mdi-tray-arrow-down</v-icon>
                <span class="text-h6 text-white">Import .CSV or .XLXS</span>
            </v-btn>
        </div>
        
        <v-dialog 
            v-model="ShowDialog" 
            min-width="300px"
            min-height="700px"
            scrollable
        >
            <v-card rounded="lg" class="py-0 mb-3">
                <!-- card haeder -->
                <v-card-item class="py-2 ">
                    <v-card-title class="text-h6 d-flex justify-space-between align-center">
                        {{ props.title }}
                        <v-btn  @click="closeDialog" icon="$vuetify" variant="text">
                            <v-icon icon="mdi-close"></v-icon>
                        </v-btn>
                    </v-card-title>
                </v-card-item>

                <!-- card body -->
                <v-card-text class="">
                    <v-row>
                        <v-col v-if="dataImported" cols="12">
                            <v-table
                                height="600px"
                                fixed-header
                            >
                                <thead>
                                    <tr>
                                        <th v-for="header in headers" :key="header" class="text-left">
                                            {{ header.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, itemIndex) in dataImported" :key="itemIndex">
                                        <td v-for="header in headers" :key="header.key">
                                            <template v-if="header.key === 'actions'">
                                                <v-btn
                                                    icon="mdi-pencil-outline"
                                                    size="small"
                                                    variant="text"
                                                    color="#4DA3D9"
                                                    v-if="editingId !== itemIndex"
                                                    @click="startEdit(item, itemIndex)"
                                                ></v-btn>

                                                <v-btn
                                                    icon="mdi-content-save"
                                                    size="small"
                                                    variant="text"
                                                    color="green"
                                                    v-if="editingId === itemIndex"
                                                    @click="saveEdit(itemIndex)"
                                                ></v-btn>

                                                <v-btn
                                                    icon="mdi-delete"
                                                    size="small"
                                                    variant="text"
                                                    color="#404040"
                                                    @click="confirmDelete(itemIndex)"
                                                ></v-btn>
                                            </template>
                                            <template v-else>
                                                <v-row v-if="editingId === itemIndex">
                                                    <!-- <input
                                                        v-model="editBuffer[header.key]"
                                                        :placeholder="header.title"
                                                    /> -->
                                                    <v-col cols="12" class="px-0">
                                                        <v-text-field
                                                            v-model="editBuffer[header.key]"
                                                            :placeholder="header.title"
                                                            variant="outlined"
                                                            hide-details
                                                            size="small"
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <div v-else>
                                                    {{ item[header.key] }}
                                                </div>
                                            </template>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                            <!-- <v-data-table
                                height="600px"
                                :headers="headers"
                                :items="dataImported"
                                :items-per-page="-1"
                                fixed-header
                                hide-default-footer
                            >
                                <template v-slot:item.actions="{ item, index }">
                                    <v-btn
                                        icon="mdi-pencil-outline"
                                        size="small"
                                        variant="text"
                                        color="#4DA3D9"
                                        v-if="editingId !== rowIndex"
                                        @click="startEdit(item, index)"
                                    ></v-btn>

                                    <v-btn
                                        icon="mdi-content-save"
                                        size="small"
                                        variant="text"
                                        color="green"
                                        v-if="editingId === rowIndex"
                                        @click="saveEdit(index)"
                                    ></v-btn>

                                    <v-btn
                                        icon="mdi-delete"
                                        size="small"
                                        variant="text"
                                        color="#404040"
                                        @click="confirmDelete(index)"
                                    ></v-btn>
                                </template>
                            </v-data-table> -->
                        </v-col>
                        <v-col v-else cols="12" class="text-center text-grey py-5">
                            - ยังไม่มีการนำเข้าข้อมูล -
                        </v-col>
                    </v-row>
                </v-card-text>

                <!-- card footer -->
                <v-card-actions>
                    <v-btn
                        v-if="dataImported"
                        color="#4CAF50"
                        variant="outlined"
                        @click="closeDialog"
                    >
                        <v-icon>mdi-content-save</v-icon>
                        <span class="text-h6">บันทึก</span>
                    </v-btn>
                    <v-btn
                        color="#F44336"
                        variant="outlined"
                        @click="clearData"
                    >
                        <v-icon >mdi-eraser-variant</v-icon>
                        <span class="text-h6">ล้างข้อมูล</span>
                    </v-btn>
                    <v-btn
                        color="#5FC0D6"
                        variant="outlined"
                        @click="handleDownload(props.mission)"
                    >
                    <v-icon> mdi-download</v-icon>
                    <span class="text-h6">ตัวอย่างไฟล์</span>
                    </v-btn>

                    <v-btn 
                        variant="outlined" 
                        @click="triggerFileInput"
                    >
                        <v-icon>mdi-import</v-icon>
                        <span class="text-h6">นำเข้าข้อมูล(.csv หรือ .xlsx)</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
            <input
                ref="fileInput"
                type="file"
                accept=".csv, .xlsx"
                @change="handleFileUpload"
                style="display: none"
            />
        </v-dialog>
    </v-row>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'นำเข้าข้อมูล',
    },
    mission: {
        type: String,
        default:'M3'
    },
    buttonColor: {
        type: String,
        default: "#5FC0D6",
    },
});
const ShowDialog = ref(false);
const dataImported = ref(null);
const headers = ref(null);
const sampleDataM3 = [
    ["Name", "Age", "Email"],
    ["Alice", 30, "alice@example.com"],
    ["Bob", 25, "bob@example.com"],
    ["ชื่อตัวอย่าง",999, "ตัวอย่าง@example.com"]
];
const sampleDataM7 = [
    ["Type","Name", "Leader", "member"],
    ["ระบุประเภทเครือข่าย", "ระบุบชื่อเครื่อข่าย", "แกนนำเครือข่าย",30]
];
const sampleDataR9 = [
    [
        "ActivityName",
        "Support",
        "ProviceAcademy",
        "AcademyName",
        "Location",
        "SubDistrict",
        "District",
        "Province",
        "Zip_Code",
        "Attendants",
        "Description",
        "StartDate",
        "EndDate",
        "Coordinator",
        "POC",
    ],
    [
        "ชื่อกิจกรรม",
        "สนันสนับ",
        "จังหวัดที่สถานศึกษาสังกัด",
        "โรงเรียน/อุดมศึกษา",
        "สถานที่",
        "แขวง/ตำบล",
        "เขต/อำเภอ",
        "จังหวัด",
        "ไปรษณีย์",
        "จำนวนผู้เข้าร่วม",
        "รายละเอียด",
        "วันเริ่มจัดกิจกรรม",
        "วันจบจัดกิจกรรม",
        "ระบุบผู้ประสานงานของหน่วย",
        "ระบุPOC",
    ] 
];
const sampleDataR10 = [
    [
        "ActivityName",
        "Support",
        "Type",
        "Location",
        "SubDistrict",
        "District",
        "Province",
        "Zip_Code",
        "Attendants",
        "Description",
        "StartDate",
        "EndDate",
        "Coordinator",
        "POC",
    ],
    [
        "ชื่อกิจกรรม",
        "สนันสนับ",
        "รูปแบบ",
        "สถานที่",
        "แขวง/ตำบล",
        "เขต/อำเภอ",
        "จังหวัด",
        "ไปรษณีย์",
        "จำนวนผู้เข้าร่วม",
        "รายละเอียด",
        "วันเริ่มจัดกิจกรรม",
        "วันจบจัดกิจกรรม",
        "ระบุบผู้ประสานงานของหน่วย",
        "ระบุPOC",
    ] 
];
const sampleDataR11 = [
    [
        "ActivityName",
        "Support",
        "Location",
        "SubDistrict",
        "District",
        "Province",
        "Zip_Code",
        "Attendants",
        "Description",
        "StartDate",
        "EndDate",
        "Coordinator",
        "POC",
    ],
    [
        "ชื่อกิจกรรม",
        "สนันสนับ",
        "สถานที่",
        "แขวง/ตำบล",
        "เขต/อำเภอ",
        "จังหวัด",
        "ไปรษณีย์",
        "จำนวนผู้เข้าร่วม",
        "รายละเอียด",
        "วันเริ่มจัดกิจกรรม",
        "วันจบจัดกิจกรรม",
        "ระบุบผู้ประสานงานของหน่วย",
        "ระบุPOC",
    ] 
];
const sampleDataR12 = [
    [
        "ActivityName",
        "Support",
        "Location",
        "SubDistrict",
        "District",
        "Province",
        "Zip_Code",
        "Attendants",
        "Description",
        "StartDate",
        "EndDate",
        "Coordinator"
    ],
    [
        "ชื่อกิจกรรม",
        "สนันสนับ",
        "สถานที่",
        "แขวง/ตำบล",
        "เขต/อำเภอ",
        "จังหวัด",
        "ไปรษณีย์",
        "จำนวนผู้เข้าร่วม",
        "รายละเอียด",
        "วันเริ่มจัดกิจกรรม",
        "วันจบจัดกิจกรรม",
        "ระบุบผู้ประสานงานของหน่วย"
    ] 
];

const fileInput = ref(null)
const triggerFileInput = () => {
  fileInput.value?.click()
}
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const action = { title: 'Action', key: 'actions', sortable: false }
    if (fileName.endsWith('.csv')) {
        // dataImported.value = null // เก็บข้อมูลที่แปลงแล้วใน importTopics
        // headers.value = null
        // 👉 ประมวลผล CSV
        const reader = new FileReader()
        reader.onload = (e) => {
            const csvText = e.target.result
            let { headersData, items } = parseCSV(csvText)
            dataImported.value = items // เก็บข้อมูลที่แปลงแล้วใน importTopics
            headers.value = headersData
            headers.value.push(action)
            console.log('CSV Headers:',headersData)
            console.log('CSV Items:', items)
        }
        reader.readAsText(file)

    } else if (fileName.endsWith('.xlsx')) {
        // 👉 ประมวลผล XLSX ด้วย xlsx library (จำเป็นต้องใช้)
        import('xlsx').then(XLSX => {
            // dataImported.value = null // เก็บข้อมูลที่แปลงแล้วใน importTopics
            // headers.value = null
            const reader = new FileReader()
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result)
                const workbook = XLSX.read(data, { type: 'array' })
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]
                // const json = XLSX.utils.sheet_to_json(worksheet)
                // console.log('Parsed XLSX:', json)
                // dataImported.value = json // เก็บข้อมูลที่แปลงแล้วใน importTopics
                const json = XLSX.utils.sheet_to_json(worksheet)
                const headerDatas = Object.keys(json[0] || {}).map(key => ({
                    title: key,
                    key: key
                }))
                headers.value = headerDatas
                dataImported.value = json
                headers.value.push(action)
                console.log('XLSX Headers:', headerDatas)
                console.log('XLSX Items:', json)
            }
            reader.readAsArrayBuffer(file)
        })
    }else {
        alert('รองรับเฉพาะไฟล์ .csv และ .xlsx เท่านั้น')
    }
   
};

function parseCSV(text) {
    const lines = text.trim().split("\n");
    const headersRaw = lines[0].split(",");
    const headers = headersRaw.map(header => ({
        title: header.trim(),
        key: header.trim()
    }));
    
    const items = lines.slice(1).map(line => {
        const values = line.split(",");
        const obj = {};
        headersRaw.forEach((header, index) => {
            obj[header.trim()] = values[index]?.trim();
        });
        return obj;
    });

    return { headers, items };
}
function openDialog() {
    ShowDialog.value = true
}
function closeDialog() {
    ShowDialog.value = false
}
async function handleDownload(mission) {
    // console.log(setSampleData(mission));
    downloadXLSX(setSampleData(mission))
}
function clearData() {
    dataImported.value = null
    headers.value = null
    console.log('XLSX Headers:', headers.value)
    console.log('XLSX Items:', dataImported.value)
}

function setSampleData(mission) {
    switch (mission) {
        case 'M3':
            return sampleDataM3;
        case 'M7':
            return sampleDataM7;
        case 'R9':
            return sampleDataR9;
        case 'R10':
            return sampleDataR10;
        case 'R11':
            return sampleDataR11;
        case 'R12':
            return sampleDataR12;
        default:
            break;
    }
}


// ✅ States for editing
const editingId = ref(null)
const editBuffer = ref({})

// ✅ Start editing
const startEdit = (item, index) => {
    console.log("item === ", item);
    console.log("index === ", index);
    
    editingId.value = index
    editBuffer.value = { ...item }
}

// ✅ Save edit
const saveEdit = (index) => {
  dataImported.value[index] = { ...editBuffer.value }
  editingId.value = null
}

// ✅ Delete item
const confirmDelete = (index) => {
  dataImported.value.splice(index, 1)
}
</script>

<style scoped>
.dashed-divider {
  border-style: dashed;
}
</style>