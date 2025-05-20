import { defineStore, acceptHMRUpdate } from 'pinia'
import { useCounterStore } from './counter'
export const useXxStore = defineStore('xx', {
  state: () => ({

  }),
  getters: {
    xxGetter (state) {
      const counter = useCounterStore();
    }
  },
  actions: {
    xxAction () {
      const counter = useCounterStore();
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useXxStore, import.meta.hot))
}
