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
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="fileTrayStacked" />
          <ion-label>Kerja</ion-label>
        </ion-tab-button>        
          
        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="person" />
          <ion-label>Profil</ion-label>
        </ion-tab-button>
        

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonHeader, IonTitle, IonTabBar, IonTabButton, IonTabs, IonPage, IonRouterOutlet } from '@ionic/vue';
// import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet } from '@ionic/vue';
import { home, person, fileTrayStacked } from 'ionicons/icons';
import { useUserStore } from "@/stores/users";
import { useIonRouter } from '@ionic/vue';

export default defineComponent({
  name: 'TabsPage',
  components: { IonHeader, IonTitle,IonTabs, IonTabBar, IonTabButton, IonPage, IonRouterOutlet },
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
    if(this.store.userToken == null) {
      console.log('OUT');
      this.ionRouter.navigate('/login');
    }
  }
});
</script>
