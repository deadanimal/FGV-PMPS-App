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
      console.log('Component has been created!');
      try {
        const data = await axios.get('https://giga.prototype.com.my/api/fgv-pmps/profil')
        this.userName = data.data;
        console.log(data.data)
        //this.users = data.data
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

    getTasks() {

    },

    sendTasks() {

    },

    submitTask() {

    },

    verifyTask() {

    },


  }
})