import { createRouter, createWebHashHistory } from 'vue-router';
import TodoList from '../views/TodoList.vue';
import EditView from '../views/EditView.vue';

const routes = [
  { path: '/', component: TodoList, name: 'home' },
  {
    path: '/edit-todo/:id/edit',
    component: EditView,
    name: 'edit-todo',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
