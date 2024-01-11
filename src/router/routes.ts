import { RouteRecordRaw } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/questions",
    name: "浏览题目",
    component: () => import("@/views/question/QuestionView.vue"),
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: import("@/views/question/ViewQuestionView.vue"),
    props: true,
    // meta: {
    //   access: ACCESS_ENUM.USER,
    //   hideInMenu: true,
    // },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: import("@/views/question/AddQuestionView.vue"),
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  // {
  //   path: "/update/question",
  //   name: "更新题目",
  //   component: import("@/views/question/UpdateQuestionView.vue"),
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  {
    path: "/manage/question",
    name: "管理题目",
    component: import("@/views/question/ManageQuestionView.vue"),
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/",
    name: "主页",
    component: () => import("@/views/question/QuestionView.vue"),
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  // {
  //   path: "/about",
  //   name: "关于我的",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "@/views/AboutView.vue"),
  // },
];
