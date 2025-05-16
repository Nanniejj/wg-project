<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="lobbyItems"
      v-model="selected"
      item-value="user"
      :mobile="isMobile"
      :hide-default-header="isMobile"
      :items-per-page="isMobile ? 5 : 10"
      hide-default-footer
      :loading="isLoading"
      loading-text="กำลังโหลดข้อมูล..."
    >
      <!-- สร้าง template สำหรับคอลัมน์ status -->
      <template #item.is_active="{ item }">
        <v-chip color="orange">รอยืนยันสิทธิ์</v-chip>
      </template>

      <template #item.create_date="{ item }">
        <span>
          {{ formatDate(item.create_date) }}
        </span>
      </template>

      <!-- สร้าง template สำหรับคอลัมน์ affiliation -->
      <template #item.affiliation="{ item }">
        <div class="text-capitalize">{{ item.affiliation }}</div>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          v-if="!isMobile"
          class="mx-4"
          size="small"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <span
          style="color: #29a0af"
          v-else
          class="mx-4"
          size="small"
          @click="editItem(item)"
        >
          แก้ไข
        </span>

        <v-dialog v-model="dialogDelete" max-width="800px">
          <v-card>
            <div class="justify-end d-flex mt-4 mx-2">
              <v-btn variant="text" @click="closeDialog"
                ><v-icon style="font-size: 30px">mdi-close</v-icon></v-btn
              >
            </div>

            <div class="justify-center d-flex mt-4 mx-2 mb-4">
              <span class="text-h4">ข้อมูลผู้ยืนยันสิทธิ์</span>
            </div>
            <v-container class="pa-4">
              <v-card class="dashed-border ma-4" rounded="xl">
                <v-row class="px-4">
                  <v-col cols="12" sm="6">
                    <span style="font-size: 16px">Username</span>
                    <v-text-field
                      density="compact"
                      variant="underlined"
                      rounded="lg"
                      disabled
                      v-model="dialogData.username"
                      style="margin-top: 5px"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <span style="font-size: 16px">Team</span>
                    <v-text-field
                      density="compact"
                      variant="underlined"
                      rounded="lg"
                      disabled
                      v-model="dialogData.affiliation"
                      style="margin-top: 5px"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <div class="mx-4">
                  <span style="font-size: 16px">E-mail</span>
                  <v-text-field
                    density="compact"
                    variant="underlined"
                    rounded="lg"
                    v-model="dialogData.email"
                    disabled
                    :item="item.username"
                    style="margin-top: 5px"
                  ></v-text-field>
                </div>
              </v-card>

              <div class="px-4">
                <span class="text-h6">ระดับการเข้าถึง</span>
                <v-autocomplete
                  density="compact"
                  v-model="dialogData.role"
                  :items="roles"
                  item-title="text"
                  item-value="value"
                  placeholder="บทบาท"
                  variant="outlined"
                ></v-autocomplete>

                <!-- <div class="justify-center d-flex px-16">
                  <v-radio-group v-model="dialogData.role">
                    <v-radio
                      v-if="storageRole == 'SUPERADMIN'"
                      label="ผู้บังคับบัญชา"
                      value="SUPERADMIN"
                    ></v-radio>
                    <v-radio
                      v-if="storageRole == 'SUPERADMIN'"
                      label="ผู้ปฏิบัติงานระดับสั่งการ"
                      value="ADMIN"
                    ></v-radio>
                    <v-radio label="ผู้ปฏิบัติงาน" value="USER"></v-radio>
                  </v-radio-group>
                </div> -->
              </div>

              <div
                v-if="dialogData.role == 'ADMIN' && dialogData.role != null"
                class="px-4"
              >
                <span class="text-h6">ภารกิจสั่งการ</span>
                <v-autocomplete
                  density="compact"
                  v-model="dialogData.mission"
                  :items="mission"
                  label="เลือกภารกิจ"
                  variant="outlined"
                  multiple
                  chips
                ></v-autocomplete>
              </div>

              <span class="text-h6 px-4">ระดับการเข้าถึงเมนู</span>
              <div
                v-if="dialogData.role != 'USER' && dialogData.role != null"
                class="px-4"
              >
                <v-autocomplete
                  density="compact"
                  v-model="selectedMenus"
                  :items="menu_admin"
                  label="เมนู"
                  variant="outlined"
                  multiple
                  chips
                ></v-autocomplete>
                <!-- <div class="justify-center d-flex">
                  <v-row class="px-16">
                    <v-col cols="12" sm="3">
                      <v-checkbox
                        v-model="dialogData.access.dashboard"
                        label="Dashboard"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-checkbox
                        v-model="dialogData.access.report"
                        label="Report"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-checkbox
                        v-model="dialogData.access.HVT"
                        label="HVT"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-checkbox
                        v-model="dialogData.access.management"
                        label="Manage"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </div>
                <div class="justify-center d-flex" style="margin-top: -20px">
                  <v-row class="px-16">
                    <v-col cols="12" sm="3">
                      <v-checkbox
                        v-model="dialogData.access.mission"
                        label="Mission"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-checkbox
                        v-model="dialogData.access.archive"
                        label="Archive"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-checkbox
                        v-model="dialogData.access.tasks"
                        label="Tasks"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-checkbox
                        v-model="dialogData.access.create"
                        label="Create"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </div> -->
              </div>

              <div v-else class="px-4">
                <!-- <div class="justify-center d-flex">
                  <v-row class="px-16">
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="dialogData.access.userTasks"
                        label="My Tasks"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="dialogData.access.userManage"
                        label="Task Manage"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="dialogData.access.report"
                        label="Report"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </div> -->
                <v-autocomplete
                  v-model="selectedMenus"
                  density="compact"
                  :items="menu_user"
                  label="เมนู"
                  variant="outlined"
                  multiple
                  chips
                ></v-autocomplete>
              </div>

              <div class="justify-end d-flex pt-8 px-4 pb-2">
                <v-btn
                  color="#2A3547"
                  size="large"
                  style="width: 220px; min-width: 50px"
                  @click="saveItem"
                  ><span class="text-h5">บันทึก</span></v-btn
                >
              </div>
            </v-container>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
    <div class="text-center pt-16">
      <v-pagination
        v-model="page"
        :length="pagination"
        rounded="circle"
        class="my-4"
      ></v-pagination>
    </div>
  </div>
