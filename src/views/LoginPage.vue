<template>
    <ion-page>
        <ion-content :fullscreen="true">


            <ion-item>
                <ion-label position="stacked">Nama</ion-label>
                <ion-input id="nama" v-model="nama"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Kata Laluan</ion-label>
                <ion-input v-model="katalaluan" placeholder="Enter text"></ion-input>
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
            nama: 'nama',
            katalaluan: 'kata'
        };
    },
    setup() {
        const ionRouter = useIonRouter();
        const store = useUserStore();
        return { store, ionRouter }
    },
    methods: {
        login() {
            this.store.login(this.nama, this.katalaluan).then(()=> {
                console.log('OK');
            })
        }
    }
});
</script>
