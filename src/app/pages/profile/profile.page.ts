import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { SettingsPage } from 'src/app/shared/components/settings/settings.page';
import { lockClosed, person, personCircle, settings } from 'ionicons/icons';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
	standalone: true,
	imports: [
		IonContent, 
		IonHeader, 
		IonTitle, 
		IonToolbar,
		IonButtons,
		IonButton,
		IonImg,
		IonIcon,
		IonLabel,
		IonList,
		IonItem,
		IonListHeader,
		IonModal,
		CommonModule, 
		FormsModule,
		HeaderComponent,
		// SettingsPage
	]
})
export class ProfilePage implements OnInit {

	profile = signal({
		title: 'Cityfix',
		page: 'profile'
	})

	constructor() {
		addIcons({ person, personCircle, lockClosed, settings })
	 }

	ngOnInit() {
	}

}
