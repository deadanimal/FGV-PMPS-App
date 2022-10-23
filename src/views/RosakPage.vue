<template>
    <ion-page>
        <ion-content :fullscreen="true">

            <ion-item>
                <ion-label position="stacked">Tandan</ion-label>
                <ion-input id="tandan" name="tandan" v-model="tandan"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Sebab</ion-label>
                <ion-select id="sebab" name="sebab" v-model="sebab" placeholder="Pilih sebab rosak">
                    <ion-select-option value="balut">Balut Tandan</ion-select-option>
                    <ion-select-option value="debung">Pedebungaan</ion-select-option>
                    <ion-select-option value="kawalan">Kawalan Kualiti</ion-select-option>
                    <ion-select-option value="tuai">Tuai</ion-select-option>
                </ion-select>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Catatan</ion-label>
                <ion-textarea id="catatan" name="catatan" v-model="catatan"></ion-textarea>
            </ion-item>
            <ion-img :src="photoWebviewPath" id="gambar" v-if="photoWebviewPath"></ion-img>
            <ion-button @click="tangkapGambar()">Camera</ion-button>
            <ion-button @click="scan()">Scan Tandan</ion-button>
            <ion-button @click="simpan()">Lapor</ion-button>



        </ion-content>
    </ion-page>
</template>

<script>

const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n) {
        u8arr[n - 1] = bstr.charCodeAt(n - 1)
        n -= 1 // to make eslint happy
    }
    return new File([u8arr], filename, { type: mime })
}



import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import {
    IonButton, IonTextarea, IonItem, IonLabel, IonImg,
    IonSelect, IonSelectOption, IonInput,
    alertController
} from '@ionic/vue';
import { useUserStore } from "@/stores/users";
import { useIonRouter } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export default defineComponent({
    name: 'RosakPage',
    components: {
        IonContent, IonPage,
        IonSelect, IonSelectOption,
        IonButton, IonTextarea, IonItem, IonLabel, IonImg, IonInput
    },
    data() {
        return {
            tandan: null,
            sebab: null,
            catatan: null,
            photoWebviewPath: null
        };
    },
    setup() {
        const ionRouter = useIonRouter();
        const store = useUserStore();
        const route = useRoute();

        return { store, ionRouter, route }
    },
    methods: {
        async scan() {
            await BarcodeScanner.checkPermission({ force: true });
            BarcodeScanner.hideBackground();
            document.querySelector('body').classList.add('scanner-active');
            const result = await BarcodeScanner.startScan();
            if (result.hasContent) {
                document.querySelector('body').classList.remove('scanner-active');
                this.tandan = result.content;
            }

        },

        simpan() {

            const file = dataURLtoFile(this.photoWebviewPath, 'gambar-sawit');
            this.store.saveRosak(this.tandan, this.sebab, this.catatan, file).then(() => {
                this.showAlert();
            })

        },

        async tangkapGambar() {
            const photo = await Camera.getPhoto({
                resultType: CameraResultType.Base64,
                source: CameraSource.Camera,
                quality: 100,
            });
            console.log(photo);
            var base64Image = 'data:image/' + photo.format + ';base64,' + photo.base64String;
            this.photoWebviewPath = base64Image;
        },

        async showAlert() {
            const alert = await alertController.create({
                header: 'Simpan',
                subHeader: 'Tugasan',
                message: 'Tugasan telah siap hantar ke server',
                buttons: ['OK'],
            });

            await alert.present();
        }

    }    
});
</script>
