import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';

Vue.use(VueRouter);

// 创建路由实例
const router = new VueRouter({
  mode: 'hash',
  routes: routes,
});

export default router;
