<template>
  <ion-page>
    <ion-content :fullscreen="true">


      <ion-card color="dark">
    <ion-card-header>
      <ion-card-title>{{ store.userRole }}</ion-card-title>
      <ion-card-subtitle>No</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      {{store.userName}}
    </ion-card-content>
  </ion-card>
  
  
      
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, } from '@ionic/vue';
import { useUserStore } from "@/stores/users";
import { useIonRouter } from '@ionic/vue';

export default defineComponent({
  name: 'ProfilPage',
  components: { IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, },
  setup() {
        const ionRouter = useIonRouter();
        const store = useUserStore();
        return { store, ionRouter }
    },  
  
});
</script>
