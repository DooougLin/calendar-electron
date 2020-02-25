<template>
    <v-container>
        <v-data-table :single-expand="true" show-expand :expanded.sync="expanded" class="elevation-4" item-key="title"
            sort-by="nextTime" sort-desc :headers="headers" :items="records" :items-per-page="5" :page.sync="page"
            @page-count="pageCount = $event" hide-default-footer>
            <!-- TOP BAR -->
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>条目明细</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn :color="saveColor" dark class="ma-2" @click="save">SAVE</v-btn>
                    <v-dialog v-model="newDialog" max-width="500px">
                        <!-- DIALOG BTN -->
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="ma-2" v-on="on">INSERT</v-btn>
                        </template>
                        <!-- CARD -->
                        <v-card>
                            <v-card-title>
                                <span class="headline">NEW RECORD</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field @keyup.enter="saveItem" v-model="editedItem.title"
                                                label="Name" autofocus>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <!-- BTN GROUP -->
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="newDialog=false">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="saveItem">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <!-- ACTION -->
            <template v-slot:item.action="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on" small class="mr-2" @click="addDetail(item)">
                            add
                        </v-icon>
                    </template>
                    <span>增加明细</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on" small @click="deleteItem(item)">
                            delete
                        </v-icon>
                    </template>
                    <span>删除</span>
                </v-tooltip>
            </template>
            <!-- SLOT:DETAIL -->
            <template v-slot:expanded-item="{ item  }">
                <td>
                    <div class="my-3" v-for="(i,index) in item.items" :key="i.title">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon v-on="on" color="red" @click="clearDetail(item,index)">clear
                                </v-icon>
                            </template>
                            <span>删除</span>
                        </v-tooltip>
                        {{i.title}}
                    </div>
                </td>
            </template>
        </v-data-table>
        <!-- ADD DETAIL DIALOG -->
        <v-dialog v-model="addDetailDialog" max-width="500px">
            <v-card>
                <v-card>
                    <v-card-title>
                        <span class="headline">ADD DETAIL</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-text-field @keyup.enter="saveDetail" v-model="detail.title" label="Name"
                                        autofocus>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <!-- BTN GROUP -->
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="addDetailDialog = false">Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="saveDetail">Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-card>
        </v-dialog>
        <!-- PAGINATION -->
        <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
        <!-- ALERT -->
        <v-alert class="s-alert" type="success" v-model='alert' transition="scroll-x-reverse-transition">
            保存成功
        </v-alert>
    </v-container>
</template>

<script>
import { getSimpleTodayTime, getTimeByDate } from '@/assets/date';
import {TableData, DISABLE_SORTED} from '@/assets/util';
/* global writeDate recordData todayData */

export default {
    data: () => ({
        records: recordData.data,
        headers: TableData.getObjectFromArray([
            ['名称', 'title'], ['级别', 'level'], ['创建时间', 'startTime', 'center'],
            ['下次复习', 'nextTime', 'center'], ['上次复习', 'preTime', 'center'],
            ['操作', 'action', 'center', DISABLE_SORTED], ['明细', 'data-table-expand', 'left', DISABLE_SORTED]
        ]),
        page: 1,
        pageCount: 0,
        editedItem: {},
        detail: {},
        item: {},
        expanded: [],
        newDialog: false,
        addDetailDialog: false,
        alert: false
    }),
    computed: {
        saveColor: {
            get(){
                return this.$store.state.saveColor;
            },
            set(val){
                this.$store.commit('SET_SAVE_COLOR', val);
            }
        }
    },
    watch: {
        records: function(){
            this.saveColor = 'red';
        }
    },
    methods: {
        save(){
            let deleteRecords = this.$store.state.deleteRecords;

            if (deleteRecords !== 0){
                todayData.data = todayData.data.filter(i => deleteRecords.some(t => t !== i.title));
                writeDate('today', todayData);
                this.$store.commit('SET_DELETE');
                deleteRecords.length = 0;
            }
            this.saveColor = 'primary';
            writeDate('record', recordData);
            this.alert = true;
            setTimeout(() => {
                this.alert = false;
            }, 2000);
        },
        saveItem(){
            const obj = {
                title: this.editedItem.title,
                level: 0,
                startTime: getSimpleTodayTime(),
                preTime: '',
                nextTime: getTimeByDate(1),
                items: []
            };

            this.records.push(obj);
            this.newDialog = false;
        },
        saveDetail(){
            const index = this.records.indexOf(this.item);

            this.records[index].items.push({title: this.detail.title});
            this.addDetailDialog = false;
            this.saveColor = 'red';
        },
        addDetail(item){
            this.item = item;
            this.addDetailDialog = true;
        },
        deleteItem(item){
            const index = this.records.indexOf(item);
            let deleteRecords = this.$store.state.deleteRecords;

            deleteRecords.push(this.records.splice(index, 1)[0].title);
        },
        clearDetail(item, detailIndex){
            const index = this.records.indexOf(item);

            this.records[index].items.splice(detailIndex, 1);
        }
    }
};
</script>

<style>
.s-alert {
    position: fixed;
    right: 0;
    top: 20px;
    z-index: 999;
}
</style>