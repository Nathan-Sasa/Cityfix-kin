import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar, NavController, IonIcon } from '@ionic/angular/standalone';
import { IProfilePost } from 'src/app/core/interfaces/geoLocation.interface';

import maplibregl, { NumberArray } from 'maplibre-gl'
import { FeatureCollection, Point } from 'geojson';
import { ProfilePostService } from 'src/app/core/services/profilePost.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ActivatedRoute } from '@angular/router';

import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

const map_style_light = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
const map_style_dark = 'https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json'

@Component({
	selector: 'app-profile-post-map',
	templateUrl: './profile-post-map.page.html',
	styleUrls: ['./profile-post-map.page.scss'],
	standalone: true,
	imports: [IonIcon, 
		IonContent, 
		IonHeader, 
		IonTitle, 
		IonToolbar, 
		IonButton,
		CommonModule, 
		FormsModule
	]
})
export class ProfilePostMapPage implements OnInit {

	public profiePostMap: IProfilePost = <IProfilePost>{}

	@ViewChild('profileMapContainer', {static: false})
	profileMapContainer!: ElementRef<HTMLDivElement>

	map!: maplibregl.Map

	mapData: IProfilePost = <IProfilePost>{}

	constructor(
		private profilePostService : ProfilePostService,
		private themeService: ThemeService,
		private route: ActivatedRoute,
		private navCtrl: NavController
	) { 
		addIcons({arrowBack});
	}

	back(){
		this.navCtrl.navigateBack('/cityfix-kin/profile')
	}

	ngOnInit() {

		const paramId = Number(this.route.snapshot.paramMap.get('id'))
		const id = paramId ? +paramId : 0

		this.profilePostService.getSelfPost().subscribe((postId: IProfilePost[]) =>{
			this.mapData = postId.find(I => I.LocId === id ) || <IProfilePost>{} as IProfilePost
			if(!this.mapData){
				console.log(`Inscription avec l'ID ${id} est introuvable`)
			}
		})

		this.themeService.isDark$.subscribe(isDark =>{
			if(!this.map) return
			
			this.map.setStyle(
				isDark ? map_style_dark : map_style_light
			)

			this.map.once('styledata', () =>{
				this.loadPoints()
			})
		})
	}

	ionViewDidEnter(){
		this.initMap()
		// this.mapService.initMap()
	}


	initMap(){
		this.map = new maplibregl.Map({
			container: this.profileMapContainer.nativeElement,
			style: this.themeService.current ? map_style_dark : map_style_light,
			center: [15.2663, -4.4419], // les coordonées de kinshasa
			zoom: 8
		})
		// this.mapData.Lng, this.mapData.Lat || 15.2663, -4.4419 || Number(this.mapData.Lng), Number(this.mapData.Lat)

		this.map.addControl(new maplibregl.NavigationControl());

		this.map.on('load', ()=>{
			this.loadPoints();
		})

		setTimeout(() => {
			this.map.resize
		}, 200)
	}

	loadPoints(){

		const marker = new maplibregl.Marker({color: '#4f57c4' })
			.setLngLat([this.mapData.Lng, this.mapData.Lat])
			.addTo(this.map);

		const popup = new maplibregl.Popup({ 
			offset: 25,
			closeButton: false,
			// closeOnClick: false
		})
		.setHTML(
			`
			<div
				class="*:text-clr-text bg-white flex flex-col relative gap-1.5">
				<div
					class="flex items-center justify-center h-24 w-full relative">
					<img src="${this.mapData.Img}" class="w-full h-full rounded-lg border border-clr-accent/50 object-center my-2" alt="Point Image" />
				</div>
				<div class="pt-4 gap-2 flex flex-col relative">
					<span class="absolute top-0 right-2 text-clr-accent text-xs font-mono font-semibold">Cityfix</span>
					<div>
						<span class="text-xs text-clr-accent font-mono font-semibold">Description:</span>
						<p class="text-xs line-clamp-5">${this.mapData.Desc}</p>
					</div>
					<div> 
						<span class="text-xs text-clr-accent font-mono font-semibold">Coordonées :</span>
						<p class="text-xs">${this.mapData.Av}, ${this.mapData.Qtr}, ${this.mapData.Cne}, ${this.mapData.Vll}</p>
					</div>
					<div>
						<span class="text-clr-accent font-mono text-xs font-semibold">Status:</span>
						<span class="text-xs">${this.mapData.stt}</span>
					</div>
				</div>
			</div>
			`
		)

		marker.setPopup(popup);

		const markerElement = marker.getElement();
		markerElement.addEventListener('onload', () => popup.addTo(this.map).setLngLat([this.mapData.Lng, this.mapData.Lat]));
		// markerElement.addEventListener('mouseleave', () => popup.remove());
	}

}
