import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonIcon, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { cog, home, library, map, personCircle, play, playCircle, radio, search, send } from 'ionicons/icons';
import { addIcons } from 'ionicons';

// IonContent, 
// IonHeader, 
// IonTitle, 
// IonToolbar, 

@Component({
	selector: 'app-cityfix',
	templateUrl: './cityfix.page.html',
	styleUrls: ['./cityfix.page.scss'],
	standalone: true,
	imports: [
		IonIcon, 
		IonTabBar, 
		IonTabButton, 
		IonTabs,
		CommonModule, 
		FormsModule,
	]
})
export class CityfixPage implements OnInit {

	constructor() {
    	addIcons({ library, playCircle, play, radio, search, home, cog, personCircle, map, send })
	}

	ngOnInit() {
	}

}
