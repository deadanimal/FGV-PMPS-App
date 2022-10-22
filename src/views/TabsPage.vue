<template>
  <ion-page>
    <ion-tabs>
      <ion-header>
      <ion-toolbar>
        <ion-title>FGV PMPS</ion-title>
      </ion-toolbar>
    </ion-header>    

      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/home">
          <ion-icon :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <!-- <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="fileTrayStacked" />
          <ion-label>Kerja</ion-label>
        </ion-tab-button>         -->
          
        <ion-tab-button tab="tab3" href="/tabs/profil">
          <ion-icon :icon="person" />
          <ion-label>Profil</ion-label>
        </ion-tab-button>
        

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonHeader, IonTitle, IonTabBar, IonTabButton, IonTabs, IonPage, IonRouterOutlet, IonLabel, IonToolbar, IonIcon } from '@ionic/vue';
import { home, person, fileTrayStacked } from 'ionicons/icons';
import { useUserStore } from "@/stores/users";
import { useIonRouter } from '@ionic/vue';

export default defineComponent({
  name: 'TabsPage',
  components: { IonHeader, IonTitle,IonTabs, IonTabBar, IonTabButton, IonPage, IonRouterOutlet, IonLabel, IonToolbar, IonIcon },
  setup() {
    const ionRouter = useIonRouter();
    const store = useUserStore();
    return {
      ionRouter,
      store,
      home,
      person,
      fileTrayStacked
    }
  },
  created() {

  }
});
</script>
