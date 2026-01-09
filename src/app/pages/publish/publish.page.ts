import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon, IonList, IonItem, IonInput, IonTextarea, IonModal, ModalController, IonImg, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { camera, cameraReverse } from 'ionicons/icons';

// plugins capacitor
import { Camera, CameraResultType } from '@capacitor/camera'

const takePicture = async () => {
  const image = await Camera.getPhoto({
		quality: 90,
		allowEditing: true,
		resultType: CameraResultType.Uri
	});

	var imageUrl = image.webPath;
	console.log('url image : ' ,imageUrl)

  	// imageElement.src = imageUrl;
}

@Component({
	selector: 'app-publish',
	templateUrl: './publish.page.html',
	styleUrls: ['./publish.page.scss'],
	standalone: true,
	imports: [
		IonContent,
		IonButton,
		IonIcon,
		IonList,
		IonItem,
		IonInput,
		IonModal,
		IonImg,
		IonToolbar, 
		IonTextarea,
		CommonModule, 
		FormsModule,
		HeaderComponent
	]
})
export class PublishPage implements OnInit {

	publish = signal({
		title: 'Cityfix',
		page: 'publish'
	})

	photo = takePicture

	title = signal('')
	description = signal('')

	constructor(
		private modalCtrl: ModalController
	) { 
		addIcons({camera,cameraReverse});
	}

	ngOnInit() {
	}

	closeModal(){
		this.modalCtrl.dismiss()
	}

}
