import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';

@Component({
	selector: 'app-publish',
	templateUrl: './publish.page.html',
	styleUrls: ['./publish.page.scss'],
	standalone: true,
	imports: [
		IonContent, 
		IonHeader, 
		IonTitle, 
		IonToolbar, 
		CommonModule, 
		FormsModule,
		HeaderComponent
	]
})
export class PublishPage implements OnInit {

	publish = signal({
		title: 'Cityfix',
		page: 'publish'
	})

	constructor() { 
		addIcons({  })
	}

	ngOnInit() {
	}

}
