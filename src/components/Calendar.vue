<template>
    <div>
        <v-sheet height="54" tile class="d-flex">
            <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                <v-icon :color="color">mdi-chevron-left</v-icon>
            </v-btn>
            <div class="ma-2">
                <v-btn :color="color" @click="setDate()">TODAY</v-btn>
            </div>
            <v-select v-model="theme" :items="themes" noDataText="theme" dense outlined hide-details
                class="ma-2" label="theme" :color="color"></v-select>
            <v-select v-model="color" :items="colors" noDataText="color" dense outlined hide-details
                class="ma-2" label="color" :color="color"></v-select>
            <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                <v-icon :color="color">mdi-chevron-right</v-icon>
            </v-btn>
        </v-sheet>
        <v-sheet>
            <v-calendar :dark="dark" :color="color" ref='calendar' v-model="value"
                @click:date="setData">
            </v-calendar>
            <v-alert type="info" icon="date_range" :color="color">
                {{value}}
                <v-icon>mdi-chevron-right</v-icon>
                {{week}}
            </v-alert>
        </v-sheet>
    </div>
</template>

<script>
/* global recordData historyData todayData configData writeDate*/

export default {
    name: 'Calendar',
    data: () => ({
        themes: ['dark', 'light'],
        colors: ['primary', 'blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        week: '',
        color: configData.color,
        theme: configData.theme,
        value: '',
        today: '',
        todayWeek: ''
    }),
    computed: {
        dark() {
            return this.theme === 'dark';
        }
    },
    watch: {
        value(val){
            if (!Number.isNaN(val)){
                this.setWeek(val);
            }
        },
        color(val){
            configData.color = val;
            writeDate('config', configData);
        },
        theme(val){
            configData.theme = val;
            writeDate('config', configData);
        }
    },
    methods: {
        getDate() {
            const date = new Date();

            this.today = this.formatDate();
            this.todayWeek = `周${this.weeks[date.getDay()]}`;
            this.setDate();
            this.setWeek(this.value);
            return date;
        },
        setDate(){
            this.value = this.today;
        },
        setWeek(val){
            if (val === this.today){
                this.week = this.todayWeek;
            } else {
                const t1 = new Date(val).getTime();
                const t2 = new Date(new Date().toLocaleDateString()).getTime();
                const total = Math.round(Math.abs(t2 - t1) / 1000 / (24 * 60 * 60));
                const str = t2 > t1 ? '前' : '后';

                this.week = `${total}天${str}`;
            }
        },
        setData({date}){
            let arr;
            const today = new Date(new Date().toLocaleDateString());
            const selectDate = new Date(new Date(date).toLocaleDateString());

            if (today >  selectDate){
                arr = historyData.data.filter(i => this.formatDate(i.time) === date);
            } else if (today < selectDate){
                arr = recordData.data.filter(i => this.formatDate(i.nextTime) === date);
            } else {
                arr = todayData.data;
            }

            this.$store.commit('SET_CLICK_DATA', arr);
        },
        formatDate(dateStr){
            const date = dateStr ? new Date(dateStr) : new Date();
            let month = String(date.getMonth() + 1) ;
            let day = `${date.getDate()}`;

            if (month.length === 1){
                month = `0${month}`;
            }
            if (day.length === 1){
                day = `0${day}`;
            }
            return `${date.getFullYear()}-${month}-${day}`;
        }
    },
    created(){
        this.getDate();
    }
};
</script>