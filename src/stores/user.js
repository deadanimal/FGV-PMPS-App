import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: 0
  }),
  getters: {
    doubleCount: (state) => state.user * 2
  },
  actions: {
    increment() {
      this.user++
    }
  }
})