<template>
    <div id="app">
        <v-app>
            <!-- NAVIGATION -->
            <v-navigation-drawer dark permanent app :mini-variant="navigation" width='210'>
                <!-- BACKGROUND -->
                <template v-slot:img>
                    <v-img height="100%" gradient="rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)" :src="navigationurl">
                    </v-img>
                </template>
                <!-- START -->
                <v-list dense nav dark>
                    <!-- TITLE -->
                    <v-list-item class="pa-0">
                        <v-list-item-avatar>
                            <v-img :src="logourl"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title class="title pb-2">
                                LetCoding
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                DougLin
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mb-1"></v-divider>
                    <!-- DETAIL -->
                    <v-list-item-group v-model="item">
                        <section v-for="item in items" :key="item.title">
                            <!-- SUBGROUP -->
                            <v-list-group v-if="item.subgroup" :prepend-icon="item.icon" value="true" color="white">
                                <template v-slot:activator>
                                    <v-list-item-title>{{item.title}}</v-list-item-title>
                                </template>

                                <v-list-item v-for="sub in item.subgroup" :key="sub.title" :to="sub.url">
                                    <v-list-item-action>
                                        <v-icon color="#F5DA55">{{sub.icon}}</v-icon>
                                    </v-list-item-action>

                                    <v-list-item-content>
                                        <v-list-item-title>{{sub.title}}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-group>
                            <!-- COMMON -->
                            <v-list-item v-else link :to="item.url">
                                <v-list-item-icon>
                                    <v-icon :color="item.color">{{ item.icon }}</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </section>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
            <!-- TOPBAR -->
            <v-app-bar app flat color="grey lighten-3">
                <v-btn icon @click="openNavigation()">
                    <v-icon :color="color" dark>pets</v-icon>
                </v-btn>
                <span class="pl-1 font-weight-black">Dashboard</span>
            </v-app-bar>
            <!-- CONTENT -->
            <v-content>
                <v-sheet color="grey lighten-3" height="100%" width="100%" class="pt-3">
                    <router-view />
                </v-sheet>
            </v-content>
        </v-app>
    </div>
</template>

<script>
import LogoURL from '@/assets/logo.png';
import NavigationURL from '@/assets/navigation.jpg';

export default {
    data: () => ({
        logourl: LogoURL,
        navigationurl: NavigationURL,
        items: [
            { title: '学习记录', icon: 'description', subgroup: [{title: '今日复习', icon: 'watch_later', url: '/'}, {title: '复习日历', icon: 'date_range', url: '/reviewCalendar'}, {title: '条目明细', icon: 'insert_drive_file', url: '/recordDetail'}]},
            { title: '面试记录', icon: 'question_answer'}
            // { title: '配置参数', icon: 'settings'},
            // { title: '数据文件', icon: 'sd_storage'}
        ],
        item: {},
        navigation: false,
        color: 'blue'
    }),
    methods: {
        openNavigation(){
            this.navigation = !this.navigation;
            this.color = this.color === 'blue' ? '' : 'blue';
        }
    },
    mounted(){
    }
};
</script>

<style>
#ap {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
