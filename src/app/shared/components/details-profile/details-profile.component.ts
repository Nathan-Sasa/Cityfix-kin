import { Component, OnInit } from '@angular/core';
import { IonList, IonItem, IonButton, IonModal, IonIcon, ModalController, IonListHeader, IonToolbar, IonInput, IonText, IonTitle, IonContent, IonHeader, IonSelect, IonItemOption, IonSelectOption } from '@ionic/angular/standalone'
import { addIcons } from 'ionicons';
import { bag, call, closeCircleOutline, heartCircle, location, mail, pencil, person } from 'ionicons/icons';
import { IBio } from 'src/app/core/interfaces/interfaces.interface';
import { ProfileService } from 'src/app/core/services/profile.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-details-profile',
	templateUrl: './details-profile.component.html',
	styleUrls: ['./details-profile.component.scss'],
	imports: [
		IonList,
		IonListHeader,
		IonItem,
		IonToolbar,
		IonTitle,
		IonButton,
		IonModal,
		IonIcon,
		IonInput,
		IonText,
		IonContent,
		IonHeader,
		IonSelect,
		IonItemOption,
		IonSelectOption,

		FormsModule,
		ReactiveFormsModule,
		CommonModule
	]
})
export class DetailsProfileComponent  implements OnInit {

	bio: IBio = <IBio>{}

	// forms
	public bioForm: FormGroup = new FormGroup({})
	public nomForm: FormGroup = new FormGroup({})
	public prenomForm: FormGroup = new FormGroup({})
	public genreForm: FormGroup = new FormGroup({})
	public descriptionForm: FormGroup = new FormGroup({})
	public telephoneForm: FormGroup = new FormGroup({})
	public villeForm: FormGroup = new FormGroup({})
	public communeForm: FormGroup = new FormGroup({})
	public ecivilForm: FormGroup = new FormGroup({})
	public travailForm: FormGroup = new FormGroup({})

	constructor(
		private modalCtrl: ModalController,
		private profileS: ProfileService,
		private fb: FormBuilder
	) {

		addIcons({ person, pencil, bag, mail, call, heartCircle, location, closeCircleOutline })
	}

	ngOnInit() {
		this.getBio()

		this.nomForm = this.fb.group({
			nom: ['', [
				Validators.required,
				Validators.minLength(5)
			]]
		})
		this.prenomForm = this.fb.group({
			prenom: ['', [
				Validators.required,
				Validators.minLength(5)
			]]
		})
		this.genreForm = this.fb.group({
			genre: ['', [
				Validators.required
			]]
		})
		this.descriptionForm = this.fb.group({
			description: ['', [
				Validators.required,
				Validators.minLength(15)
			]]
		})
		this.telephoneForm = this.fb.group({
			telephone: ['', [
				Validators.required
				// Validators.pattern(/^[0-9]{9,}$/)
			]]
		})
		this.villeForm = this.fb.group({
			ville: ['', [
				Validators.required
			]]
		})
		this.communeForm = this.fb.group({
			commune: ['', [
				Validators.required
			]]
		})
		this.ecivilForm = this.fb.group({
			etatCivil: ['', [
				Validators.required
			]]
		})
		this.travailForm = this.fb.group({
			travail: ['', [
				Validators.required,
				Validators.minLength(10)
			]]
		})
	}

	close(){
		this.modalCtrl.dismiss()
	}

	getBio(){
		this.profileS.getBio().subscribe({
			next: (res) =>{
				this.bio = res

				if(res){
					this.nomForm.patchValue({nom: res.nom})
					this.prenomForm.patchValue({prenom: res.prenom})
					this.genreForm.patchValue({genre: res.genre})
					this.descriptionForm.patchValue({description: res.description})
					this.telephoneForm.patchValue({telephone: res.telephone})
					this.villeForm.patchValue({ville: res.ville})
					this.communeForm.patchValue({commune: res.commune})
					this.ecivilForm.patchValue({etatCivil: res.etatCivil})
					this.travailForm.patchValue({travail: res.travail})
				}
			},
			error: (err) => {
				console.log("Bio error : ", err)
			},
		})
	}

