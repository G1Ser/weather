import Home from '@/views/Home.vue';
// 定义路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/city/:adcode',
    name: 'City',
    component: () => import('@/views/City.vue'),
  },
];

export default routes;
