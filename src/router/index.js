import { createRouter, createWebHistory } from 'vue-router'
import Company from "@/views/Company.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Registration from "@/views/Registration.vue";
import EmailVerifPage from "@/views/EmailVerifPage.vue";
import Activate from "@/views/Activate.vue";
import LogInPage from "@/views/LogInPage.vue";
import FillUserInfo from "@/views/FillUserInfo.vue";
import ExecutorTasks from "@/views/ExecutorTasks.vue";
import AdminPage from "@/views/AdminPage.vue";
import Chat from "@/views/Chat.vue";
import TasksComponent from "@/views/TasksComponent.vue";
const routes = [
  {path: '/', name: 'Werth', component: Company},
  {path: '/:pathMatch(.*)*', name: 'Страница не найдена', component: PageNotFound},
  {path: '/registration', name: 'Регистрация', component: Registration},
  {path: '/activate/:uid/:token', name: 'Активация', component: Activate},
  {path: '/email_send', name: 'Имейл', component: EmailVerifPage},
  {path: '/log_in', name: 'Вход', component: LogInPage},
  {path: '/fill_user_info', name: 'Информация о пользователе', component: FillUserInfo},
  {path: '/all_tasks', name: 'Все задания', component: TasksComponent},
  {path: '/executor_tasks', name: 'Мои задания', component: ExecutorTasks},
  {path: '/admin_page', name: 'Администратор', component: AdminPage},
  {path: '/chat', name: 'Чат со всеми сотрудниками', component: Chat}
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
