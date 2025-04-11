<template>
  <div>
    <v-row>
      <v-col cols="12" md="8">
        <v-row>
          <!-- Lobby -->
          <v-col cols="12" md="6" class="card-h-maxmin">
            <div class="font-title2 base-color">Lobby</div>
            <v-card class="mx-auto pa-3 mt-3 card-h-90" elevation="3" rounded="lg">
              <div class="text-medium-emphasis text-topic">Lobby</div>
              <hr class="my-2">
              <div v-for="(user, i) in dataList.users" :key="i" class="py-3"
                v-if="dataList && dataList.users && dataList.users.length">
                <!-- {{ user }} -->
                <hr class="mb-3" />
                <v-row class="align-center">
                  <v-col>
                    <!-- <v-avatar size="40" class="my-1 elevation-4" rounded-circle
                      :style="{ borderRadius: '10px', backgroundColor: getMissionColor(user.name) }">
                      <v-icon :icon="user.name.startsWith('R') ? 'mdi-archive-outline' : 'mdi-account-supervisor'"
                        size="30" color="white"></v-icon>
                    </v-avatar> -->
                    <v-avatar icon="mdi-account" size="38" class="my-1 elevation-4"></v-avatar>
                    <span class="text-topic mx-2">{{ user.username }}
                      <span class="text-caption text-medium-emphasis text-lowercase"> ( {{ user.role }} )</span> </span>

                  </v-col>
                  <v-col cols="auto" class="py-3" v-if="user.affiliation">
                    <v-chip class="mr-1 mt-1" variant="flat"
                      :color="getTeamColor(user.affiliation.replace('Team ', ''))">
                      <span class="text-white font-weight-bold">{{ user.affiliation }}</span>
                    </v-chip>
                  </v-col>
                  <v-col cols="auto" class="h-100">
                    <v-icon class="pe-3">mdi-chevron-right-circle-outline</v-icon>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>

          <!-- TEAM -->
          <v-col cols="12" :md="6" class="card-h-maxmin">
            <div class="font-title2 base-color">Team</div>
            <v-card class="mx-auto pa-3 mt-3 card-h-90" elevation="3" rounded="lg">
              <div class="text-medium-emphasis text-topic">Team (ที่ดูแล)</div>
              <hr class="my-3" />
              <div v-for="(item, i) in dataList.teams" :key="i">
                <v-row>
                  <v-col cols="6">
                    <v-avatar :color="item.color_code" size="38" class="my-1 elevation-4"></v-avatar>
                    <span class="text-topic"> Team {{ item.name }} </span>
                  </v-col>
                  <v-col cols="6" class="text-right">
                    <v-btn variant="text">
                      <v-icon icon="mdi-chevron-right" color="#000000" size="25"></v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>

          <!-- UPDATE -->
          <v-col cols="12">
            <v-card class="mx-auto pa-2" elevation="3" rounded="lg">
              <div class="font-title2 base-color">ภารกิจล่าสุด</div>
              <div class="text-medium-emphasis">
                ภารกิจที่สั่งการล่าสุด <span class="float-right"> view all</span>
              </div>
              <!-- {{ isMobile }}ffffffffffffffff -->
              <v-data-table :items="dataList.admin_tasks" :mobile="isMobile" :headers="adminHeaders" hide-default-footer
                hide-default-header>
                <template #item.mission="{ item }">
                  <div>Mission {{ item.mission }}</div>
                </template>
                <template #item.url="{ item }">
                  <v-btn :href="item.url" target="_blank" variant="text" color="#2A3547">
                    <v-icon>mdi-link</v-icon> URL
                  </v-btn>
                </template>
                <template #item.assign_team="{ item }">
                  <div>
                    <v-chip v-for="(user, i) in item.assign_team" :key="i" class="mr-1 my-1 pa-2" variant="flat"
                      size="small"
                      :style="`background-color: ${hexToRgba(user.color_code, 0.1)}; color: ${user.color_code};`">
                      <!-- <v-icon :color="user.color_code" size="19">mdi-circle</v-icon> -->
                      Team {{ user.name }}
                    </v-chip>
                    <!-- <span v-for="(user, i) in item.assign_team" :key="i" class="mr-1 my-1 pa-1">
                      <v-icon :color="user.color_code" size="19">mdi-circle</v-icon>Team {{ user.name }}
                    </span> -->
                  </div>
                </template>
                <template #item.start_date="{ item }">
                  <div class="text-small">{{ formatDate(item.start_date) }} - {{ formatDate(item.end_date) }}</div>
                </template>
                <template #item.manage="{ item }">
                  <div>
                    <v-btn variant="text"> <v-icon size="30">mdi-chevron-right-circle-outline</v-icon></v-btn>
                  </div>
                </template>
              </v-data-table>
            </v-card>
            <br />
            <!-- NOTE -->
            <div>
              <div class="font-title2 base-color">Note</div>
              <v-card class="mx-auto pa-3 card-h-maxmin" elevation="3" rounded="lg">
                <div class="text-right">
                  <span class="text-medium-emphasis text-small"
                    v-if="dataList && dataList.notes && dataList.notes.length">limit
                    {{ dataList.notes.length || 0 }} / 50</span>
                  <v-btn variant="text" @click="noteDialog = true">
                    <v-icon icon="mdi-square-edit-outline" size="25"></v-icon>
                  </v-btn>
                </div>
                <div class="text-left py-10 " v-if="dataList && dataList.notes && dataList.notes.length">
                  <!-- <div v-for="(note, k) in dataList.notes" :key="k">
                    {{ note.title }} {{ note.text }}
                  </div> -->

                  <v-list-item v-for="(note, k) in dataList.notes" :key="note._id" :subtitle="note.text"
                    :title="note.title">
                    <template #title>
                      <span class="text-title text-black">{{ note.title }}</span>
                    </template>
                    <template #subtitle>
                      <div style="opacity: 1 !important;">
                        <span class="text-subtitle text-grey-darken">
                          {{ expandedNoteId === note._id ? note.text : note.text.slice(0, 85) + (note.text.length > 100
                            ? '...' : '') }}
                        </span>
                        <v-btn v-if="note.text.length > 80" size="small" variant="text" color="rgb(43 79 114)"
                          @click="toggleExpandNote(note._id)">
                          <span style="font-size: small;"> {{ expandedNoteId === note._id ? 'ย่อข้อความ' : 'ดูเพิ่มเติม'
                          }}</span>
                        </v-btn>
                      </div>
                    </template>

                    <template v-slot:append>
                      <v-btn color="grey" icon="mdi-pencil" variant="text" @click="editNote(note)"></v-btn>
                      <v-btn color="#E57373" icon="mdi-delete-outline" variant="text"
                        @click="confirmDeleteNote(note._id)"></v-btn>

                    </template>
                  </v-list-item>

                </div>
                <div class="text-center py-10 text-medium-emphasis"
                  v-if="dataList && dataList.notes && dataList.notes.length == 0">

                  {{ 'ไม่มีรายการ' }}
                </div>
              </v-card>

              <!-- NOTE DIALOG -->
              <v-dialog v-model="noteDialog" max-width="600">
                <v-card>
                  <v-card-title class="text-h6">Note</v-card-title>
                  <v-card-text>
                    <v-text-field label="หัวเรื่อง" variant="outlined" v-model="noteTitle"></v-text-field>
                    <v-textarea v-model="noteText" label="ข้อความ" auto-grow rows="4" variant="outlined" />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="" variant="text" @click="noteDialog = false">ยกเลิก</v-btn>
                    <v-btn color="#96ccd5" variant="flat" @click="saveNote">บันทึก</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>

          </v-col>
        </v-row>
      </v-col>

      <!-- NOTIFICATION -->
      <v-col cols="12" md="4">
        <div class="mb-3">
          <div class="font-title2 base-color">Notification</div>
          <v-card class="mx-auto pa-3 card-h-maxmin mt-3" elevation="3" rounded="lg">
            <div class="text-center py-15 text-medium-emphasis"> ไม่มีการแจ้งเตือน </div>
          </v-card>
        </div>
        <div class="my-2">
          <v-card class="mx-auto pa-3 mt-3" elevation="3" rounded="lg">
            <div class="font-title2 my-2 base-color">Calendar</div>
            <hr />
            <v-date-picker v-model="date" class="mx-auto mt-2 elevation-0" color="#96CCD5"></v-date-picker>
            <v-row>
              <v-col cols="12" class="font-title2 my-2 base-color">Upcoming schedule</v-col>
              <hr class="mb-3 mx-3 w-100" />
              <!-- <hr class="mb-3" /> -->
              <v-col cols="12" v-if="date" class="text-topic text-medium-emphasis pt-0">
                {{ $moment(date).format("ddd MMM DD YYYY") }}
              </v-col>
              <!-- <div class="text-topic">Mission R1 | Team C/D/E/F/G</div>
              <div class="text-topic">Mission M5 | Team C/D/E/F/G</div> -->
              <v-col cols="12" class="px-0 pt-0">
                <div class="d-flex align-center">
                  <v-col cols="4" sm="2" md="5" lg="3" class="py-0 pe-0">
                    Mission R1
                  </v-col>
                  <hr class="mx-2" style="background-color: #f48fb1; width: 5px; height: 40px; border: none;">
                  <v-col class="py-0 ps-0">
                    Team C/D/E/F/G
                  </v-col>
                </div>
              </v-col>
              <v-col cols="12" class="px-0 pt-0">
                <div class="d-flex align-center">
                  <v-col cols="4" sm="2" md="5" lg="3" class="py-0 pe-0">
                    Mission M5
                  </v-col>
                  <hr class="mx-2" style="background-color: #671D1D; width: 5px; height: 40px; border: none;">
                  <v-col class="py-0 ps-0">
                    Team C/D/E/F/G
                  </v-col>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-col>

    </v-row>
  </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
