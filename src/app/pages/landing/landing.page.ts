import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonText, NavController } from '@ionic/angular/standalone';

@Component({
	selector: 'app-loanding',
	templateUrl: './landing.page.html',
	styleUrls: ['./landing.page.scss'],
	standalone: true,
	imports: [
		IonContent, 
		IonHeader, 
		IonTitle, 
		IonToolbar,
		IonButtons,
		IonButton,
		IonText,
		CommonModule,
		FormsModule
	]
})
export class LandingPage implements OnInit {

	appContent = signal({
		title: 'Cityfix',
		logo: '',

	})

	constructor(
		private navCtrl: NavController
	) { }

	ngOnInit() {
	}

	login(){
		this.navCtrl.navigateForward('/login')
	}
	
}
