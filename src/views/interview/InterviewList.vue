<template>
    <v-container>
        <v-data-table :single-expand="true" sort-by="time" :loading="loading" loading-text="数据加载中..." :search="search"
            :custom-filter="filterItem" class="elevation-4" :headers="headers" :items="items" item-key="id" show-expand
            :expanded.sync="remake" hide-default-footer :items-per-page="5" :page.sync="page"
            @page-count="pageCount = $event">
            <!-- SLOT:TOP BAR -->
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-text-field append-icon="mdi-magnify" v-model="search" placeholder="Search"
                        class="font-weight-medium">
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn dark class="ma-2" @click="favorite = !favorite">
                        <v-icon v-if="favorite" left>visibility</v-icon>
                        <v-icon v-else left>visibility_off</v-icon>
                        FAVORITE
                    </v-btn>
                    <v-btn dark class="ma-2" @click.stop="editDialog=true,isInsert=true">INSERT</v-btn>
                </v-toolbar>
            </template>
            <!-- SLOT:ITEM.LITERAL_TIME -->
            <template v-slot:item.literalTime="{item}">
                <span>{{`${item.date} ${item.dateTime}`}}</span>
            </template>

            <!-- SLOT:ITEM.ACTION -->
            <template v-slot:item.action="{item}">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon :color="item.favorite?'red':'grey'" @click="markFavorite(item)" v-on="on" small
                            class="mr-2">
                            favorite
                        </v-icon>
                    </template>
                    <span>喜爱</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on" small class="mr-2 copy-content" @click="copyContent()"
                            :data-clipboard-text="`${item.time}\r\n${item.addr}\r\n${item.company}`">
                            copyright
                        </v-icon>
                    </template>
                    <span>复制</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on" small class="mr-2" @click="isInsert=false,editDialog=true,editItem=item">
                            create
                        </v-icon>
                    </template>
                    <span>修改</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on" small class="mr-2" @click="openNote(item.note)">
                            attachment
                        </v-icon>
                    </template>
                    <span>查看笔记</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on" small class="mr-2" @click="openMap(item.addr)">
                            directions_run
                        </v-icon>
                    </template>
                    <span>高德地图</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on" small class="mr-2" @click="openOutSideWeb(item.company)">
                            visibility
                        </v-icon>
                    </template>
                    <span>看准网</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on" small class="mr-2" @click="deleteItem(item)">
                            close
                        </v-icon>
                    </template>
                    <span>删除</span>
                </v-tooltip>
            </template>
            <!-- SLOT:EXPAND REMAKE -->
            <template v-slot:expanded-item="{ item,headers }">
                <td :colspan="headers.length">{{item.remake}}</td>
            </template>
        </v-data-table>
        <!-- PAGINATION -->
        <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>

        <!-- DIALOG INSERT -->
        <v-dialog v-model="editDialog" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">面试信息</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editItem.company" label="公司" autofocus></v-text-field>
                            </v-col>
                            <v-col cols="8" sm="4" md="3">
                                <v-select :items="types" v-model="editItem.type" label="类型"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="5">
                                <v-text-field v-model="editItem.addr" label="地点"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="8" sm="3" md="3">
                                <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="100"
                                    :nudge-top="300" transition="scale-transition" offset-y min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="editItem.date" label="日期" readonly v-on="on">
                                        </v-text-field>
                                    </template>
                                    <v-date-picker v-model="editItem.date" @input="menu = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="6" sm="3" md="2">
                                <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :nudge-right="60"
                                    :nudge-top="300" :return-value.sync="editItem.dateTime"
                                    transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="editItem.dateTime" label="时间" readonly v-on="on">
                                        </v-text-field>
                                    </template>
                                    <v-time-picker v-if="menu2" v-model="editItem.dateTime" full-width
                                        @click:minute="$refs.menu2.save(editItem.dateTime)"></v-time-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" sm="5" md="4">
                                <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="100"
                                    transition="scale-transition" offset-y min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="editItem.deadline" label="面试结果通知期限" readonly v-on="on">
                                        </v-text-field>
                                    </template>
                                    <v-date-picker v-model="editItem.deadline" @input="menu3 = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="6" sm="4" md="3">
                                <v-select :items="resuls" v-model="editItem.result" label="结果"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12" class="pt-0">
                                <v-text-field v-model="editItem.note" label="笔记地址"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12" class="py-0">
                                <v-textarea outlined label="备注" v-model="editItem.remake" rows="1">
                                </v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>

                    <!-- BTN GROUP -->
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="editDialog=false,editItem={}">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="saveItem">Save</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- ALERT -->
        <v-alert class="s-alert" :type="alertType" v-model='alert' transition="scroll-x-reverse-transition">
            {{alertMessage}}
        </v-alert>
    </v-container>
