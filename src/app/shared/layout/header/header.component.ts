import { Component, Input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonToggle, IonLabel, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { notifications, settings } from 'ionicons/icons';
import { ThemeService } from 'src/app/core/services/theme.service';



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
		IonToolbar,
		IonImg,
		IonItem,
		IonToggle,
		IonLabel,
		FormsModule

	],
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

	@Input() name = signal({
		title: 'Cityfix',
		page: 'home',
		logo: 'assets/images/site/logo/Cityfix_logo/Cityfix_logo.webp'
	})

	isDark = false;

	constructor(
		public themeService: ThemeService
	) {
		addIcons({settings, notifications})
	}

	ngOnInit() {
		// this.themeService.isDark$.subscribe(d => this.isDark = d)

		
	}

	// toggleTheme(){
	// 	this.themeService.toggle()
	// }

	// toggleTheme(){
	// 	this.isDark = !this.isDark
	// 	this.themeService.setDark(this.isDark)
	// 	// this.upda
	// 	console.log(localStorage.getItem('theme'))
	// }



	
}
