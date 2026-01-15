import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, NavController, IonBackButton, IonIcon, IonInput, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
	IonContent, 
	IonHeader, 
	IonTitle, 
	IonToolbar, 
	IonButtons,
	IonButton,
	IonIcon,
	IonInput,
	IonText,
	CommonModule, 
	FormsModule,
	ReactiveFormsModule
]
})
export class LoginPage implements OnInit {

	appContent = signal({
			title: 'Cityfix',
			logo: '',
	
		})

	constructor(
		private navCtrl: NavController,
		private fb: FormBuilder,
		private authS: AuthService
	) { 
		addIcons({chevronBack});
	}

	form = this.fb.group({
		username: ['', [Validators.required]],
		password: ['', [Validators.required]]
	})

	ngOnInit() {
	}

	back(){
		this.navCtrl.navigateBack('/landing')
	}
	register(){
		this.navCtrl.navigateForward('/register')
	}


	submit(){

		if(this.form.invalid) return

		setTimeout(() => {
			const {username, password} =this.form.value

			this.authS.login(username!, password!).subscribe({
				next: () => {
					console.log("Connexion réussie !")
					this.navCtrl.navigateForward('/cityfix-kin/home')
				},
				error: (err) => {
					console.log("Une erreur est survenue : ", err)
				}
			})
		})
	}
}
