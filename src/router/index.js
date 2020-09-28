
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

var router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            redirect: "/find"
        },
        {
            path:"/find",
            name: "Find",
            component: ()=>import("../views/find"),
            
        },
        {
            path:"/mine",
            name: "Mine",
            component: ()=>import("../views/mine"),
            
        },
        {
            path:"/search",
            name: "Search",
            component: ()=>import("../views/search"),
            
        },
    ],
    linkActiveClass: "active"
})
export default router;
