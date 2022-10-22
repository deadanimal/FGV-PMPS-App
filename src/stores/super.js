import { defineStore } from 'pinia'

export const useTugasanStore = defineStore({
  id: 'tugasan',
  state: () => ({
    siaps: [],
    barus: [],
    tugasan: null
  }),
  getters: {

  }, 
  actions: {

    async fetchPosts() {
      this.posts = []
      this.loading = true
      try {
        this.posts = await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json()) 
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchPost(id) {
      this.post = null
      this.loading = true
      try {
        this.post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }

  }
})