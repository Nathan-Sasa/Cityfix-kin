import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, IonBadge, ModalController, IonInput, IonAvatar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosed, person, personCircle, settings, checkmarkCircleOutline, link, eye, close, imageOutline, imagesOutline, imageSharp, information, informationCircleOutline, pencilSharp } from 'ionicons/icons';

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
		IonAvatar,

		CommonModule, 
		FormsModule,
		RouterModule 
	]
})

// selfPostJson
// "reply": [
// 	{
// 	"name": "Jonathan Sasa",
// 	"status": "Citoyen",
// 	"message": "Oui, j'ai aussi vu cette route degradé en rentrant à la maison. Ça pénalise vraiment la circulation",
// 	"replyLike": 43,
// 	"replyDate": "12-12-2025"
// 	}
// ]

export class ProfilePage implements OnInit {

	profilePost: IProfilePost[] = []
	profile: IProfile = <IProfile>{}
	theme = localStorage.getItem('theme')
	isDark =false

	// profile = signal({
	// 	name: this.authS.getUsernameFromToken(),
	// 	email: this.authS.getEmailFromToken()
	// })

	constructor(
		private profileProstService: ProfilePostService,
		private themeService : ThemeService,
		private modal: ModalController,
		private authS: AuthService,
		private profileS: ProfileService
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
	}

	Profile(){
		this.profileS.getProfile().subscribe({
			next: (res) =>{
				this.profile = res
				console.log("données recus : ", res)
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
		this.profileS.uploadAvatar(file).subscribe({
			next: (profile) =>{
				// this.profile = profile
				this.loading = false
			},
			error: (err) =>{
				this.loading = false
				console.log('Erreur lors du téléchargement de l\'image', err)
			}
		})
	}

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
