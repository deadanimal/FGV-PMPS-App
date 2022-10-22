import { defineStore } from 'pinia'
import axios from "axios"


export const useUserStore = defineStore({
  id: 'user',

  state: () => ({
    userName: null,
    userNo: null,
    userRole: null,
    userToken: null,

    tasksRetrieved: [],
    tasksStored: []
  }),

  actions: {
    increment() {
      this.user++
    },

    async getProfile() {
      const config = {
        headers: { Authorization: `Bearer ${this.userToken}` }
      };
      try {
        const data = await axios.get('https://giga.prototype.com.my/api/fgv-pmps/profil', config)
        
        this.userName = data.data.nama;
        this.userRole = data.data.peranan;
      }
      catch (error) {
        //alert(error)
        console.log(error)
      }
    },

    async login(nama, katalaluan) {
      try {
        const data = await axios.post('https://giga.prototype.com.my/api/login', {
          namalogin: nama,
          katalaluan: katalaluan,
          projek_id: 1
        })
        this.userToken = data.data.token;        
        return this.userToken;
      }
      catch (error) {
        //alert(error)
        console.log(error)
      }
    },

    async getTasks() {
      const config = {
        headers: { Authorization: `Bearer ${this.userToken}` }
      };
      try {
        const data = await axios.get('https://giga.prototype.com.my/api/fgv-pmps/tugasan', config)
        this.tasksRetrieved = data.data;
        console.log(this.tasksRetrieved);
      }
      catch (error) {
        //alert(error)
        console.log(error)
      }
    },

    async sendTasks() {
      // const config = {
      //   headers: { Authorization: `Bearer ${this.userToken}` }
      // };
      // try {
      //   const data = await axios.post('https://giga.prototype.com.my/api/fgv-pmps/tugasan', config)
      //   this.tasksRetrieved = data.data;
      //   console.log(this.tasksRetrieved);
      // }
      // catch (error) {
      //   //alert(error)
      //   console.log(error)
      // }
    },

    submitTask(dataSaved) {
      this.tasksStored.push(dataSaved);
    },

    verifyTask() {

    },


  }
})