import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router';

//if manual auth
import { getToken, removeCredential } from '@/utils/mixins/auth';
//if using pinia 
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from 'pinia';



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
    component:() => import ('@/layout/index.vue'),
    meta: {
          requiresAuth: true
    },
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
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  const token = getToken();
  const { authenticated } = storeToRefs(useAuthStore());


  if ( (to.path === '/login' && token ) )
   {
    return '/dashboard'
   } 

   if (to.meta.requiresAuth){
     if (token){
       return '/dashboard'
     } else {
       return '/login'
     }
   }

   
})

export default router
