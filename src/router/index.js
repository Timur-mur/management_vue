import { createRouter, createWebHistory } from 'vue-router'
import Company from "@/views/Company.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Registration from "@/views/Registration.vue";
import EmailVerifPage from "@/views/EmailVerifPage.vue";
import Activate from "@/views/Activate.vue";
import LogInPage from "@/views/LogInPage.vue";
import FillUserInfo from "@/views/FillUserInfo.vue";
import AllTasks from "@/views/AllTasks.vue";
import ExecutorTasks from "@/views/ExecutorTasks.vue";
import AdminPage from "@/views/AdminPage.vue";
import Chat from "@/views/Chat.vue";
import TasksComponent from "@/views/TasksComponent.vue";
const routes = [
  {path: '/', name: 'home', component: Company},
  {path: '/:pathMatch(.*)*', name: 'Error', component: PageNotFound},
  {path: '/registration', name: 'registration', component: Registration},
  {path: '/activate/:uid/:token', name: 'activate', component: Activate},
  {path: '/email_send', name: 'email_send', component: EmailVerifPage},
  {path: '/log_in', name: 'LogInPage', component: LogInPage},
  {path: '/fill_user_info', name: 'FillUserInfo', component: FillUserInfo},
  {path: '/all_tasks', name: 'AllTasks', component: TasksComponent},
  {path: '/executor_tasks', name: 'executor_Tasks', component: ExecutorTasks},
  {path: '/admin_page', name: 'Admin_page', component: AdminPage},
  {path: '/chat', name: 'Chat', component: Chat}
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
