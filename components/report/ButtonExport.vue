<template>
    <div>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="#2a3547" v-bind="props"> <v-icon class="mr-1">mdi-export</v-icon> Export</v-btn>
        </template>
        <v-list>
          <v-list-item @click="exportPDF">PDF</v-list-item>
          <v-list-item @click="exportHTML">HTML</v-list-item>
          <v-list-item @click="exportCSV">CSV</v-list-item>
          <v-list-item @click="exportExcel">Excel</v-list-item>
          <v-list-item @click="exportXML">XML</v-list-item>
          <v-list-item @click="exportJSON">JSON</v-list-item>
        </v-list>
      </v-menu>
    </div>
  </template>
  
  <script>

  export default {
    data() {
      return {
        dataToExport: [
          { id: 1, name: 'Alice', age: 25 },
          { id: 2, name: 'Bob', age: 30 },
          { id: 3, name: 'Charlie', age: 35 }
        ]
      };
    },
    methods: {
      exportPDF() {
       
      },
      exportHTML() {
      
      },
      exportCSV() {
       
      },
      exportExcel() {
      
      },
      exportXML() {
       
      },
      exportJSON() {
     
      }
    }
  };
  </script>
  
  <style scoped>
  .v-btn {
    margin: 5px;
  }
  </style>
  