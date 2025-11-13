<template>
  <div class="app-container">
    <header>
      <Header />
    </header>
    <section class="router-container">
      <router-view />
    </section>
  </div>
</template>
<script setup lang="ts">
  import { onMounted } from 'vue';
  import Header from './components/Header.vue';
  import { useIPStore } from '@/store/IP';
  const IPStore = useIPStore();

  onMounted(async () => {
    await IPStore.initLocation();
    await IPStore.initGeocode();
  });
</script>
<style lang="scss" scoped>
  .app-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: var(--primary-color);
  }
  header {
    width: 100%;
    height: 80px;
    flex-shrink: 0;
  }
  .router-container {
    width: 100%;
    flex: 1;
    padding: 0 min(15vw, 200px);
  }
</style>
