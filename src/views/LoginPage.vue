<template>
    <ion-page>
        <ion-content :fullscreen="true">

            <h1 class="py-5">FGV PMPS</h1>
            <ion-item class="py-5">
                <ion-label position="stacked">Nama</ion-label>
                <ion-input id="nama" v-model="nama" placeholder="Letak nama login"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Kata Laluan</ion-label>
                <ion-input v-model="katalaluan" placeholder="Enter kata laluan"></ion-input>
            </ion-item>
            <ion-button @click="login()" fill="outline">Login</ion-button>



        </ion-content>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonItem, IonButton, IonInput, IonLabel } from '@ionic/vue';
import { useUserStore } from "@/stores/users";
import { useIonRouter } from '@ionic/vue';

export default defineComponent({
    name: 'LoginPage',
    components: { IonContent, IonPage, IonItem, IonButton, IonInput, IonLabel },
    data() {
        return {
            nama: '',
            katalaluan: ''
        };
    },
    setup() {
        const ionRouter = useIonRouter();
        const store = useUserStore();
        return { store, ionRouter }
    },
    methods: {
        login() {
            this.store.login(this.nama, this.katalaluan).then(() => {
                this.store.getProfile();
                this.ionRouter.navigate('/tabs/home',);
            })
        }
    }
});
</script>

<style scoped>
  ion-grid {
    --ion-grid-padding: 20px;

    --ion-grid-padding-xs: 20px;
    --ion-grid-padding-sm: 20px;
    --ion-grid-padding-md: 20px;
    --ion-grid-padding-lg: 20px;
    --ion-grid-padding-xl: 20px;

    --ion-grid-column-padding: 30px;

    --ion-grid-column-padding-xs: 30px;
    --ion-grid-column-padding-sm: 30px;
    --ion-grid-column-padding-md: 30px;
    --ion-grid-column-padding-lg: 30px;
    --ion-grid-column-padding-xl: 30px;
  }
</style>
