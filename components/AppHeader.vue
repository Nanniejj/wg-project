<template>
  <div>
    <div class="d-flex justify-space-between">
      <div>
        <!-- Toggle Button for Menu -->
        <v-btn v-if="isMobile" class="mx-0" icon @click="toggleMenu" variant="text" size="x-large">
          <v-icon icon="mdi-menu" size="30"></v-icon>
        </v-btn>
      </div>
      <div v-if="isMobile">
        <span class="d-flex align-items-center icon-right" style="
            z-index: 999;
            margin-right: 20px;
            border-radius: 10px;
            margin-top: 20px;
          ">
          <!-- <v-avatar
            color="#2A3547"
            size="45"
            class="my-1 elevation-4"
            rounded
            style="border-radius: 10px"
          > -->
          <v-icon color="#2A3547" size="20" icon="mdi-account" style="border-radius: 10px"></v-icon>
          <span class="mr-2"> {{ username }} </span>
          <v-icon v-tooltip="{ text: 'ออกจากระบบ', location: 'bottom' }" @click="dialogLogout = true"
            class="hover-pointer" icon="mdi-logout"></v-icon>

          <!-- </v-avatar> -->
        </span>
      </div>
    </div>

    <!-- Conditional List for Mobile -->
    <v-list v-if="isMobile && menuVisible" class="position-absolute w-100" style="
        z-index: 999;
        background: #fcf8f8f2;
        box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px,
          rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,
          rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,
          rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,
          rgba(14, 63, 126, 0.04) 0px 12px 12px -6px,
          rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
      ">
      <v-list-item v-for="(tabData, index) in tabs" :key="index" @click="navigateToTab(tabData.path, index)">
        <v-list-item-content>
          <v-list-item-title :class="tab === index
            ? 'text-pink font-title text-h4'
            : 'text-grey-darken-3 font-title text-h4'
            ">{{ tabData.label }}</v-list-item-title>
        </v-list-item-content>
        <v-divider></v-divider>
      </v-list-item>
    </v-list>

    <!-- Conditional Tabs for Desktop -->
    <div class="desk-nav">
      <div style="
          height: 60px;
          display: flex;
          align-items: center;
          position: relative;
        " class="mt-3 px-3">
        <span class="d-flex align-items-center icon-left" style="z-index: 999; margin-right: 10px">
          <v-avatar color="#2A3547" size="50" class="my-1 elevation-4">
            <span class="text-h6 font-weight-bold font-khmer custom-letter-spacing">127</span>
          </v-avatar>
        </span>

        <!-- Tabs Navigation -->
        <v-tabs v-show="!isMobile" v-model="tab" align-tabs="center" stacked color="#2A3547" show-arrows
          style="flex-grow: 1">
          <v-tab v-for="(tabData, index) in tabs" :key="index" :value="index" class="text-capitalize px-3 pt-2"
            style="height: 60px" @click="navigateToTab(tabData.path, index)">
            <span class="font-title2" style="color: #2a3547" :style="{ fontWeight: tab === index ? 'bold' : 'normal' }">
              {{ tabData.label }}
            </span>
          </v-tab>
        </v-tabs>

        <!-- Right Element -->
        <span class="d-flex align-items-center icon-right"
          style="z-index: 999; margin-right: 10px; border-radius: 10px">
          <v-icon color="#2A3547" size="25" icon="mdi-account" style="border-radius: 10px"></v-icon>
          <span class="mr-2"> {{ username }} </span>
          <v-icon @click="dialogLogout = true" v-tooltip="{ text: 'ออกจากระบบ', location: 'bottom' }" icon="mdi-logout"
            size="large"></v-icon>
          <!-- </v-avatar> -->
        </span>
      </div>
      <hr class="mx-auto mt-3" style="width: 99%" />
    </div>
  </div>
  <v-dialog v-model="dialogLogout" max-width="500">
    <v-card rounded="lg">
      <v-card-title>
        <span class="headline">คำเตือน</span>
      </v-card-title>
      <v-card-subtitle class="text-center">
        <v-icon color="error" size="50">mdi-alert</v-icon>
        <div class="text-h7 font-weight-bold">คุณต้องการออกจากระบบหรือไม่?</div>
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer />
        <v-btn color="green" @click="navigateToLogin">ยืนยัน</v-btn>
        <v-btn color="red" @click="dialogLogout = false">ยกเลิก</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//   import SearchContents from './SearchContents.vue';

export default {
  // components: { SearchContents },

  data() {
    return {
      username: null,
      dialogLogout: false,
      overlay: false,
      tab: null,
      activeTab: null, // เก็บค่าที่แสดง tab active
      menuVisible: false,
      isMobile: false,
      tabs: [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Tasks", path: "/tasks" },
        { label: "Create", path: "/create" },
        // { label: "Mission", path: "/mission" },
        { label: "Archive", path: "/archive" },
        { label: "Report", path: "/report" },
        { label: "Data Management", path: "/hvt" },
        { label: "User Management", path: "/management" },
      ],
    }
  },
  methods: {
    updateIsMobile() {
      this.isMobile = window.innerWidth <= 800;
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    toggleOverlay() {
      this.overlay = !this.overlay;
    },
    navigateToTab(path, index) {
      this.tab = index;
      this.menuVisible = false;
      this.$router.push(path);
    },
    navigateToLogin() {
      // remove authToken from localStorage
      // localStorage.removeItem("authToken");
      // or use cookie
      // useCookie("authToken").value = "";
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("authToken");
      localStorage.removeItem("role");
      localStorage.removeItem("access_menu");
      localStorage.removeItem("2fa");
      // redirect to /login
      this.$router.push("/login");
    },
  },
  mounted() {
    this.updateIsMobile();
    window.addEventListener("resize", this.updateIsMobile);
    this.username = localStorage.getItem("username") || "ไม่ทราบชื่อ";
    nextTick(() => {
      const path = this.$route.path;
      if (path.startsWith("/dashboard")) {
        this.tab = 0;
      } else if (path.startsWith("/tasks")) {
        this.tab = 1;
      } else if (path.startsWith("/create")) {
        this.tab = 2;
      } else if (path.startsWith("/mission")) {
       // this.tab = 3;
      } else if (path.startsWith("/archive")) {
        this.tab = 3;
      } else if (path.startsWith("/management")) {
        this.tab = 6;
      } else if (path.startsWith("/report")) {
        this.tab = 4;
      } else if (path.startsWith("/hvt")) {
        this.tab = 5;
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateIsMobile);
  },
};
</script>

<style>
.custom-letter-spacing {
  letter-spacing: 2px !important;
  /* กำหนดระยะห่างเอง */
}

.desk-nav .v-tab__slider {
  font-weight: 700;
  height: 0px !important;
}

@media only screen and (max-width: 800px) {
  .desk-nav {
    display: none;
  }

  .btn-search .mdi-magnify {
    font-size: 32px !important;
  }

  .btn-search {
    float: right !important;
  }

  .img-logo {
    height: 35px !important;
    margin: 15px !important;
  }
}
</style>
