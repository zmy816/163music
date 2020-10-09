import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

var router = new VueRouter({
    mode: "history",
    routes: [{
            path: "/",
            redirect: "/find"
        },
        {
            path: "/find",
            name: "Find",
            component: () =>
                import ("../views/find"),
            meta: {
                showHeader: true,
                showFooter: true
            }
        },
        {
            path: "/mine",
            name: "Mine",
            component: () =>
                import ("../views/mine"),
            meta: {
                showHeader: true,
                showFooter: true
            }
        },
        {
            path: "/search",
            name: "Search",
            component: () =>
                import ("../views/search"),
            meta: {
                showHeader: false,
                showFooter: true
            }
        },
        {
            path: "/login",
            name: "Login",
            component: () =>
                import ("../views/login"),
            meta: {
                showHeader: false,
                showFooter: false
            }
        },
        {
            path: "/songList",
            name: "SongList",
            component: () =>
                import ("../views/songList"),
            meta: {
                showHeader: false,
                showFooter: true
            }
        },
        {
            path: "/playlist",
            name: "PlayList",
            redirect: "/playlist/recommend",
            component: ()=>import("../views/playList"),
            meta: {
                showFooter: true
            },
            children:[
                {
                    path: "recommend",
                    name: "Recommend",
                    component: ()=> import("../views/playList/recommend.vue"),
                    meta: {
                        showFooter: true
                    },
                },
                {
                    path: "official",
                    name: "Official",
                    component: ()=> import("../views/playList/official.vue"),
                    meta: {
                        showFooter: true
                    },
                },
                {
                    path: "highquality",
                    name: "Highquality",
                    component: ()=> import("../views/playList/highquality.vue"),
                    meta: {
                        showFooter: true
                    },
                },
                {
                    path: "chinese",
                    name: "Chinese",
                    component: ()=> import("../views/playList/Chinese.vue"),
                    meta: {
                        showFooter: true
                    },
                },
                {
                    path: "popular",
                    name: "Popular",
                    component: ()=> import("../views/playList/popular.vue"),
                    meta: {
                        showFooter: true
                    },
                }
            ]
        }
    ],
    linkActiveClass: "active"
})
export default router;