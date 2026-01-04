import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToggle, IonToolbar } from '@ionic/angular/standalone';
import { ThemeService } from 'src/app/core/services/theme.service';

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
		CommonModule, 
		FormsModule,
		
	]
})
export class SettingsPage implements OnInit {

	paletteToggle = false;
	isDark = false

	constructor(
		public themeService: ThemeService
	) { }

	ngOnInit() {
		// this.initializeDarkPalette(prefersDark.matches);
		// prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
	}

	// control de theme (dark/light) ionic
	initializeDarkPalette(isDark: boolean) {
		this.paletteToggle = isDark;
		this.toggleDarkPalette(isDark);
	}

	toggleChange(event: CustomEvent) {
		this.toggleDarkPalette(event.detail.checked);
	}

	toggleDarkPalette(shouldAdd: boolean) {
		document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
	}


}
