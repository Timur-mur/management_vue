import { createRouter, createWebHistory } from 'vue-router'
import Company from "@/views/Company.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Registration from "@/views/Registration.vue";
import EmailVerifPage from "@/views/EmailVerifPage.vue";
import Activate from "@/views/Activate.vue";
import LogInPage from "@/views/LogInPage.vue";
const routes = [
  {
    path: '/',
    name: 'home',
    component: Company
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: PageNotFound
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/activate/:uid/:token',
    name: 'activate',
    component: Activate
  },
  {
    path: '/email_send',
    name: 'email_send',
    component: EmailVerifPage
  },
  {
    path: '/log_in',
    name: 'LogInPage',
    component: LogInPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("JWT")) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});
export default router
