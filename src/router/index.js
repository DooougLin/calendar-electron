import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import TodayReview from '../views/TodayReview.vue';
import ReviewCalendar from '../views/ReviewCalendar.vue';
import RecordDetail from '../views/RecordDetail.vue';

Vue.use(VueRouter);

const routes = [
    // {
    //     path: '/22',
    //     name: 'Home',
    //     component: Home
    // },
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
