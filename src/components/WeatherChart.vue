<template>
  <div class="chart-container">
    <div class="chart-header">
      <div v-for="cast in casts" :key="cast.date" class="header-item">
        <p>{{ cast.week }}</p>
        <p>{{ cast.date }}</p>
        <SvgIcon :name="cast.icon" size="24px" />
        <p>{{ cast.weather }}</p>
      </div>
    </div>
    <div ref="chartRef" class="chart-body"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch, onMounted } from 'vue';
  import * as echarts from 'echarts';
  import SvgIcon from '@/components/SvgIcon.vue';
  import type { WeatherChartDataType } from '@/types/gmap';

  const props = defineProps<{
    casts: WeatherChartDataType[];
  }>();

  const chartRef = ref<HTMLElement>();
  let chartInstance: echarts.ECharts;

  const initChart = () => {
    if (chartRef.value) {
      chartInstance = echarts.init(chartRef.value);
      renderChart();
    }
  };

  const renderChart = () => {
    if (!chartInstance || !props.casts || props.casts.length === 0) return;

    const option = {
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        show: false,
        type: 'category',
        boundaryGap: false,
        data: props.casts.map((c) => c.date),
      },
      yAxis: {
        show: false,
        type: 'value',
      },
      series: [
        {
          name: '最高温',
          type: 'line',
          data: props.casts.map((c) => c.maxTemp),
          smooth: true,
          itemStyle: {
            color: '#FF5733',
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}°C',
          },
        },
        {
          name: '最低温',
          type: 'line',
          data: props.casts.map((c) => c.minTemp),
          smooth: true,
          itemStyle: {
            color: '#33AFFF',
          },
          label: {
            show: true,
            position: 'bottom',
            formatter: '{c}°C',
          },
        },
      ],
      tooltip: {
        show: false,
      },
    };
    chartInstance.setOption(option);
  };

  onMounted(() => {
    initChart();
  });

  watch(
    () => props.casts,
    () => {
      renderChart();
    },
    { deep: true }
  );
</script>

<style lang="scss" scoped>
  .chart-container {
    width: 100%;
    height: 400px;
    padding: 10px;
    background-color: var(--secondary-color);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }

  .chart-header {
    display: flex;
    justify-content: space-around;
    text-align: center;
    padding-bottom: 10px;
  }

  .header-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin: 2px 0;
    }
  }

  .chart-body {
    flex: 1;
    width: 100%;
    height: 100%;
  }
</style>