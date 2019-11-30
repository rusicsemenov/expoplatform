import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "@/plugins/firebase";

import p404 from "../views/p404.vue";
import Home from "../views/main/Home.vue";
import NoteForm from "../views/main/NoteForm.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      layout: "main",
      title: "Главная",
      requireAuth: true
    },
    component: Home
  },
  {
    path: "/editnote/:id",
    name: "editnote",
    meta: {
      layout: "main",
      title: "Редактирование заметки",
      requireAuth: true
    },
    component: NoteForm
  },
  {
    path: "/addnote",
    name: "addnote",
    meta: {
      layout: "main",
      title: "Добавить заметку",
      requireAuth: true
    },
    component: NoteForm
  },
  {
    path: "/register",
    name: "register",
    meta: {
      layout: "auth",
      title: "Регистрация"
    },
    component: Register
  },
  {
    path: "/login",
    name: "login",
    meta: {
      layout: "auth",
      title: "Вход"
    },
    component: Login
  },
  {
    path: "*",
    name: "p404",
    meta: { title: "404" },
    component: p404
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const reqAuth = to.matched.some(record => record.meta.requireAuth);
  const isAuthenticated = firebase.auth().currentUser;

  document.title = to.meta.title;
  if (reqAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
