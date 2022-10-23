<template>
    <ion-page>
        <ion-content :fullscreen="true">


            <ion-card color="dark">
                <ion-card-header>
                    <ion-card-title>Maklumat Kerja</ion-card-title>
                    <ion-card-subtitle v-if="store.taskSelected.jenis == 'balut'">{{store.taskSelected.jenis}} Pokok
                        {{store.taskSelected.pokok_id}}</ion-card-subtitle>
                    <ion-card-subtitle v-else>{{store.taskSelected.jenis}} Tandan {{store.taskSelected.tandan_id}}
                    </ion-card-subtitle>

                </ion-card-header>

                <ion-card-content>
                    Tarikh: {{store.taskSelected.tarikh}} <br />
                    Pekerja: {{store.taskSelected.pekerja_id}} <br />
                    Supervisor: {{store.taskSelected.supervisor_id}} <br />
                </ion-card-content>
                <ion-button @click="scan('pokok')" color="light" fill="clear">QR Pokok</ion-button>
                <ion-button @click="scan('tandan')" color="light" fill="clear">QR Tandan</ion-button>
                <router-link to="/tabs/rosak">
                    <ion-button color="light" fill="clear">Lapor</ion-button>
                </router-link>
            </ion-card>

            <div v-if="store.taskSelected.jenis == 'balut'">
                <ion-img :src="photoWebviewPath" id="gambar" v-if="photoWebviewPath"></ion-img>
                <ion-item>
                    <ion-label position="stacked">Catatan</ion-label>
                    <ion-textarea id="catatan" name="catatan" v-model="catatan"></ion-textarea>
                </ion-item>
                <ion-button @click="tangkapGambar()">Camera</ion-button>
                <ion-button @click="simpan()">Simpan</ion-button>
            </div>

            <div>

            </div>



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
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
    IonCardTitle, IonButton, IonTextarea, IonItem, IonLabel, IonImg,
    alertController
} from '@ionic/vue';
import { useUserStore } from "@/stores/users";
import { useIonRouter } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
// import { Filesystem, Directory } from '@capacitor/filesystem';
// import { Preferences } from '@capacitor/preferences';

export default defineComponent({
    name: 'TugasanPage',
    components: {
        IonContent, IonPage,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle, IonButton, IonTextarea, IonItem, IonLabel, IonImg
    },
    data() {
        return {
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
    created() {
        const id = this.route.params.id;
        this.store.pilihTask(id);
    },
    methods: {
        async scan(jenisScan) {
            await BarcodeScanner.checkPermission({ force: true });
            BarcodeScanner.hideBackground();
            document.querySelector('body').classList.add('scanner-active');
            const result = await BarcodeScanner.startScan();
            if (result.hasContent) {
                document.querySelector('body').classList.remove('scanner-active');
                if (jenisScan == 'pokok') {
                    this.pokok = result.content;
                } else {
                    this.tandan = result.content;
                }
            }

        },

        simpan() {
            var tugasan = this.store.taskSelected;
            const file = dataURLtoFile(this.photoWebviewPath, 'gambar-sawit');
            this.store.saveTaskBalut(tugasan.id, this.catatan, file).then(() => {
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
