import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        delete: false,
        clickDataFromCalendar: []
    },
    mutations: {
        SET_DELETE: (state) => {
            state.delete = true;
        },
        SET_CLICK_DATA: (stata, data) => {
            stata.clickDataFromCalendar = data;
        }
    },
    actions: {},
    modules: {}
});
