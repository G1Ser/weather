import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getIpLocation } from '@/api/gmap';

export const useIPStore = defineStore('IP', () => {
  const localLocation = ref(import.meta.env.VITE_LOCAL_LOCATION);

  const initLocation = async () => {
    const res = await getIpLocation();
    if (Array.isArray(res.province) || Array.isArray(res.city)) return;
    localLocation.value = res.province || res.city;
  };

  return {
    localLocation,
    initLocation,
  };
});
