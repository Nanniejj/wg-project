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
          @click="dialogDelete = true"
          color="green"
          v-tooltip="'อนุมัติสิทธิ์เข้าใช้งาน'"
        >
          mdi-check
        </v-icon>
        <span
          style="color: #29a0af"
          v-else
          class="mx-4"
          size="small"
          @click="editItem(item)"
        >
          ยืนยัน
        </span>

        <v-dialog v-model="dialogDelete" max-width="400">
          <v-card rounded="xl" elevation="7">
            <v-card-title class="text-center">
              <span class="headline">คำเตือน</span>
            </v-card-title>
            <v-card-subtitle class="text-center">
              <transition name="fade" mode="out-in">
                <v-icon
                  :key="isSaved"
                  :color="isSaved ? 'green' : 'gray'"
                  size="80"
                >
                  {{ isSaved ? "mdi-check-circle" : "mdi-account-key-outline" }}
                </v-icon>
              </transition>

              <transition name="fade" mode="out-in">
                <div class="text-h7 pt-5 font-weight-bold" :key="isSaved">
                  {{
                    isSaved
                      ? "สิทธิ์ถูกอนุมัติเรียบร้อยแล้ว"
                      : "ท่านต้องการเพิ่มสิทธิ์บุคคลนี้ใช่หรือไม่?"
                  }}
                </div>
              </transition>
            </v-card-subtitle>
            <v-card-actions class="justify-center pt-5">
              <v-btn color="green" @click="saveItem(item)" large>ยืนยัน</v-btn>
              <v-btn color="red" @click="dialogDelete = false" large
                >ยกเลิก</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
    <div class="text-center pt-16">
      <v-pagination
        v-model="page"
        :length="pagination.value"
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
      MyTasks: true,
      TaskManagement: false,
      DataManagement: true,
    },
    is_active: true,
    mission: null,
  });
  const selected = ref([]);
  let lobbyItems = ref([]);
  const dialogDelete = ref(false);
  const isSaved = ref(false); // false = ยังไม่กด, true = กดแล้วและสำเร็จ
  // กำหนด headers สำหรับตาราง
  const headers = ref([]);

  const roles = [
    { value: "SUPERADMIN", text: "ผู้บังคับบัญชา" },
    { value: "ADMIN", text: "ผู้ปฏิบัติงานระดับสั่งการ" },
    { value: "SUPERUSER", text: "หัวหน้าผู้ปฏิบัติงาน" },
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
    dialogData.value.lead = item.lead;

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
  const saveItem = async (item) => {
    let response;
    console.log(item._id);
    const accessArray = Object.keys(dialogData.value.access).filter(
      (key) => dialogData.value.access[key] === true
    );

    const payload = {
      access_menu: accessArray,
      is_active: dialogData.value.is_active,
      role: "USER",
      lead: false,
    };
    console.log(payload);

    try {
      response = await $apiClient.put(`/api/editUser/${item._id}`, payload);
      // console.log("Response data:", response.data); // ค่าผลลัพธ์จากการเรียก API
      // console.log("Response data:", response.status); // ค่าผลลัพธ์จากการเรียก API

      if (response.status == 200) {
        // alert(`แก้ไขสำเร็จ`);
        isSaved.value = true;

        setTimeout(() => {
          fetchData();
          dialogDelete.value = false;
          isSaved.value = false;
        }, 1000);
      } else {
        alert(`ไม่สามารถแก้ไขได้`);
      }
    } catch (error) {
      alert(`เกิดข้อผิดพลาดกรุณาลองใหม่`);
      //   alert(`Error: ${error.response.data.message}`);
    }
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

      lobbyItems.value = response.data.data;
      // console.log(lobbyItems.value);
      pagination.value = response.data.totalPages;
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
      case "SUPERUSER":
        access = {
          Dashboard: false,
          Report: true,
          HVT: false,
          Management: true,
          Mission: false,
          Archive: false,
          Tasks: false,
          Create: false,
          MyTasks: true,
          TaskManagement: false,
          DataManagement: true,
        };
        break;
      default:
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
          TaskManagement: false,
          DataManagement: true,
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

  .fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
