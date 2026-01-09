import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonList, IonTitle, IonToggle, IonToolbar, IonItem, IonBackButton, IonModal, IonIcon, IonListHeader, NavController, IonLabel, IonTextarea } from '@ionic/angular/standalone';
import { ThemeService } from 'src/app/core/services/theme.service';
import { addIcons } from 'ionicons';
import { arrowBack, arrowBackSharp, chevronForward, lockClosed, logOut, moon, moonOutline, personCircle } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');


@Component({
	selector: 'app-settings',
	templateUrl: './settings.page.html',
	styleUrls: ['./settings.page.scss'],
	standalone: true,
	imports: [
		IonContent, 
		IonHeader, 
		IonTitle, 
		IonToolbar, 
		IonToggle,
		IonButton,
		IonButtons,
		IonList,
		IonListHeader,
		IonItem,
		IonLabel,
		IonIcon,
		IonModal,
		IonTextarea,
		CommonModule, 
		FormsModule,
		RouterModule
	]
})
export class SettingsPage implements OnInit {

	paletteToggle = false;
	isDark = false

	constructor(
		public themeService: ThemeService,
		private navCtrl: NavController
	) {
        addIcons({arrowBack,personCircle,chevronForward,lockClosed,moon, arrowBackSharp, logOut }); 
	}

	ngOnInit() {

		addIcons({ personCircle, lockClosed, arrowBack, chevronForward, moon })
		
		// this.initializeDarkPalette(prefersDark.matches);
		// prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
	}

	// button back
	back(){
		this.navCtrl.navigateBack('/cityfix-kin/profile')
	}

	// control de theme (dark/light) ionic
	initializeDarkPalette(isDark: boolean) {
		this.paletteToggle = isDark;
		this.toggleDarkPalette(isDark);
	}

	toggleChange(event: CustomEvent) {
		this.toggleDarkPalette(event.detail.checked);
		// this.initializeDarkPalette(prefersDark.matches);
		// prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
	}

	toggleDarkPalette(shouldAdd: boolean) {
		document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
	}


}
