import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import IP, { type IPState } from './modules/IP';

Vue.use(Vuex);

// 定义根 State 类型
export interface RootState {
  IP: IPState;
}

const storeOptions: StoreOptions<RootState> = {
  modules: {
    IP,
  },
};

export default new Vuex.Store<RootState>(storeOptions);
