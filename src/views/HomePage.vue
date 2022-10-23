<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <ion-button @click="ambilTugasan()" fill="outline">Ambil</ion-button>
      <!-- <ion-button @click="hantarTugasan()" fill="outline">Hantar</ion-button> -->
      <ion-button router-link="/tabs/cipta-tugasan" fill="outline">Cipta</ion-button>


      <h1 v-if="store.tasksRetrieved.length > 0">Tugasan Baru</h1>
      <ion-card color="light" v-for="item in store.tasksRetrieved" :key="item.id">
        <ion-card-header>
          <ion-card-title v-if="item.jenis == 'balut'">{{item.jenis}} Pokok {{item.pokok_id}}</ion-card-title>
          <ion-card-title v-else>{{item.jenis}} Tandan {{item.tandan_id}}</ion-card-title>
          <ion-card-subtitle>Status: {{item.status}}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <!-- ID: {{item.id}} -->
        </ion-card-content>
        <router-link :to="`/tabs/tugasan/${item.id}`"><ion-button color="dark" fill="clear">Lihat</ion-button></router-link>
      </ion-card>

      <h1 v-if="store.tasksStored.length > 0">Tugasan Disimpan</h1>
      <ion-card color="light" v-for="item in store.tasksStored" :key="item.id">
        <ion-card-header>
          <ion-card-title v-if="item.jenis == 'balut'">{{item.jenis}} Pokok {{item.pokok_id}}</ion-card-title>
          <ion-card-title v-else>{{item.jenis}} Tandan {{item.tandan_id}}</ion-card-title>
          <ion-card-subtitle>Status: {{item.status}}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <!-- Coordinate, Bila dan link -->
        </ion-card-content>
        <ion-button color="dark" fill="clear" router-link="/tabs/tugasan/' + {{item.id}} +'">Lihat</ion-button>
      </ion-card>      


    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/vue';
import { useUserStore } from "@/stores/users";
import { useIonRouter } from '@ionic/vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle, IonButton
  },

  setup() {
    const ionRouter = useIonRouter();
    const store = useUserStore();
    return { store, ionRouter }
  },

  created() {
    // setInterval(() => {
    //   this.checkLogin();
    // }, 1000);

    this.store.getProfile();
  },

  methods: {

    checkLogin() {
      if (this.store.userToken == null) {
        this.ionRouter.navigate('/login');
      }
    },

    ambilTugasan() {
      this.store.getTasks();
    },

    hantarTugasan() {

    },

  }
});
</script>
