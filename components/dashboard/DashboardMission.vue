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
              <div v-for="(user, i) in userRequests" :key="i" class="py-3">
                <hr class="mb-3" />
                <v-row class="align-center">
                  <v-col >
                    <!-- <v-avatar size="40" class="my-1 elevation-4" rounded-circle
                      :style="{ borderRadius: '10px', backgroundColor: getMissionColor(user.name) }">
                      <v-icon :icon="user.name.startsWith('R') ? 'mdi-archive-outline' : 'mdi-account-supervisor'"
                        size="30" color="white"></v-icon>
                    </v-avatar> -->
                    <v-avatar icon="mdi-account" size="38" class="my-1 elevation-4"></v-avatar>
                    <span class="text-topic mx-2">{{ user.name }}</span>
                  </v-col>
                  <v-col cols="auto" class="py-3">
                    <v-chip class="mr-1 mt-1" variant="flat"
                      :color="getTeamColor(user.team.replace('Team ', ''))">
                      <span class="text-white font-weight-bold">{{ user.team }}</span>
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
              <div v-for="(item, i) in team" :key="i">
                <v-row>
                  <v-col cols="6">
                    <v-avatar :color="getTeamColor(item)" size="38" class="my-1 elevation-4"></v-avatar>
                    <span class="text-topic"> Team {{ item }} </span>
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
              <div class="font-title2 base-color">Update mission</div>
              <div class="text-medium-emphasis">
                Update mission <span class="float-right"> view all</span>
              </div>
              <!-- {{ isMobile }}ffffffffffffffff -->
              <v-data-table :items="update" :mobile="isMobile" hide-default-footer hide-default-header>
                <template #item.mission="{ item }">
                  <div>Mission {{ item.mission }}</div>
                </template>
                <template #item.url="{ item }">
                  <v-btn :href="item.url" target="_blank" variant="text" color="#2A3547">
                    <v-icon>mdi-link</v-icon> URL
                  </v-btn>
                </template>
                <template #item.user="{ item }">
                  <div>
                    <v-icon color="#96CCD5">mdi-circle</v-icon>
                    {{ item.user }}
                  </div>
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
                  <v-btn variant="text">
                    <v-icon icon="mdi-square-edit-outline" size="25"></v-icon>
                  </v-btn>
                </div>
                <div class="text-center py-10 text-medium-emphasis">ไม่มีรายการ</div>
              </v-card>
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
              <hr class="mb-3 mx-3 w-100"/>
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

const date = ref(new Date());

const mission = ref([
  { name: "R2", team: ["C", "D"] },
  { name: "R1", team: ["C", "D", "E", "F"] },
  { name: "M7", team: ["C", "E"] },
]);

const userRequests  = ref([
  { name: "user01", team: "Team C" },
  { name: "user02", team: "Team A" },
  { name: "user03", team: "Team G" },
]);

const team = ref(["C", "D", "E", "F", "G"]);

const update = ref([
  { date: "06 Jan 68", mission: "R1", url: "https://www.facebook.com/", user: "user001", manage: "" },
  { date: "04 Jan 68", mission: "R1", url: "https://www.facebook.com/", user: "user001", manage: "" },
  { date: "01 Jan 68", mission: "R1", url: "https://www.facebook.com/", user: "user001", manage: "" },
  { date: "18 Jan 67", mission: "R1", url: "https://www.facebook.com/", user: "user001", manage: "" },
]);


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
  max-height: 450px;
  min-height: 200px;

}

.card-h-90 {
  height: 90%;
  overflow-y: auto;
}

.v-picker-title {
  display: none;
}
</style>
