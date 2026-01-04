import { Component, Input, OnInit, signal } from '@angular/core';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, IonButtons, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { notifications, settings } from 'ionicons/icons';



// IonContent, 

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	imports: [
		IonHeader, 
		IonTitle, 
		IonIcon,
		IonButtons,
		IonButton,
		IonToolbar
	],
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

	@Input() name = signal({
		title: 'Cityfix',
		page: 'home',
	})

	constructor() {
		addIcons({settings, notifications})
	 }

	ngOnInit() {}

}
