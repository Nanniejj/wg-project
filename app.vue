<template>
  <NuxtLayout>
    <div :style="$route.name === 'signup' ? 'background-color: #454545;' : ''">
      <v-container
        v-if="$route.name !== 'login'"
        class="pa-3"
        style="min-height: 80vh"
      >
        <NuxtPage />
      </v-container>
      <template v-else>
        <NuxtPage class="pa-3" style="min-height: 80vh" />
      </template>
    </div>
  </NuxtLayout>
</template>
<style>
  * {
  font-family: "IBM Plex Sans Thai", sans-serif !important;
  font-size: 16px;
}

.base-color {
  color: #2A3547;
}

.font-title {
  font-size: 22px;
  /* font-weight: 600; */
  /* color: #5a5a5a !important; */
  font-style: normal;
}

.font-title2 {
  font-size: 21px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: 1px;
}

.font-subtitle {
  font-size: 20px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 1px;
}

.text-topic {
  font-size: 18px;
  font-weight: 400;
}

.font-khmer {
  font-family: "Marcellus", serif !important;
  font-weight: 400;
  font-style: normal;

}

:lang(th) {
  font-family: "IBM Plex Sans Thai", sans-serif !important;
  font-size: xx-large !important;
}

.font-thai-title2 {
  font-family: "IBM Plex Sans Thai", sans-serif !important;
  font-size: 19px;
  font-weight: 500 !important;
  letter-spacing: 2px;
  /* color: #5e5c5a !important; */
}

:lang(th) {
  font-family: "IBM Plex Sans Thai", sans-serif !important;
  font-size: 19px !important;
  font-weight: 500 !important;
  letter-spacing: 2px;
}

.border-title {
  border-top: 1px solid #000000be;
  /* เส้นขอบด้านบน */
  border-bottom: 1px solid #000000be;
  /* เส้นขอบด้านล่าง */
  border-left: none;
  /* ไม่มีเส้นขอบด้านซ้าย */
  border-right: none;
  /* ไม่มีเส้นขอบด้านขวา */
  box-shadow: rgba(0, 0, 0, 0.45) 0px 17px 18px -21px;
}

.truncate-text-1 {
  white-space: nowrap;
  /* ทำให้ข้อความไม่แยกบรรทัด */
  overflow: hidden;
  /* ซ่อนข้อความที่เกินออกจากกล่อง */
  text-overflow: ellipsis;
  /* เพิ่ม ... ที่ท้ายข้อความ */
  width: 85%;
}

.truncate-text-tag {
  white-space: nowrap;
  /* ทำให้ข้อความไม่แยกบรรทัด */
  overflow: hidden;
  /* ซ่อนข้อความที่เกินออกจากกล่อง */
  text-overflow: ellipsis;
  /* เพิ่ม ... ที่ท้ายข้อความ */
  width: 100%;
}

.truncate-text-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}

.truncate-text-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
}

.card-stat-shadow {
  box-shadow: 3px 3px 6px #00000029;
  border-radius: 23px;
}

.mx3 {
  margin-left: 3% !important;
  margin-right: 3% !important;
}

.text-h4 {
  font-size: 28px !important;
}
.swal2-container.swal2-center.swal2-backdrop-show{
z-index: 999999;
}
div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm),div:where(.swal2-container) button:where(.swal2-styled):not([disabled]) {
    color: #fff !important;
}
@media (min-width: 1580px) {
  .v-container {
    /* max-width: 1400px; */
  }
}

@media (min-width: 960px) {
  .v-container {
    max-width: 1400px;
  }
}


@media (min-width: 1280px) {
  .v-container {
    max-width: 1400px;
  }
}

@media only screen and (min-width: 0px) and (max-width: 800px) {
  .text-h4 {
    font-size: 19px !important;
  }

  .text-h3 {
    font-size: 20px !important;
  }

  .font-title2 {
    font-size: 17px !important;
  }

  .ql-editor {
    font-size: 12px;
  }

  .text-h4 {
    font-size: 19px !important;
  }

  .text-h5 {
    font-size: 15px !important;
  }

  .font-subtitle {
    font-size: 15px;
    letter-spacing: 0px;
  }

  .py-4.border-title {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }
}

@media (min-width: 1920px) {
  .v-container {
    max-width: 1700px;
  }
}
</style>
