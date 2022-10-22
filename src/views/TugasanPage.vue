<template>
  <ion-page>
    <ion-content :fullscreen="true">


      <ion-card color="dark">
    <ion-card-header>
      <ion-card-title>{{store.taskSelected.id}}</ion-card-title>
      <ion-card-subtitle>No</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      {{store.taskId}}
    </ion-card-content>
  </ion-card>
  
  
      
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { useUserStore } from "@/stores/users";
import { useIonRouter } from '@ionic/vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'TugasanPage',
  components: { IonContent, IonPage,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle },
  setup() {
    const ionRouter = useIonRouter();
    const store = useUserStore();
    const route = useRoute();

    return { store, ionRouter, route }
  },  
  created() {
    const id = this.route.params.id;
    this.store.pilihTask(id);
  }
});
</script>
