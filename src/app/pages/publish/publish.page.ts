import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validator, Validators } from '@angular/forms';
import { IonContent, IonButton, IonIcon, IonList, IonItem, IonInput, IonText, IonTextarea, IonModal, ModalController, IonImg, IonToolbar, LoadingController, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { arrowBack, camera, cameraReverse } from 'ionicons/icons';

// plugins capacitor
import { Camera, CameraResultType } from '@capacitor/camera'
import { Geolocation } from '@capacitor/geolocation'
// import { PositionOptions } from 'maplibre-gl';

const takePictureLocation = async () => {

	// photo
  	const image = await Camera.getPhoto({
		quality: 90,
		allowEditing: true,
		resultType: CameraResultType.Uri
	});

	var imageUrl = image.webPath;

	const imageElement = document.getElementById('imgPublish') as HTMLImageElement
	
	if(imageElement && imageUrl){
		imageElement.src = imageUrl
		console.log('image url src :', imageElement)
	}

	// geoLocalisation
	const position = await Geolocation.getCurrentPosition()
	const Lat = position.coords.latitude
	const Lng = position.coords.longitude
	const time = position.timestamp
	// getCurrentPosition(options?: PositionOptions | undefined) => Promise<Position>
	// console.log('lat :', position.coords.latitude, 'lng :', position.coords.longitude)
	console.log('lat :' + Lat, 'lng :' + Lng, 'time :' + time)
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
		IonText,
		CommonModule, 
		FormsModule,
		ReactiveFormsModule,
		HeaderComponent
	]
})
export class PublishPage implements OnInit {

	publish = signal({
		title: 'Cityfix',
		page: 'publish'
	})

	photo = takePictureLocation

	title = signal('')
	description = signal('')

	fb = inject(FormBuilder)
	form = this.fb.group({
		formTitle : [this.title(), [Validators.required]],
		formDescription: [this.description(), [Validators.required]]
	})

	

	constructor(
		private modalCtrl: ModalController,
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController
	) { 
		addIcons({camera,cameraReverse, arrowBack});
	}

	isToast: boolean = false;
	isLoading: boolean = false;

	ngOnInit() {
	}

	closeModal(){
		this.modalCtrl.dismiss()
	}

	async showLoading(){
		const loading = await this.loadingCtrl.create({
			message: 'Chargement...',
			duration: 5000
		})
		await loading.present()
	}

	async showToast(){
		const toast = await this.toastCtrl.create({
			message: 'Il semble avoir un soucis, assurez-vous que vous être connecté à un réseau !',
			duration: 3000,
			position: 'top'
		})
		await toast.present()
	}


	submit(){

		if(this.form.invalid) return

		this.isLoading = true

		if(this.isLoading === true){
			setTimeout(()=>{
				this.showLoading()
				setTimeout(()=>{
					this.isLoading = false
					this.showToast()
				}, 5500)
			}, 200)
		}
	}

}
