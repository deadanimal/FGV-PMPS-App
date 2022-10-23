import { defineStore } from 'pinia'
import axios from "axios"

var baseUrl = process.env.VUE_APP_BASE_URL

export const useUserStore = defineStore({
  id: 'user',

  state: () => ({
    userName: null,
    userNo: null,
    userRole: null,
    userToken: null,

    tasksRetrieved: [],
    tasksStored: [],
    taskSelected: null,
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
        const data = await axios.get(baseUrl + '/api/fgv-pmps/profil', config)
        
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
        const data = await axios.post(baseUrl + '/api/login', {
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
        const data = await axios.get(baseUrl + '/api/fgv-pmps/tugasan', config)
        this.tasksRetrieved = data.data;
        console.log(this.tasksRetrieved);
        return data.data;
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
      //   const data = await axios.post(baseUrl + '/api/fgv-pmps/tugasan', config)
      //   this.tasksRetrieved = data.data;
      //   console.log(this.tasksRetrieved);
      // }
      // catch (error) {
      //   //alert(error)
      //   console.log(error)
      // }
    },

    async ciptaTask(pekerja, pokok, tandan, jenis, tarikh) {
      const config = {
        headers: { Authorization: `Bearer ${this.userToken}` }
      };
      try {
        const data = await axios.post(baseUrl + '/api/fgv-pmps/tugasan', {
          pekerja: pekerja,
          pokok: pokok,
          tandan: tandan,
          jenis: jenis,
          tarikh: tarikh,          
        }, config)
        console.log(data.data);
      }
      catch (error) {
        //alert(error)
        console.log(error)
      }      
    },

    verifyTask() {

    },

    pilihTask(id) {
      this.taskSelected = this.tasksRetrieved.find(x => x.id == id);
    },

    async saveRosak(tandanId, sebab, catatan, image) {
      const form = new FormData();
      form.append("tandan", tandanId);
      form.append("sebab", sebab);
      form.append("catatan", catatan);
      form.append("gambar", image);
      const config = {
        headers: { Authorization: `Bearer ${this.userToken}`, "Content-Type": "multipart/form-data" }
      };
      try {
        const data = await axios.post(baseUrl + '/api/fgv-pmps/rosak', form, config)
        console.log(data.data);
      }
      catch (error) {
        //alert(error)
        console.log(error)
      }        
    },    

    async saveTaskBalut(id, catatan, image) {
      this.tasksRetrieved = this.tasksRetrieved.filter(x => x.id != id);
      const form = new FormData();
      form.append("catatan_pekerja", catatan);
      form.append("gambar", image);
      const config = {
        headers: { Authorization: `Bearer ${this.userToken}`, "Content-Type": "multipart/form-data" }
      };
      try {
        const data = await axios.post(baseUrl + '/api/fgv-pmps/tugasan/' + id + '/siap-balut', form, config)
        console.log(data.data);
      }
      catch (error) {
        //alert(error)
        console.log(error)
      }        
    },



  }
})