import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
    component:() => import ('@/layout/index.vue'),
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard.vue")
      },
      {
        path: "/dashboard/loan/:id",
        name: "Detail loan",
        component:() => import("@/views/Detail.vue")
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/Pagenotfound.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
