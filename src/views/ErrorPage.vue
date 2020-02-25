<template>
    <div>
        <img width="120%" height="500" :src="desert" class="img-error background">
        <div class="container container-error">
            <v-img class="cat img-error" :src="cat"></v-img>
            <v-img class="cat2 img-error" :src="cat"></v-img>
            <v-img class="cat3 img-error" :src="cat"></v-img>
            <v-img class="text img-error" :src="text"></v-img>
            <v-img class="hose1 img-error" :src="hose1"></v-img>
            <v-img class="car img-error" :src="car"></v-img>
            <v-img class="hose2 img-error" :src="hose2"></v-img>
            <v-img class="carShadow img-error" :src="carShadow"></v-img>
            <v-img class="catShadow img-error" :src="catShadow"></v-img>
            <v-img class="hose3 img-error" :src="hose1"></v-img>
        </div>
    </div>
</template>

<script>
import CarShadow from '@/assets/error/car_shadow.png';
import Car from '@/assets/error/car.png';
import CatShadow from '@/assets/error/cat_shadow.png';
import Desert from '@/assets/error/desert.jpg';
import Hose1 from '@/assets/error/hose_1.png';
import Hose2 from '@/assets/error/hose_2.png';
import Text from '@/assets/error/text.png';
import Cat from '@/assets/error/cat.png';

export default {
    name: 'ErrorPage',
    data: () => ({
        carShadow: CarShadow,
        car: Car,
        catShadow: CatShadow,
        cat: Cat,
        desert: Desert,
        hose1: Hose1,
        hose2: Hose2,
        text: Text
    })
};
</script>

<style>
.container-error {
    position: relative !important;
    margin-right: auto !important;
    margin-left: auto !important;
    padding: 0 !important;
    width: 100% !important;
    height: 500px;
    clear: both;
}
.img-error {
    position: absolute !important;
}
.background {
    left: -20px !important;
    top: -20px !important;
}
.cat {
    left: 350px;
    top: 160px;
    z-index: 7 !important;
}
.cat2 {
    left: 350px;
    top: 60px;
    z-index: 6 !important;
    transform: scale(0.5);
}
.cat3 {
    left: 60px;
    top: 280px;
    z-index: 6 !important;
    transform: rotateX(180deg) scale(0.5);
}
.text {
    left: 90px;
    top: 150px;
    z-index: 8 !important;
}
.hose1 {
    left: 490px;
    top: 140px;
    z-index: 5 !important;
}
.car {
    left: 450px;
    top: 220px;
    z-index: 5 !important;
}
.hose2 {
    left: 800px;
    top: 150px;
    z-index: 4 !important;
}
.carShadow {
    left: 450px;
    top: 330px;
    z-index: 4 !important;
}
.catShadow {
    left: 340px;
    top: 360px;
    z-index: 5 !important;
}
.hose3 {
    left: 1050px;
    top: 150px;
    z-index: 5 !important;
    transform: rotateY(180deg);
}
</style>