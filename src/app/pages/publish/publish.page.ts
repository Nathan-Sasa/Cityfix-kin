import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validator, Validators } from '@angular/forms';
import { IonContent, IonButton, IonIcon, IonList, IonItem, IonInput, IonText, IonTextarea, IonModal, ModalController, IonImg, IonToolbar, LoadingController, ToastController, IonicSafeString } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { arrowBack, camera, cameraReverse } from 'ionicons/icons';

// plugins capacitor
import { Camera, CameraResultType } from '@capacitor/camera'
import { Geolocation } from '@capacitor/geolocation'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


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

	private readonly postApi = environment.postApi

	publish = signal({
		title: 'Cityfix',
		page: 'publish'
	})

	imagePath: string | null = null
	lat: number | null = null
	lng: number | null = null

	title = signal('')
	description = signal('')

	fb = inject(FormBuilder)
	form = this.fb.group({
		title : [this.title(), [Validators.required]],
		content: [this.description(), [Validators.required]]
	})

	constructor(
		private modalCtrl: ModalController,
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
		private http: HttpClient
	) { 
		addIcons({camera,cameraReverse, arrowBack});
	}

	isToast: boolean = false;
	isLoading: boolean = false;

	ngOnInit() {
		this.getFormValue()
	}

	closeModal(){
		this.modalCtrl.dismiss()
	}

	async showToast(mess: string | IonicSafeString | undefined) {
		const toast = await this.toastCtrl.create({
			message: mess,
			duration: 3000,
			position: 'top',
			color: 'danger'
		})
		await toast.present()
	}


	async takePictureLocation() {
		// photo
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: true,
			resultType: CameraResultType.Uri
		});

		if(!image.webPath) {
			console.error("No image path returned");
			return;
		}

		this.imagePath = image.webPath ?? null;

		// preview image
		const img = document.getElementById('imgPublish') as HTMLImageElement
		if(img && this.imagePath) {
			img.src = this.imagePath;
		}

		// geoLocalisation
		const position = await Geolocation.getCurrentPosition()
		this.lat = position.coords.latitude
		this.lng = position.coords.longitude
		console.log('lat :' + this.lat, 'lng :' + this.lng)
	}

	getFormValue(){
		this.form.patchValue({
			title: this.title(),
			content: this.description()
		})
	}

	async submit() {
		if (
			this.form.invalid || 
			this.imagePath === null || 
			this.lat === null || 
			this.lng === null
		) {
			console.log(`Form invalid or missing data:
				Form valid: ${this.form.valid},
				Image path: ${this.imagePath},
				Latitude: ${this.lat},
				Longitude: ${this.lng}`);
			const cerrMess = 'Veuillez remplir tous les champs et ajouter une image avant de soumettre le signalement.'
			this.showToast(cerrMess)
			return
		}

		const loading = await this.loadingCtrl.create({
			message: "Signalement encours..."
		})
		await loading.present()

		try{
			const response = await fetch(this.imagePath)
			const blob = await response.blob()

			const formData = new FormData()
			formData.append('image', blob, 'signalement.jpg')
			formData.append('title', this.form.value.title !)
			formData.append('content', this.form.value.content !)
			formData.append('lat', this.lat.toString())
			formData.append('lng', this.lng.toString())

			await this.http.post(`${this.postApi}/post`, formData).toPromise()
			await loading.dismiss()
			await this.modalCtrl.dismiss()
		} catch (err) {
			await loading.dismiss()
			const cerrMess = 'Erreur lors de la soumission du signalement.'
			this.showToast(cerrMess)
		}
	}
}