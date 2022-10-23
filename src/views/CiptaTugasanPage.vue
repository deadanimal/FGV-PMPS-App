<template>
    <ion-page>
        <ion-content :fullscreen="true" padding>

            <ion-item>
                <ion-label position="stacked">Pekerja</ion-label>
                <ion-input id="pekerja" name="pekerja" v-model="pekerja"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Jenis</ion-label>
                <ion-select id="jenis" name="jenis" v-model="jenis" placeholder="Pilih kerja">
                    <ion-select-option value="balut">Balut Tandan</ion-select-option>
                    <ion-select-option value="debung">Pedebungaan</ion-select-option>
                    <ion-select-option value="kawalan">Kawalan Kualiti</ion-select-option>
                    <ion-select-option value="tuai">Tuai</ion-select-option>
                </ion-select>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Pokok</ion-label>
                <ion-input id="pokok" name="pokok" v-model="pokok"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Tandan</ion-label>
                <ion-input id="tandan" name="tandan" v-model="tandan"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Tarikh</ion-label>
                <ion-input id="tarikh" name="tarikh" v-model="tarikh"></ion-input>
            </ion-item>
            <ion-button @click="cipta()" fill="outline">Cipta Tugasan</ion-button>
            <ion-button @click="scan('pokok')" fill="outline">Scan Pokok</ion-button>
            <ion-button @click="scan('tandan')" fill="outline">Scan Tandan</ion-button>



        </ion-content>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonLabel, IonButton, IonInput, IonSelect, IonSelectOption, IonItem } from '@ionic/vue';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { useUserStore } from "@/stores/users";
import { useIonRouter } from '@ionic/vue';

export default defineComponent({
    name: 'CiptaTugasanPage',
    components: {
        IonContent,
        IonPage, IonLabel, IonButton, IonInput, IonSelect, IonSelectOption, IonItem     
    },
    data() {
        return {
            pekerja: null,
            pokok: null,
            tandan: null,
            jenis: '',
            tarikh: '',
        };
    },

    setup() {
        const ionRouter = useIonRouter();
        const store = useUserStore();
        return { store, ionRouter }
    },


    methods: {

        async scan(jenisScan) {
            await BarcodeScanner.checkPermission({ force: true });

            // make background of WebView transparent
            // note: if you are using ionic this might not be enough, check below
            BarcodeScanner.hideBackground();
            document.querySelector('body').classList.add('scanner-active');
            const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
            console.log(result);

            // if the result has content
            if (result.hasContent) {
                document.querySelector('body').classList.remove('scanner-active');
                if (jenisScan == 'pokok') {
                    this.pokok = result.content;
                } else {
                    this.tandan = result.content;
                }
                console.log(result.content); // log the raw scanned content
            }

        },

        cipta() {
            this.store.ciptaTask(this.pekerja, this.pokok, this.tandan, this.jenis, this.tarikh)
        }

    }
});
</script>

<style>
</style>
