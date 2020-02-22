<template>
    <!-- <div class="ma-2"> -->
    <v-container>
        <!-- 加载条 -->
        <v-progress-linear :active="loading" :indeterminate="loading" striped absolute top
            color="deep-orange accent-4"></v-progress-linear>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <!-- 复习卡片 -->
                <v-hover v-slot:default="{ hover }" v-for="(record,recordIndex) in records"
                    :key="record.title">
                    <v-card :elevation="hover ? 6 : 2" class="swiper-slide">
                        <!-- 标题 -->
                        <v-badge label="dot" color="red" dot offset-x="10" offset-y="30"
                            :value="record.count!=0">
                            <v-card-title>
                                <v-icon :color="(record.level+1)%2!=0?levelColor[0]:levelColor[1]"
                                    large class="mr-2">{{level[record.level]}}</v-icon>
                                {{record.title}}
                            </v-card-title>
                        </v-badge>
                        <!-- 明细 -->
                        <v-data-table class="pa-1 dataTable" height="350" :headers="headers"
                            :items="record.items" hide-default-header disable-pagination
                            hide-default-footer>
                            <template v-slot:item.action="{ item }">
                                <v-btn icon @click="complate(recordIndex,item)">
                                    <v-icon v-if="!item.flag">pets</v-icon>
                                    <v-icon v-else color="blue">pets</v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                        <v-divider class="mt-2 mx-4"></v-divider>
                        <!-- 确认按钮 -->
                        <v-card-text class="px-0 font-weight-black confirmcard">
                            <v-chip @click="confirmAndClose(recordIndex,confirmIndex)"
                                v-for="(confirm,confirmIndex) in confirms"
                                :key="confirm+record.title" class="mr-2 subtitle-1 confirmbtn"
                                :color="confirmColor[confirmIndex]" dark>
                                {{confirm}}
                            </v-chip>
                        </v-card-text>
                        <!-- 遮罩 -->
                        <v-overlay :absolute="true" :value="record.complation" color="black">
                            <v-chip class="ma-2" :color="confirmColor[record.complation]" label
                                text-color="white">
                                <v-icon left>mdi-twitter</v-icon>
                                Complation
                            </v-chip>
                        </v-overlay>
                    </v-card>
                </v-hover>
            </div>
        </div>
    </v-container>
    <!-- </div> -->

</template>

<script>
import Swiper from 'swiper';
import {getTimeByDate} from '../assets/date';
/* global writeDate recordData todayData historyData */

export default {
    name: 'TodayReview',
    data: () => ({
        headers: [{text: 'name', value: 'title'}, {text: 'action', value: 'action', align: 'center'}],
        records: todayData.data,
        level: ['star_border', 'star_border', 'star_half', 'star_half', 'star', 'star', 'school', 'school', 'beenhere', 'beenhere', 'beenhere'],
        levelColor: ['#F5DA55', 'green'],
        nextNumber: [0, 1, 3, 3, 6, 16, 44, 30, 60, 60, 150],
        confirmColor: ['green', 'orange', 'red'],
        confirms: ['👍认识',  '👌模糊',  '🤢忘记'],
        item: {},
        loading: true,
        overlay: true
    }),
    watch: {
        '$store.state.delete': function(){
            this.records = todayData.data;
        }
    },
    methods: {
        initSwiper(){
            setTimeout(() => {
                this.swiper = new Swiper('.swiper-container', {
                    slidesPerView: 3,
                    centeredSlidesBounds: true,
                    centerInsufficientSlides: true,
                    grabCursor: true,
                    spaceBetween: 20
                });
                this.loading = false;
                this.overlay = false;
            }, 300);
        },
        complate(recordIndex, item){
            const record = this.records[recordIndex];
            const items = record.items;
            const index = items.indexOf(item);
            const obj = items[index];

            if (obj.flag){
                record.count++;
            } else {
                record.count--;
            }
            obj.flag = !obj.flag;
            // todayData.data = this.records;
            writeDate('today', todayData);
        },
        openOverlay(recordIndex, confirmIndex){
            this.records[recordIndex].complation = String(confirmIndex);
        },
        confirmAndClose(recordIndex, confirmIndex){
            this.openOverlay(recordIndex, confirmIndex);
            let record = recordData.data.find(i => i.title === this.records[recordIndex].title);
            const index = recordData.data.indexOf(record);

            record.preTime = record.nextTime;
            // 计算NEXTTIME和LEVEL
            if (confirmIndex === 0){
                record.level++;
                record.nextTime = getTimeByDate(this.nextNumber[record.level], record.nextTime);
            } else if (confirmIndex === 1){
                record.nextTime = getTimeByDate(1, record.nextTime);
            } else if (confirmIndex === 2){
                if (record.level !== 0){
                    record.level--;
                }
                record.nextTime = getTimeByDate(1, record.nextTime);
            }
            // 全局变量赋值 和 文件写入
            recordData.data[index] = record;
            writeDate('record', recordData);
            writeDate('today', todayData);
            historyData.data.push({
                title: record.title,
                time: record.preTime
            });
            writeDate('history', historyData);
        }
    },
    mounted(){
        this.$nextTick(() => {
            this.initSwiper();
        });
    }
};
</script>

<style lang="scss">
@import '../../node_modules/swiper/css/swiper.min.css';

td {
    border-color: white !important;
}
.confirmcard {
    text-align: center;
}
.confirmbtn {
    width: 55px;
    text-align: center;
}
</style>