import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        delete: false,
        clickDataFromCalendar: [],
        deleteRecords: [],
        saveColor: 'primary'
    },
    mutations: {
        SET_DELETE: (state) => {
            state.delete = true;
        },
        SET_CLICK_DATA: (state, data) => {
            state.clickDataFromCalendar = data;
        },
        SET_DELETE_RECORD: (state, data) => {
            state.deleteRecords = data;
        },
        SET_SAVE_COLOR: (state, data) => {
            state.saveColor = data;
        }
    },
    actions: {},
    modules: {}
});
