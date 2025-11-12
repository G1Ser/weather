import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './main.scss';

// 创建Vue应用实例
const app = createApp(App);
const pinia = createPinia();
app.use(router).use(pinia);

// 挂载应用
app.mount('#app');
