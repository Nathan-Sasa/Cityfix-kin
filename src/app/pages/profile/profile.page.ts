import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar, IonBadge, ModalController, IonToast, IonLoading, ToastController, LoadingController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { person, personCircle, settings, checkmarkCircleOutline, link, eye, close, imageOutline, imageSharp, informationCircleOutline, pencilSharp } from 'ionicons/icons';

import { RouterModule } from '@angular/router';
import { ProfilePostService } from 'src/app/core/services/profilePost.service';
import { IProfilePost } from 'src/app/core/interfaces/geoLocation.interface';
import { ThemeService } from 'src/app/core/services/theme.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IProfile } from 'src/app/core/interfaces/interfaces.interface';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
	standalone: true,
	imports: [IonBadge, 
		IonContent,
		IonButtons,
		IonButton,
		IonImg,
		IonIcon,
		IonLabel,
		IonList,
		IonItem,
		IonModal,
		IonToolbar,
		IonBadge,
		IonTitle,
		IonContent,

		CommonModule, 
		FormsModule,
		RouterModule 
	]
})

export class ProfilePage implements OnInit {

	profilePost: IProfilePost[] = []
	profile: IProfile = <IProfile>{}
	theme = localStorage.getItem('theme')
	isDark =false

	constructor(
		private profileProstService: ProfilePostService,
		private themeService : ThemeService,
		private modal: ModalController,
		private authS: AuthService,
		private profileS: ProfileService,
		private toastCtrl: ToastController,
		private loadingCtrl: LoadingController
	) {
		addIcons({checkmarkCircleOutline,settings,link,eye,close,imageOutline,imageSharp,person, personCircle,informationCircleOutline, pencilSharp});
	}

	// profile?: IProfile
	loading = false

	ngOnInit() {
		this.Profile()

		this.getProfilePost()

		this.themeService.isDark$.subscribe(isDark =>{
			this.getStatusClass(
				isDark ? true : false
			)
			console.log(isDark)
		})

		// console.log("Token valid ? :", this.authS.hasValidToken())
		// console.log("Is loggedIn? :", this.authS.isLoggedIn())
	}


	// ionViewDidEnter(){
	// 	this.Profile()
	// }

	Profile(){
		this.profileS.getProfile().subscribe({
			next: (res) =>{
				this.profile = res
				// console.log("données recus : ")
			},
			error(err) {
				console.log("données non recus : ", err)
			},
		})
	}

	getProfilePost(){
		this.profileProstService.getSelfPost().subscribe(res => {
			this.profilePost = res
		})
	}

	getStatusClass(status: boolean | null): string{
		// console.log(this.theme)
		switch(status){
			case true:
				return 'bg-black text-clr-span';
			case false:
				return 'bg-white text-black';
			default:
				return 'bg-gray-500 text-white';
		}
	}

	//  modalCtrl ===========
	closeModal(){
		this.modal.dismiss();
	}

	// Upload photo de profile ======================================
	// =======================================================

	// loading et toast -----------------------------
	async showLoading(){
		const loading = await this.loadingCtrl.create({
			message: "Chargement...",
			translucent: true,
			cssClass: 'custom-class custom-loading'
		})
		await loading.present();
	}

	// taost
	// success
	async showToastSuccess(){
		const toast = await this.toastCtrl.create({
			message: 'Photo de profile mise à jour avec succès !',
			duration: 3000,
			color: 'success',
			position: 'top'
		});
		await toast.present();
	}

	// failed
	async showToastFailed(){
		const toast = await this.toastCtrl.create({
			message: 'Échec de la mise à jour de la photo de profile.',
			duration: 3000,
			color: 'danger',
			position: 'top'
		});
		await toast.present();
	}
	// ----------------------------------------------------------
	openFilePicker(fileInput: HTMLInputElement){
		fileInput.click()
	}

	onFileSelected(event: Event){
		const input = event.target as HTMLInputElement
		if(!input.files?.length) return

		const file = input.files[0]

		if(!file.type.startsWith('image/')){
			alert('Fichier invalide')
			return
		}

		this.loading = true
		if(this.loading === true){
			this.showLoading()
		}
		this.profileS.uploadAvatar(file).subscribe({
			next: (profile) =>{
				setTimeout(() => {
					this.Profile()
					
					this.loading = false
					this.closeModal()
					this.loadingCtrl.dismiss()
					this.showToastSuccess()
				}, 1000)
			},
			error: (err) =>{
				this.showToastFailed()
				this.loading = false
				console.log('Erreur lors du téléchargement de l\'image', err)
			}
		})
	}
	// ======================================================

	// Delete photo de profile ======================================
	// ======================================================
	deleteAvatar(){
		this.profileS.deleteAvatar().subscribe({
			next: (profile) =>{
				// this.profile = profile
			},
			error: (err) =>{
				console.log('Erreur lors de la suppression de l\'image', err)
			}
		})
	}
}
