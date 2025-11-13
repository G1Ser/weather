import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getIpLocation } from '@/api/gmap';
import { getLocationGeocode } from '@/utils/gmap';

export const useIPStore = defineStore('IP', () => {
  const localLocation = ref(import.meta.env.VITE_LOCAL_LOCATION);
  const localGeocode = ref('');
  const initLocation = async () => {
    const res = await getIpLocation();
    if (Array.isArray(res.province) || Array.isArray(res.city)) return;
    localLocation.value = res.province || res.city;
  };
  const initGeocode = async () => {
    localGeocode.value = await getLocationGeocode(localLocation.value);
  };

  return {
    localLocation,
    localGeocode,
    initLocation,
    initGeocode,
  };
});
