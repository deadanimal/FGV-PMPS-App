<template>
  <ion-page>   

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Profile</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ExploreContainer name="Tab 2 page" />
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage,  IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'Tab2Page',
  components: { IonContent, IonPage }
});
</script>