	updateNom():void{
		const id = this.bio.id
		if(this.nomForm.invalid){
			console.log("Formulaire invalid ")
			return
		}
		const formValue = this.nomForm.value
		this.profileS.updateBio(+id!, formValue).subscribe({
			next: (res) =>{
				console.log("Nom mise à jour")
				this.close()
			},
			error: (err) =>{
				console.log("Erreur du mise à jour du 'Nom'")
			}
		})
	}
	updatePrenom():void{
		const id = this.bio.id
		if(this.prenomForm.invalid){
			console.log("Formulaire invalid ")
			return
		}
		const formValue = this.prenomForm.value
		this.profileS.updateBio(+id!, formValue).subscribe({
			next: (res) =>{
				console.log("Prenom mise à jour")
				this.close()
			},
			error: (err) =>{
				console.log("Erreur du mise à jour du 'Prenom'")
			}
		})
	}
	updateGenre():void{
		const id = this.bio.id
		if(this.genreForm.invalid){
			console.log("Formulaire invalid ")
			return
		}
		const formValue = this.genreForm.value
		this.profileS.updateBio(+id!, formValue).subscribe({
			next: (res) =>{
				console.log("Gere mise à jour")
				this.close()
			},
			error: (err) =>{
				console.log("Erreur du mise à jour du 'Genre'")
			}
		})
	}
	updateDescription():void{
		const id = this.bio.id
		if(this.descriptionForm.invalid){
			console.log("Formulaire invalid ")
			return
		}
		const formValue = this.descriptionForm.value
		this.profileS.updateBio(+id!, formValue).subscribe({
			next: (res) =>{
				console.log("Description mise à jour")
				this.close()
			},
			error: (err) =>{
				console.log("Erreur du mise à jour de la 'Description'")
			}
		})
	}
	updateTelephone():void{
		const id = this.bio.id
		if(this.telephoneForm.invalid){
			console.log("Formulaire invalid ")
			return
		}
		const formValue = this.telephoneForm.value
		this.profileS.updateBio(+id!, formValue).subscribe({
			next: (res) =>{
				console.log("Telephone mise à jour")
				this.close()
			},
			error: (err) =>{
				console.log("Erreur du mise à jour de 'Numéro de téléphone'", err)
			}
		})
	}
	updateVille():void{
		const id = this.bio.id
		if(this.villeForm.invalid){
			console.log("Formulaire invalid ")
			return
		}
		const formValue = this.villeForm.value
		this.profileS.updateBio(+id!, formValue).subscribe({
			next: (res) =>{
				console.log("Ville mise à jour")
				this.close()
			},
			error: (err) =>{
				console.log("Erreur du mise à jour de la 'Vile'")
			}
		})
	}
	updateCommune():void{
		const id = this.bio.id
		if(this.communeForm.invalid){
			console.log("Formulaire invalid ")
			return
		}
		const formValue = this.communeForm.value
		this.profileS.updateBio(+id!, formValue).subscribe({
			next: (res) =>{
				console.log("Commune mise à jour")
				this.close()
			},
			error: (err) =>{
				console.log("Erreur du mise à jour de la 'Commune'")
			}
		})
	}
	updateECivil():void{
		const id = this.bio.id
		if(this.communeForm.invalid){
			console.log("Formulaire invalid ")
			return
		}
		const formValue = this.communeForm.value
		this.profileS.updateBio(+id!, formValue).subscribe({
			next: (res) =>{
				console.log("État civil mise à jour")
				this.close()
			},
			error: (err) =>{
				console.log("Erreur du mise à jour de l' 'État civil'")
			}
		})
	}
	updateTravail():void{
		const id = this.bio.id
		if(this.travailForm.invalid){
			console.log("Formulaire invalid ")
			return
		}
		const formValue = this.travailForm.value
		this.profileS.updateBio(+id!, formValue).subscribe({
			next: (res) =>{
				console.log("Profession mise à jour")
				this.close()
			},
			error: (err) =>{
				console.log("Erreur du mise à jour de la 'Profession'")
			}
		})
	}

}
