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
                            <v-list-group v-if="item.subgroup" :prepend-icon="item.icon" :value="true" color="white">
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
                <v-spacer></v-spacer>
                <v-btn class="ma-1 pl-1" @click="openGitHub">
                    <v-img :src="github" class="mr-1"></v-img>
                    <span class="font-weight-black">{{githubStar}}</span>
                </v-btn>
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
import Github from '@/assets/github.png';
/* global configData writeDate */

const SUB_NAVIGATION = true;

class Navigation{
    // 导航数据构造函数 subgroup为T的是有二级菜单的List
    constructor(title, icon, urlOrSubgroup, subgroup = false){
        this.title = title;
        this.icon = icon;
        if (subgroup){
            this.subgroup = urlOrSubgroup;
        } else {
            this.url = urlOrSubgroup;
        }
    }

}

export default {
    data: () => ({
        items: [
            new Navigation('学习记录', 'description', [
                new Navigation('今日复习', 'watch_later', '/'),
                new Navigation('复习日历', 'date_range', '/reviewCalendar'),
                new Navigation('条目明细', 'insert_drive_file', '/recordDetail')
            ], SUB_NAVIGATION),
            new Navigation('面试记录', 'question_answer', 'interview'),
            new Navigation('配置参数', 'settings', '/settings')
            // { title: '数据文件', icon: 'sd_storage'}
        ],
        item: {},
        color: 'blue',
        githubStar: configData.star,
        navigation: false,
        logourl: LogoURL,
        navigationurl: NavigationURL,
        github: Github
    }),
    methods: {
        openNavigation(){
            this.navigation = !this.navigation;
            this.color = this.color === 'blue' ? '' : 'blue';
        },
        openGitHub(){
            window.open('https://github.com/DooougLin/calendar-electron');
        }
    },
    mounted(){
        // 请求github API
        this.$api.get('https://api.github.com/repos/DooougLin/calendar-electron')
            .then(res => {
                if (this.githubStar !== res.data.stargazers_count) {
                    this.githubStar = res.data.stargazers_count;
                    writeDate('config', configData);
                }
            });
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
