import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, NavController, IonButton, IonIcon, IonInput, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
	IonText, 
	IonContent, 
	IonHeader, 
	IonTitle, 
	IonToolbar, 
	IonButton,
	IonIcon,
	IonInput,
	
	CommonModule, 
	FormsModule,
	ReactiveFormsModule
]
})
export class RegisterPage implements OnInit {

	form: FormGroup;

	constructor(
		private navCtrl: NavController,
		private fb: FormBuilder,
		private authS: AuthService
	) { 
		addIcons({chevronBack});

		this.form = this.fb.group({
			username: [
				'', 
				[
					Validators.required,
					Validators.minLength(3)
				]
			],
			email : [
				'',
				[
					Validators.required,
					Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
				]
			],
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(8),
					Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
				]
			],
			confirm: [
				'',
				[
					Validators.required,
					Validators.minLength(8),
					Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
				]
			]
		})

		if (this.form.get('password') && this.form.get('confirm')) {
			this.form.get('confirmPassword')?.setValidators([
				Validators.required,
				Validators.minLength(8),
				Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
				this.passwordMatchValidator.bind(this)
			]);
		}
	}

	passwordMatchValidator(control: any) {
		if (this.form) {
			const password = this.form.get('password')?.value;
			const confirm = control.value;

			if (password !== confirm) {
				return { passwordMismatch: true };
			}
		}
		return null;
	}	


	ngOnInit() {
	}

	back(){
		this.navCtrl.navigateBack('/landing')
	}

	login(){
		this.navCtrl.navigateForward('/login')
	}

	loader = false
	register = false
	messageError = false
	success = false

	submit(){
		if(this.form.invalid){
			this.form.markAllAsTouched()
			console.log("formulaire invalide")
		}

		this.loader = true
		if(this.loader === true) {
			console.log("Insccription encours")
		}

		setTimeout(() => {
			const formValues = this.form.value

			this.authS.register(formValues).subscribe({
				next: (res) => {
					console.log("Inscription réussier !")
					this.form.reset()
					setTimeout(() => {
						const {username, password} = this.form.value
						this.authS.login(username!, password!).subscribe({
							next: () =>{
								console.log("Connexion réussie !")
								this.navCtrl.navigateForward('/cityfix-kin/home')
							},
							error(err) {
								console.log("Echec de connexion ! Une erreur est survenue : ", err)
							},
						})
					}, 2000)
				},
				error(err) {
					console.log("Une erreur est survenue, désolé votre inscription échoué ! Velliez réessayer !")
				},
			})
		}, 2000)

	}

}