</template>

<script>
import {TableData, DISABLE_SORTED} from '@/assets/util';
import Clipboard from 'clipboard';
/* global interviewData writeDate*/

export default {
    data: () => ({
        items: interviewData.data,
        headers: TableData.getObjectFromArray([
            ['公司', 'company', 'left'], ['结果', 'result'], ['地点', 'addr'],
            ['类型', 'type'], ['时间', 'literalTime', 'center'],
            ['操作', 'action', 'center'], ['备注', 'data-table-expand', 'left', DISABLE_SORTED]
        ]),
        resuls: ['未面', '已面', '通过', '未通过'],
        types: ['电面', '面试', '笔试', '视频'],
        page: 1,
        pageCount: 0,
        alertType: 'success',
        alertMessage: '',
        search: '',
        editItem: {},
        remake: [],
        alert: false,
        menu: false,
        menu2: false,
        menu3: false,
        isInsert: true,
        loading: true,
        editDialog: false,
        favorite: false
    }),
    watch: {
        favorite(val){
            if (val){
                this.search = 'isFavorite';
            } else if (this.search === 'isFavorite'){
                this.search = '';
            }
        }
    },
    methods: {
        deleteItem(item){
            const index = this.items.indexOf(item);

            this.items.splice(index, 1);
            writeDate('interview', interviewData);
            this.openAlert('删除成功');
        },
        saveItem(){
            if (this.editItem.date && this.editItem.dateTime) {
                this.editItem.time = new Date(this.editItem.date.concat(` ${this.editItem.dateTime}`)).getTime();
            }
            if (this.isInsert){
                this.items.push(this.editItem);
            } else {
                let searchItem = this.items.find(e => e.id === this.editItem.id);
                let index = this.items.indexOf(searchItem);

                this.items.splice(index, 1, this.editItem);
            }
            this.editDialog = false;
            this.editItem = false;

            writeDate('interview', interviewData);
            this.openAlert('保存成功');
        },
        filterItem(val, search, item){
            if (search === 'isFavorite'){
                return item.favorite;
            }
            return val !== null && search !== null && typeof val === 'string' && val.toString().indexOf(search) !== -1;
        },
        copyContent(){
            let clipboard = new Clipboard('.copy-content');

            clipboard.on('success', () => {
                clipboard.destroy();
                this.openAlert('复制成功');
            });
            clipboard.on('error', () => {
                clipboard.destroy();
            });
        },
        markFavorite(item){
            item.favorite = !item.favorite;
            writeDate('interview', interviewData);
        },
        openAlert(message){
            this.alertMessage = message;
            this.alert = true;
            setTimeout(() => {
                this.alert = false;
            }, 2000);
        },
        openMap(addr){
            window.open(`https://www.amap.com/search?query=${addr}`);
        },
        openNote(noteUrl){
            window.open(noteUrl);
        },
        openOutSideWeb(companyName){
            window.open(`https://www.kanzhun.com/search/?city=0&cityName=全国&industry=0&pageCurrent=1&q=${companyName}&type=company`);
        }
    },
    mounted(){
        this.loading = false;
    }
};
</script>

<style>
.s-alert {
    position: fixed !important;
    right: 0;
    top: 20px;
    z-index: 999;
}
</style>