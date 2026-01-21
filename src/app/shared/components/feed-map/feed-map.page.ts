import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';

import maplibregl from 'maplibre-gl'

import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

import { IPost } from 'src/app/core/interfaces/interfaces.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/core/services/postService.service';
import { ThemeService } from 'src/app/core/services/theme.service';

const map_style_light = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
const map_style_dark = 'https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json'

@Component({
  selector: 'app-feed-map',
  templateUrl: './feed-map.page.html',
  styleUrls: ['./feed-map.page.scss'],
  standalone: true,
  imports: [
	IonContent, 
	IonHeader, 
	IonTitle, 
	IonToolbar, 
	IonButton,
	IonIcon,

	CommonModule, 
	FormsModule
]
})
export class FeedMapPage implements OnInit {

	feed: IPost = <IPost>{}
	page = 0
	last = false

	@ViewChild('feedMapContainer', {static: false})
	feedMapContainer!: ElementRef<HTMLDivElement>

	map!: maplibregl.Map
	mapData: IPost = <IPost>{}

	constructor(
		private route: ActivatedRoute,
		private postService: PostService,
		private themeService: ThemeService,
		private navCtrl: NavController
	){
		addIcons({arrowBack});
	}

	back() {
		this.navCtrl.navigateBack('/cityfix-kin/home')
	}

	ngOnInit() {
		const paramId = Number(this.route.snapshot.paramMap.get('id'))
		const id = paramId ? +paramId : 0

		this.postService.getFeed(this.page).subscribe(res => {
			this.mapData = res.content.find(f => f.id === id) as IPost
			if(!this.mapData) {
				console.log("feed by id not foud")
			} else {
				console.log("feed by id ok")
			}
		})
	}

	ionViewDidEnter(){
		this.initMap()
		// this.mapService.initMap()
	}


	initMap(){
		this.map = new maplibregl.Map({
			container: this.feedMapContainer.nativeElement,
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
			.setLngLat([this.mapData.longitude, this.mapData.latitude])
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
					<img src="${this.mapData.image || this.mapData.imageBlur}" class="w-full h-full rounded-lg border border-clr-accent/50 object-center my-2" alt="Point Image" />
				</div>
				<div class="pt-4 gap-2 flex flex-col relative">
					<span class="absolute top-0 right-2 text-clr-accent text-xs font-mono font-semibold">Cityfix</span>
					<div>
						<span class="text-xs text-clr-accent font-mono font-semibold">Description:</span>
						<p class="text-xs line-clamp-5">${this.mapData.content}</p>
					</div>
					
					<div>
						<span class="text-clr-accent font-mono text-xs font-semibold">Status:</span>
						<span class="text-xs">${this.mapData.status}</span>
					</div>
				</div>
			</div>
			`
		)

		marker.setPopup(popup);

		const markerElement = marker.getElement();
		markerElement.addEventListener('onload', () => popup.addTo(this.map).setLngLat([this.mapData.longitude, this.mapData.latitude]));
		// markerElement.addEventListener('mouseleave', () => popup.remove());
	}


	// <!-- <div> 
	// 	<span class="text-xs text-clr-accent font-mono font-semibold">Coordonées :</span>
	// 	<p class="text-xs">${this.mapData.Av}, ${this.mapData.Qtr}, ${this.mapData.Cne}, ${this.mapData.Vll}</p>
	// </div> -->
}
