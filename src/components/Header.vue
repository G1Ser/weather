<template>
  <div class="header-container">
    <SvgIcon name="home" size="48px" class="cursor-pointer" @click="$router.push('/')" />
    <template v-if="!isLoading">
      <span>{{ localLocation }}</span>
      <span v-if="lives">{{ lives.temperature }}℃</span>
      <span v-if="lives">{{ lives.weather }}</span>
      <span v-if="lives">{{ lives.winddirection }}风{{ lives.windpower }}级</span>
      <span v-if="lives">{{ lives.humidity }}%</span>
    </template>
    <template v-else>
      <div class="skeleton-header">
        <SkeletonItem style="height: 24px; width: 120px" />
        <SkeletonItem style="height: 24px; width: 80px" />
        <SkeletonItem style="height: 24px; width: 100px" />
        <SkeletonItem style="height: 24px; width: 150px" />
        <SkeletonItem style="height: 24px; width: 80px" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex';
  import SvgIcon from './SvgIcon.vue';
  import SkeletonItem from './SkeletonItem.vue';
  import type { WeatherLivesType } from '@/types/gmap';
  import { getWeather } from '@/api/gmap';

  export default {
    name: 'Header',
    components: {
      SvgIcon,
      SkeletonItem,
    },
    data() {
      return {
        lives: {} as WeatherLivesType,
        isLoading: true,
      };
    },
    computed: {
      ...mapGetters('IP', ['localLocation', 'localGeocode']),
    },
    watch: {
      async localGeocode(newVal) {
        if (!newVal) return;
        this.isLoading = true;
        try {
          const weatherInfo = await getWeather(newVal);
          this.lives = weatherInfo.lives[0];
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .header-container {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 100%;
    padding: 0 min(15vw, 200px);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    font-size: 16px;
    color: var(--text-color);
  }

  .skeleton-header {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
  }
</style>
