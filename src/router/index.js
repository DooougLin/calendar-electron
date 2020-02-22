import Vue from 'vue';
import VueRouter from 'vue-router';
import TodayReview from '../views/study/TodayReview.vue';
import ReviewCalendar from '../views/study/ReviewCalendar.vue';
import RecordDetail from '../views/study/RecordDetail.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'TodayReview',
        component: TodayReview
    },
    {
        path: '/reviewCalendar',
        name: 'ReviewCalendar',
        component: ReviewCalendar
    },
    {
        path: '/recordDetail',
        name: '/RecordDetail',
        component: RecordDetail
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
