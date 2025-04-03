<template>
    <v-container class="">
        <v-card class="mx-auto pa-6" elevation="0" width="1300">
            <v-card-title class="text-h5 py-11 mb-5" style="background-color: #8F966C;">
                <v-icon icon="mdi-view-grid-plus" color="#ffffff"></v-icon> New Virtual Machine</v-card-title>

            <v-card-text class="px-8">
                <v-stepper v-model="step" class="px-5 " bg-color="">
                    <v-stepper-header class="my-5">
                        <v-stepper-item step="1" title="Select creation type" color="#009688" />
                        <v-stepper-item step="2" title="Select a name and guest OS" color="#009688" />
                        <v-stepper-item step="3" title="Select storage" color="#60B0D3" />
                        <v-stepper-item step="4" title="Customize settings" color="#009688" />
                        <v-stepper-item step="5" title="Ready to complete" color="#009688" />
                    </v-stepper-header>

                    <v-stepper-content step="2">
                        <div class="my-5">

                            <p class="text-h6">Select a name and guest OS</p>
                            <p class="text-body-1">Specify a unique name and OS</p>
                            <hr class="my-5">
                            <div class="text-h6">Name</div>
                            <v-text-field v-model="vmName" label="Enter a name for the virtual machine" outlined dense
                                class="mb-4" variant="outlined" />
                            <p class="text-body">
                                Virtual machine names can contain up to 80 characters and they must be unique within
                                each ESXi instance.
                            </p>
                            <p class="text-body">
                                Identifying the guest operating system here allows the wizard to provide the appropriate
                                defaults for the operating system installation.
                            </p>
                            <br>
                            <div class="text-h6"> Compatibility</div>
                            <v-text-field v-model="vmName" label="ESXI 8.0 virtual machine" outlined dense
                                 variant="outlined" />
                
                            <div class="text-h6">Guest OS Family</div>
                            <v-select v-model="selectedOS" :items="['Linux', 'Mac OS', 'Other', 'Windows']"
                                outlined dense variant="outlined" />
                    
                            <div class="text-h6">Guest OS version</div>
                            <v-select v-model="selectedOS" :items="['Linux', 'Mac OS', 'Other', 'Windows']"
                                outlined dense variant="outlined" />
                        </div>
                    </v-stepper-content>
                </v-stepper>
            </v-card-text>


        </v-card>
        <div class="float-right mt-2 mb-8" style="right:230px;position: relative;">
            <br>
            <v-btn color="#E53935" @click="cancel" class="mx-1">CANCEL</v-btn>
            <v-btn color="#60B0D3" @click="prevStep" class="mx-1" style="color: black;">BACK</v-btn>
            <v-btn color="#60B0D3" @click="nextStep" class="mx-1" style="color: black;">NEXT</v-btn>
            <v-btn color="grey" disabled class="mx-1">FINISH</v-btn>
        </div>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';

const step = ref(2);
const vmName = ref('');
const selectedOS = ref('');

const cancel = () => {
    vmName.value = '';
    selectedOS.value = '';
};

const prevStep = () => {
    if (step.value > 1) step.value--;
};

const nextStep = () => {
    if (step.value < 5) step.value++;
};
</script>
<style>
.v-stepper-item__avatar.v-avatar {
    background: #000;
    color: rgb(var(--v-theme-on-surface-variant));

}
</style>
<style scoped>
.fill-height {
    min-height: 100vh;
}
</style>