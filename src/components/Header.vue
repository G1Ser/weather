<template>
  <div class="header-container">
    <SvgIcon name="home" size="48px" class="cursor-pointer" @click="router.push('/')" />
    <span>{{ location }}</span>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import router from '@/router';
  import SvgIcon from './SvgIcon.vue';
  import { getIpLocation, getGeocode, getWeather } from '@/api/gmap';

  const location = ref('');

  onMounted(async () => {
    const res_location = await getIpLocation();
    location.value = res_location.province || res_location.city || '';
    // const res = await getGeocode('shanghai');
    // const adcode = res.geocodes[0].adcode;
    // await getWeather(adcode);
    // await getWeather(adcode, 'all');
  });
</script>

<style lang="scss" scoped>
  @use 'bootstrap/scss/bootstrap.scss';
  .header-container {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 100%;
    padding: 0 300px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    font-size: 16px;
    color: var(--text-color);
  }
</style>
