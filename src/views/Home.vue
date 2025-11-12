<template>
  <div class="home-container">
    <main class="weather-info">
      <p>近期天气</p>
      <div class="chart-container">
        <template v-for="cast in casts" :key="cast.date">
          <div class="chart-item">
            <p>{{ cast.week }}</p>
            <p>{{ cast.date }}</p>
            <SvgIcon :name="cast.icon" size="24px" />
            <p>{{ cast.weather }}</p>
            <p>{{ cast.maxTemp }}℃</p>
            <p>{{ cast.minTemp }}℃</p>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import SvgIcon from '@/components/SvgIcon.vue';
  import { useIPStore } from '@/store/IP';
  import { getLocationWeather, formatWeatherCasts } from '@/utils/gmap';
  import type { WeatherChartDataType } from '@/types/gmap';

  const IPStore = useIPStore();
  const { localLocation } = storeToRefs(IPStore);
  const casts = ref<WeatherChartDataType[]>();

  onMounted(async () => {
    await IPStore.initLocation();
    const weatherInfo = await getLocationWeather(localLocation.value, 'all');
    casts.value = formatWeatherCasts(weatherInfo.forecasts[0].casts);
  });
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
