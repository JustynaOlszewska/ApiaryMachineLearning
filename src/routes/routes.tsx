/* existing imports */
// import Root from "./routes/root";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
const MainLayout = lazy(() => import("../pages/MainLayout"));
const ApiariesList = lazy(() => import("../pages/ApiariesList"));
const LoginForm = lazy(() => import("../pages/LoginForm"));
const RegisterForm = lazy(() => import("../pages/RegisterForm"));

const router = createBrowserRouter([
  {
    path: "/",
    // path: "/:lang",
    // element: <MainLayout />,
    element: (
      <Suspense fallback={<div>Ładowanie...</div>}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        path: "apiaries",
        // name: "apiaries",
        element: (
          <Suspense fallback={<div>Ładowanie...</div>}>
            <ApiariesList />
          </Suspense>
        ),
        // async beforeEnter(to, from, next) {
        //   const apiaryStore = useApiary();
        //   await apiaryStore.getInitApiaryData();
        //   return next();
        // },
      },
      {
        path: "login",
        // name: "apiaries",
        element: (
          <Suspense fallback={<div>Ładowanie...</div>}>
            <LoginForm />
          </Suspense>
        ),
        // async beforeEnter(to, from, next) {
        //   const apiaryStore = useApiary();
        //   await apiaryStore.getInitApiaryData();
        //   return next();
        // },
      },
      {
        path: "register",
        // name: "apiaries",
        element: (
          <Suspense fallback={<div>Ładowanie...</div>}>
            <RegisterForm />
          </Suspense>
        ),
        // async beforeEnter(to, from, next) {
        //   const apiaryStore = useApiary();
        //   await apiaryStore.getInitApiaryData();
        //   return next();
        // },
      },
      //       {
      //         path: "apiaries/create",
      //         name: "create",
      //         component: () => import("../components/pages/childrens/CreateApiary.vue"),
      //       },
      //       {
      //         path: "apiaries/:id/edit",
      //         name: "edit",
      //         component: () => import("../components/pages/childrens/CreateApiary.vue"),
      //         props: (route) => {
      //           const apiaryStore = useApiary();
      //           const apiary = apiaryStore.dataApiary?.filter((apiary: ApiaryData) => apiary._id === route.params.id);
      //           return { id: route.params.id, apiary };
      //         },
      //       },
      //       {
      //         path: "calendar",
      //         name: "calendar",
      //         component: () => import("../components/pages/TasksInApiaries.vue"),
      //         beforeEnter(to, from, next) {
      //           return next();
      //         },
      //       },
      //       {
      //         path: "beehives",
      //         name: "beehives",
      //         component: () => import("../components/pages/BeehivesList.vue"),
      //         beforeEnter(to, from, next) {
      //           return next();
      //         },
      //       },
      //       {
      //         path: "login",
      //         name: "login",
      //         component: () => import("../components/auth/LoginForm.vue"),
      //         beforeEnter(to, from, next) {
      //           return next();
      //         },
      //       },
      //       {
      //         path: "register",
      //         name: "register",
      //         component: () => import("../components/auth/RegisterForm.vue"),
      //         beforeEnter(to, from, next) {
      //           return next();
      //         },
      //       },
    ],
  },
  // {
  //   path: "/about",
  //   element: "<div>cd</div>aboits",
  // },
]);
export default router;

// import { RouteRecordRaw } from "vue-router";
// import { useApiary } from "../stores/apiary-store";
// import { ApiaryData } from "@interfaces/apiary";

// const routes: RouteRecordRaw[] = [
//   {
//     path: "/:lang",
//     component: () => import("../components/layouts/MainLayout.vue"),
//     beforeEnter(to, from, next) {
//       return next();
//     },
//     children: [
//       {
//         path: "apiaries",
//         name: "apiaries",
//         component: () => import("../components/pages/ApiariesList.vue"),
//         async beforeEnter(to, from, next) {
//           const apiaryStore = useApiary();
//           await apiaryStore.getInitApiaryData();
//           return next();
//         },
//       },
//       {
//         path: "apiaries/create",
//         name: "create",
//         component: () => import("../components/pages/childrens/CreateApiary.vue"),
//       },
//       {
//         path: "apiaries/:id/edit",
//         name: "edit",
//         component: () => import("../components/pages/childrens/CreateApiary.vue"),
//         props: (route) => {
//           const apiaryStore = useApiary();
//           const apiary = apiaryStore.dataApiary?.filter((apiary: ApiaryData) => apiary._id === route.params.id);
//           return { id: route.params.id, apiary };
//         },
//       },
//       {
//         path: "calendar",
//         name: "calendar",
//         component: () => import("../components/pages/TasksInApiaries.vue"),
//         beforeEnter(to, from, next) {
//           return next();
//         },
//       },
//       {
//         path: "beehives",
//         name: "beehives",
//         component: () => import("../components/pages/BeehivesList.vue"),
//         beforeEnter(to, from, next) {
//           return next();
//         },
//       },
//       {
//         path: "login",
//         name: "login",
//         component: () => import("../components/auth/LoginForm.vue"),
//         beforeEnter(to, from, next) {
//           return next();
//         },
//       },
//       {
//         path: "register",
//         name: "register",
//         component: () => import("../components/auth/RegisterForm.vue"),
//         beforeEnter(to, from, next) {
//           return next();
//         },
//       },
//     ],
//   },
//   // { path: '', component: () => import('pages/IndexPage.vue') }
//   // Always leave this as last one,
//   // but you can also remove it
//   // {
//   //   path: '/:catchAll(.*)*',
//   //   component: () => import('pages/ErrorNotFound.vue'),
//   // },
// ];

// export default routes;
