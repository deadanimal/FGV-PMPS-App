<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <ion-button @click="ambilTugasan()" fill="outline">Ambil Tugasan</ion-button>
      <ion-button @click="hantarTugasan()" fill="outline">Hantar Tugasan</ion-button>
      <ion-button @click="ciptaTugasan()" fill="outline">Cipta Tugasan</ion-button>


      <h1>Tugasan Baru</h1>
      <ion-card color="light" v-for="item in store.tasksRetrieved" :key="item.id">
        <ion-card-header>
          <ion-card-title>{{item.id}} Kerja</ion-card-title>
          <ion-card-subtitle>Status</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          Coordinate, Bila dan link
        </ion-card-content>
        <ion-button color="dark" fill="clear" @click="keTugas(item.id, item.jenis)">Lihat</ion-button>
      </ion-card>

      <h1>Tugasan Disimpan</h1>


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
    setInterval(() => {
      this.checkLogin();
    }, 1000);

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

    ciptaTugasan() {
      this.ionRouter.navigate('/tabs/cipta-tugasan');
    },

    keTugas(id, jenis) {
      console.log(id, jenis);
    }

  }
});
</script>
