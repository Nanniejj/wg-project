<template>
    <div class="my-5 ">
        <h2 class="font-title2 font-weight-medium mb-5">แฟนด้อม Line Open Chat ({{ fandoms.length }})</h2>
        <v-row>
            <v-col v-for="fandom in fandoms" :key="fandom.id" cols="12" md="6" lg="4">
                <v-card class="pa-5 shadow-box-line" :style="{ backgroundColor: getTeamColorSoft(fandom.team) }">
                    <v-row align="center">
                        <v-col cols="8">
                            <v-chip variant="flat" color="white" class="my-2"><span class="font-weight-medium"> {{
                                fandom.admin }}</span></v-chip>
                            <h3 class="my-1 font-title2">{{ fandom.name }}</h3>
                            <div>จำนวนสมาชิก: {{ fandom.members.toLocaleString() }}</div>
                            <div>จำนวนโพสต์: {{ fandom.posts.toLocaleString() }}</div>
                        </v-col>
                        <v-col cols="4" class="d-flex justify-end align-center">
                            <v-avatar size="64" color="grey">
                                <v-img v-if="fandom.img" :lazy-src="fandom.img" :src="fandom.img" class="bg-grey-lighten-2 w-100"
                                cover></v-img>
                                <v-icon v-else size="40">mdi-account</v-icon>
                               
                            </v-avatar>

                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
const { getTeamColorSoft } = useColors();
const fandoms = [
    {
        id: 1,
        admin: "Admin C",
        name: "รักษ์ราษย์",
        members: 52,
        posts: 80,
        img: "Mask Group 87.png",
        bgColor: "#E9D8FD",
        team: 'C'
    },
    {
        id: 2,
        admin: "Admin C",
        name: "ทัพไทยรีวิว",
        members: 2353,
        posts: 1590,
        img: "Mask Group 89.png",
        bgColor: "#DAD6FF",
        team: 'C'
    },
    {
        id: 3,
        admin: "Admin G",
        name: "Evil Digger",
        members: 38,
        posts: 20,
        img: "Mask Group 90.png",
        bgColor: "#FADCEB",
        team: 'G'
    },
    {
        id: 4,
        admin: "Admin F",
        name: "คลื่น ไดโน",
        members: 47,
        posts: 80,
        img: "Mask Group 91.png",
        bgColor: "#DFF8FF",
        team: 'F'
    },
    {
        id: 5,
        admin: "Admin E",
        name: "ด๋อมลุง",
        members: 91,
        posts: 180,
        img: "Mask Group 92.png",
        bgColor: "#FFF3C4",
        team: 'E'
    },
    {
        id: 6,
        admin: "Admin D",
        name: "Thai-D",
        members: 114,
        posts: 50,
        img: "R1(6).png",
        bgColor: "#DFFFE3",
        team: 'D'
    },
];
</script>

<style>
.shadow-box-line {
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 25px;
    /* padding: 10px; */
}
</style>