</template>
<script setup>
  import { ref, computed, watch, onMounted } from "vue";
  const { $apiClient } = useNuxtApp();
  const storageRole = localStorage.getItem("role");
  const pagination = ref({});
  const page = ref(1);
  const dialogData = ref({
    _id: null,
    username: null,
    affiliation: null,
    email: null,
    role: null,
    access: {
      Dashboard: false,
      Report: true,
      HVT: false,
      Management: false,
      Mission: false,
      Archive: false,
      Tasks: false,
      Create: false,
      MyTasks: false,
      TaskManagement: false,
      DataManagement: false,
    },
    is_active: true,
    mission: null,
  });
  const selected = ref([]);
  let lobbyItems = ref([]);
  const dialogDelete = ref(false);
  // กำหนด headers สำหรับตาราง
  const headers = ref([]);

  const roles = [
    { value: "SUPERADMIN", text: "ผู้บังคับบัญชา" },
    { value: "ADMIN", text: "ผู้ปฏิบัติงานระดับสั่งการ" },
    { value: "USER", text: "ผู้ปฏิบัติงาน" },
    // เพิ่มตัวเลือกอื่นๆ ได้ตามต้องการ
  ];
  const selectedMenus = ref([]);

  const menu_admin = [
    "Dashboard",
    "Tasks",
    "Create",
    "Mission",
    "Archive",
    "Management",
    "Report",
    "HVT",
  ];

  const selectedMission = ref([]);

  const mission = [
    "R1",
    "R2",
    "R3",
    "R4",
    "R5",
    "R6",
    "R7",
    "R8",
    "R9",
    "R10",
    "R11",
    "R12",
    "M1",
    "M2",
    "M3",
    "M4",
    "M5",
    "M6",
    "M7",
    "M8",
    "หัวข้อประสาน",
  ];

  const menu_user = ["MyTasks", "TaskManagement", "Report", "DataManagement"];

  // Function to populate dialog data when editing an item
  const editItem = (item) => {
    dialogDelete.value = true;
    dialogData.value._id = item._id;
    dialogData.value.username = item.username;
    dialogData.value.affiliation = item.affiliation;
    dialogData.value.email = item.email;
    dialogData.value.role = null;
    dialogData.value.mission = null;

    // สำคัญ: ใช้ spread operator เพื่อคัดลอก object
    dialogData.value.access = { ...item.access };
  };

  function closeDialog(item) {
    dialogDelete.value = false;
  }
  const isLoading = ref(true);
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

  // Function to handle saving the item (or deleting)
  const saveItem = async () => {
    // You can handle the save logic here
    // console.log("Item saved:", dialogData.value);

    const accessArray = Object.keys(dialogData.value.access).filter(
      (key) => dialogData.value.access[key] === true
    );
    // console.log(accessArray); // Output: ["management", "mission"]

    let response;
    // console.log("this zone",selectedAffiliation.value,Message.value)
    // console.log(form.value);
    try {
      response = await $apiClient.put(`/api/editUser/${dialogData.value._id}`, {
        access_menu: accessArray,
        is_active: dialogData.value.is_active,
        role: dialogData.value.role,
        mission: dialogData.value.mission,
      });
      // console.log("Response data:", response.data); // ค่าผลลัพธ์จากการเรียก API
      // console.log("Response data:", response.status); // ค่าผลลัพธ์จากการเรียก API

      if (response.status == 200) {
        alert(`แก้ไขสำเร็จ`);
        fetchData();
      } else {
        alert(`ไม่สามารถแก้ไขได้`);
      }
    } catch (error) {
      alert(`เกิดข้อผิดพลาดกรุณาลองใหม่`);
      //   alert(`Error: ${error.response.data.message}`);
    }
    dialogDelete.value = false;
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: '2-digit',
      // minute: '2-digit',
      // second: '2-digit',
      timeZone: "Asia/Bangkok",
      // timeZoneName: 'short',
    };
    return date.toLocaleString("th-TH", options);
  }

  const fetchData = async () => {
    const params = {
      is_active: "false", // หรอ false ตามที่ต้องการ
    };
    params.page = page.value;
    isLoading.value = true;
    try {
      const response = await $apiClient.get("/api/getusertable", {
        params,
      });
console.log(response.data);
      lobbyItems.value = response.data.data;
      console.log(lobbyItems.value);
      pagination.value = response.data.totalPages;
      console.log(response.data.totalPages)
      // affiliations_data.value = response.data;
      //   affiliations_data.value = response.data.map((team) => team.name);
      //   console.log(affiliations_data.value);
      // อัปเดต headers หลังจากดึงข้อมูล
      headers.value = [
        { title: "ชื่อ", value: "username", align: "center" },
        { title: "สังกัด", value: "affiliation", align: "center" },
        // { title: "บทบาท", value: "role" },
        { title: "รายละเอียด", value: "description", align: "center" },
        { title: "วันที่สมัคร", value: "create_date", align: "center" },
        { title: "สถานะ", value: "is_active", align: "center" },
        { title: "Actions", key: "actions", sortable: false },
      ];
      isLoading.value = false;
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  };

  const access = computed({
    get: () => dialogData.value.access,
    set: (newVal) => {
      dialogData.value.access = newVal;
    },
  });
  const updateAccess = () => {
    let access = {};
    switch (dialogData.value.role) {
      case "SUPERADMIN":
        access = {
          Dashboard: false,
          Report: true,
          HVT: false,
          Management: false,
          Mission: false,
          Archive: false,
          Tasks: false,
          Create: false,
          MyTasks: false,
          TaskManagement: false,
          DataManagement: false,
        };
        break;
      case "ADMIN":
        access = {
          Dashboard: true,
          Report: true,
          HVT: true,
          Management: true,
          Mission: true,
          Archive: true,
          Tasks: true,
          Create: true,
          MyTasks: false,
          TaskManagement: false,
          DataManagement: false,
        };
        break;
      case "USER":
        access = {
          Dashboard: false,
          Report: true,
          HVT: false,
          Management: false,
          Mission: false,
          Archive: false,
          Tasks: false,
          Create: false,
          MyTasks: true,
          TaskManagement: true,
          DataManagement: true,
        };
        break;
      default:
        access = {
          Dashboard: false,
          Report: false,
          HVT: false,
          Management: false,
          Mission: false,
          Archive: false,
          Tasks: false,
          Create: false,
          MyTasks: false,
          TaskManagement: false,
          DataManagement: false,
        };
    }
    dialogData.value.access = access;
    selectedMenus.value = Object.keys(access).filter((key) => access[key]);
  };

  watch(
    () => dialogData.value.role,
    () => {
      updateAccess();
    }
  );

  watch(
    () => dialogData.value.access,
    (newAccess) => {
      selectedMenus.value = Object.keys(newAccess).filter(
        (menu) => newAccess[menu]
      );
    },
    { immediate: true }
  );

  onMounted(() => {
    fetchData();
  });
</script>
<style>
  .dashed-border {
  border: 2px dashed #5F5F5F; /* กำหนดเส้นขอบลายปะสีดำขนาด 2 พิกเซล */
  padding: 10px; /* กำหนดระยะห่างภายในกล่อง */
}
</style>