const { getTeamColor, getMissionColor } = useColors();
const { $swal } = useNuxtApp();
const date = ref(new Date());

const mission = ref([
  { name: "R2", team: ["C", "D"] },
  { name: "R1", team: ["C", "D", "E", "F"] },
  { name: "M7", team: ["C", "E"] },
]);

const userRequests = ref([
  { name: "user01", team: "Team C" },
  { name: "user02", team: "Team A" },
  { name: "user03", team: "Team G" },
]);

const adminHeaders = ref([
  { text: 'ภารกิจ', value: 'mission' },
  // { text: 'รายละเอียด', value: 'description' },
  { text: 'ผู้รับผิดชอบ', value: 'assign_team' },

  { text: 'เวลา', value: 'start_date' },
  { text: 'จัดการ', value: 'manage' },
]);

const team = ref(["C", "D", "E", "F", "G"]);
const hexToRgba = (hex, alpha) => {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return (
      'rgba(' +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
      `,${alpha})`
    );
  }
  return hex; // fallback for unexpected value
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const buddhistYear = date.getFullYear() + 543
  const shortYear = String(buddhistYear).slice(-2) // เอาแค่ 2 หลักท้าย
  return `${day}/${month}/${shortYear}`
}

const update = ref([
  { date: "06 Jan 68", mission: "R1", url: "https://www.facebook.com/", user: "user001", manage: "" },
  { date: "04 Jan 68", mission: "R1", url: "https://www.facebook.com/", user: "user001", manage: "" },
  { date: "01 Jan 68", mission: "R1", url: "https://www.facebook.com/", user: "user001", manage: "" },
  { date: "18 Jan 67", mission: "R1", url: "https://www.facebook.com/", user: "user001", manage: "" },
]);

