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
                showFooter: false
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
    ],
    linkActiveClass: "active"
})
export default router;