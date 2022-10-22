<template>
  <ion-page>
    <ion-content :fullscreen="true">


      <ion-card color="dark">
    <ion-card-header>
      <ion-card-title>Peranan</ion-card-title>
      <ion-card-subtitle>No</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      Nama & IC
    </ion-card-content>
  </ion-card>
  
  
      
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'Tugasan',
  components: { IonContent, IonPage }
});
</script>
