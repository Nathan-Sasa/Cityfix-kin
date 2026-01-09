import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, IonBadge, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosed, person, personCircle, settings, checkmarkCircleOutline, link, eye, close, imageOutline, imagesOutline, imageSharp, information, informationCircleOutline } from 'ionicons/icons';

import { RouterModule } from '@angular/router';
import { ProfilePostService } from 'src/app/core/services/profilePost.service';
import { IProfilePost } from 'src/app/core/interfaces/geoLocation.interface';
import { ThemeService } from 'src/app/core/services/theme.service';

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
	theme = localStorage.getItem('theme')
	isDark =false

	profile = signal({
		title: 'Cityfix',
		page: 'profile'
	})

	constructor(
		private profileProstService: ProfilePostService,
		private themeService : ThemeService,
		private modal: ModalController
	) {
		addIcons({checkmarkCircleOutline,settings,link,eye,close,imageOutline,imageSharp,person, personCircle,informationCircleOutline});
	}

	ngOnInit() {
		this.getProfilePost()

		this.themeService.isDark$.subscribe(isDark =>{
			this.getStatusClass(
				isDark ? true : false
			)
			console.log(isDark)
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
}