const noteDialog = ref(false);
const noteText = ref("");
const noteTitle = ref("");
const dataList = ref("");
const editingNoteId = ref(null);

const editNote = (note) => {
  noteTitle.value = note.title;
  noteText.value = note.text;
  editingNoteId.value = note._id;
  noteDialog.value = true;
};

const expandedNoteId = ref(null);

const toggleExpandNote = (id) => {
  expandedNoteId.value = expandedNoteId.value === id ? null : id;
};

const saveNote = async () => {
  try {
    const payload = {
      title: noteTitle.value,
      text: noteText.value,
    };

    if (editingNoteId.value) {
      await updateNote(editingNoteId.value, payload);
    } else {
      await createNote(payload);
    }

    $swal.fire({
      title: 'สำเร็จ!',
      text: editingNoteId.value ? 'อัปเดตเรียบร้อย' : 'บันทึกเรียบร้อย',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });

    noteText.value = '';
    noteTitle.value = '';
    editingNoteId.value = null;
    noteDialog.value = false;
    dataList.value = await fetchDashboard();

  } catch (err) {
    $swal.fire({
      title: 'เกิดข้อผิดพลาด!',
      text: 'ไม่สามารถบันทึกข้อมูลได้',
      icon: 'error',
      timer: 2000,
      showConfirmButton: false
    });
  }
};
const confirmDeleteNote = (id) => {
  $swal.fire({
    title: 'คุณแน่ใจหรือไม่?',
    text: 'คุณต้องการลบ Note นี้ใช่หรือไม่?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'ลบ',
    cancelButtonText: 'ยกเลิก'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteNote(id);
        $swal.fire('ลบสำเร็จ!', 'Note ถูกลบเรียบร้อยแล้ว', 'success');
        dataList.value = await fetchDashboard();
      } catch (err) {
        $swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถลบ Note ได้', 'error');
      }
    }
  });
};
// Reactive property to track if the viewport is mobile
const isMobile = ref(false);

// Only run this logic in the client environment
if (process.client) {
  isMobile.value = window.innerWidth < 860;

  // Function to update `isMobile` on window resize
  const updateIsMobile = () => {
    isMobile.value = window.innerWidth < 960;
  };

  // Watch for window resize events
  watchEffect(() => {
    window.addEventListener("resize", updateIsMobile);
    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  });
}

onMounted(async () => {

  try {
    dataList.value = await fetchDashboard();
    console.log(dataList.value);

  } catch (error) {
    console.error("Error fetching users:", error);
  }

});
</script>


<style>
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: white;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #f1f1f1;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.v-date-picker-header {
  background-color: white !important;
  height: 50px;
}

.v-date-picker-header__content {
  align-items: center;
  display: inline-flex;
  font-size: 23px;
  line-height: 30px;
  grid-area: content;
  justify-content: space-between;
}

.card-h-maxmin {
  max-height: 500px;
  min-height: 500px;
  overflow-y: auto;
}

.card-h-90 {
  height: 90%;
  overflow-y: auto;
}

.v-picker-title {
  display: none;
}
</style>
