import Vue from "vue";
import VueRouter from "vue-router";
import Disk from "../views/Disk.vue";
import Login from "../views/Login.vue";
import Home from "@/views/Home.vue";
import { TokenService } from "../services/storage.service";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/disk",
    name: "disk",
    component: Disk,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      public: true, // Allow access to even if not logged in
      onlyWhenLoggedOut: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
    (record) => record.meta.onlyWhenLoggedOut
  );
  const loggedIn = !!TokenService.getToken();
  if (!isPublic && !loggedIn) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath }, // Store the full path to redirect the user to after login
    });
  }
  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next("/");
  }
  next();
});
export default router;
