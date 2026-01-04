import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonImg, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GeoLocationService } from 'src/app/core/services/geoLocation.service';
import { ActivatedRoute } from '@angular/router';
import { IGeoLocation } from 'src/app/core/interfaces/geoLocation.interface';
import { addIcons } from 'ionicons';

@Component({
	selector: 'app-geo-details',
	templateUrl: './geo-details.page.html',
	styleUrls: ['./geo-details.page.scss'],
	standalone: true,
	imports: [
		IonContent, 
		IonHeader, 
		IonTitle, 
		IonToolbar, 
		IonImg,
		CommonModule, 
		FormsModule
	]
})
export class GeoDetailsPage implements OnInit {

	geoLocation: IGeoLocation  = <IGeoLocation>{};

	constructor(
		private geoLocationService: GeoLocationService,
		private route: ActivatedRoute
	) { 
		addIcons({})
	}

	ngOnInit() {

		const idParam = Number(this.route.snapshot.paramMap.get('id'));
        const id = idParam ? +idParam : 0;

		this.geoLocationService.getPoints().subscribe((geoLocations: IGeoLocation[]) =>  {
			this.geoLocation = geoLocations.find(geoLocation => geoLocation.LocId === id) || <IGeoLocation>{};

			if(!this.geoLocation){
				console.log('information pour cette géolocalisé est introuvable');
			}
		})

	}

}
