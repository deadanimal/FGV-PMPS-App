<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>

<style>
ion-content {
  --padding-bottom: 10px;
  --padding-end: 10px;
  --padding-start: 20px;
  --padding-top: 20px;
}
</style>