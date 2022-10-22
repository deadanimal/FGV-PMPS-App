<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <ion-button @click="ambilTugasan()" fill="outline">Ambil Tugasan</ion-button>
      <ion-button @click="hantarTugasan()" fill="outline">Hantar Tugasan</ion-button>
      <ion-button @click="ciptaTugasan()" fill="outline">Cipta Tugasan</ion-button>


      <ion-card color="dark">
        <ion-card-header>
          <ion-card-title>Kerja</ion-card-title>
          <ion-card-subtitle>Status</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          Coordinate, Bila dan link
        </ion-card-content>
      </ion-card>


      <!-- <ion-card>
  <ion-card-header>
    <ion-card-title>Scan</ion-card-title>
    <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
  </ion-card-header>

  <ion-card-content>@click="scan()"
    Here's a small text description for the card content. Nothing more, nothing less.
  </ion-card-content>
</ion-card> -->


    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
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
    IonCardTitle
  },

  setup() {
    const ionRouter = useIonRouter();
    const store = useUserStore();
    return { store, ionRouter }
  },

  created() {
    setInterval(()=> {
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

    async scan() {
      //await BarcodeScanner.checkPermission({ force: true });

      // make background of WebView transparent
      // note: if you are using ionic this might not be enough, check below
      BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      console.log(result);

      // if the result has content
      if (result.hasContent) {
        document.querySelector('body').classList.remove('scanner-active');
        console.log(result.content); // log the raw scanned content
      }

    },

    ciptaTugasan() {
      this.ionRouter.navigate('/tabs/cipta-tugasan');
    }

  }
});
</script>
