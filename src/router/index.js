
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// import SignIn from "@/views/SignIn.vue";


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true } 
  },
  {
    path: '/sendmoney',
    name: 'Send Money',
    component: () => import('@/views/SendMoney.vue'),
    meta: { requiresAuth: true } 
  },
  {
    path: '/transactions',
    name: 'Transaction',
    component: () => import('@/views/Transactions.vue'),
    meta: { requiresAuth: true } 
  }
  

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ path: '/signin' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
