<template>
  <div class="home-container">
    <main class="weather-info">
      <p>近期天气</p>
      <WeatherChart v-if="casts" :casts="casts" />
    </main>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import WeatherChart from '@/components/WeatherChart.vue';
  import { useIPStore } from '@/store/IP';
  import { formatWeatherCasts } from '@/utils/gmap';
  import type { WeatherChartDataType } from '@/types/gmap';
  import { getWeather } from '@/api/gmap';

  const IPStore = useIPStore();
  const { localGeocode } = storeToRefs(IPStore);
  const casts = ref<WeatherChartDataType[]>();
  watch(
    () => localGeocode.value,
    async () => {
      if (!localGeocode.value) return;
      const weatherInfo = await getWeather(localGeocode.value, 'all');
      casts.value = formatWeatherCasts(weatherInfo.forecasts[0].casts);
    }
  );
</script>

<style lang="scss" scoped>
  .home-container {
    width: 100%;
    height: 100%;
    color: var(--text-color);
  }
  .chart-container {
    width: 100%;
    height: 400px;
    padding: 10px;
    background-color: var(--secondary-color);
    border-radius: 10px;
  }
</style>
