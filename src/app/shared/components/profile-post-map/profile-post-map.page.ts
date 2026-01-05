import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IProfilePost } from 'src/app/core/interfaces/geoLocation.interface';

import maplibregl from 'maplibre-gl'
import { FeatureCollection, Point } from 'geojson';
import { ProfilePostService } from 'src/app/core/services/profilePost.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ActivatedRoute } from '@angular/router';

const map_style_light = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
const map_style_dark = 'https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json'

@Component({
  selector: 'app-profile-post-map',
  templateUrl: './profile-post-map.page.html',
  styleUrls: ['./profile-post-map.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProfilePostMapPage implements OnInit {

	public profiePostMap: IProfilePost = <IProfilePost>{}

	@ViewChild('profileMapContainer', {static: false})
	profileMapContainer!: ElementRef<HTMLDivElement>

	map!: maplibregl.Map

	constructor(
		private profilePostService : ProfilePostService,
		private themeService: ThemeService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.themeService.isDark$.subscribe(isDark =>{
			if(!this.map) return
			
			this.map.setStyle(
				isDark ? map_style_dark : map_style_light
			)

			// this.map.once('styledata', () =>{
			// 	this.loadPoints()
			// })
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

		this.map.addControl(new maplibregl.NavigationControl());

		this.map.on('load', ()=>{
			this.loadPoints();
		})

		setTimeout(() => {
			this.map.resize
		}, 200)
	}

	loadPoints(){
		const paramId = Number(this.route.snapshot.paramMap.get('id'))
		const id = paramId ? +paramId : 0

		this.profilePostService.getProfilePostId(id).subscribe(post => {
			const postById = post
			
			if(postById){
				// FeatureCollection<Point>
				const geoJson  = {
					type: 'FeatureCollection',
					features: {
						type: 'Feature',
						properties: {
							id: post.LocId,
							description: post.Desc,
							avenue: post.Img,
							querier: post.Qtr,
							commune: post.Cne,
							ville: post.Vll,
							status: post.stt
						},
						geometry: {
							type: 'Point',
							coordinates: [post.Lng, post.Lat]
						}
					}
				}

				this.map.addLayer({
					id: 'geoPoints-layer',
					type: 'circle',
					source: 'geoPoints',
					paint: {
						'circle-radius': 6,
						'circle-color': [
							'match',
							['get', 'status'],
							'Signalé', '#4f57c4', //indigo
							'Encours', '#f59e0b', //jaune
							'Résolu', '#22c55e', //vert
							'#2563eb'
						],
						'circle-stroke-width': 2,
						'circle-stroke-color': '#ffffff',
						'circle-opacity': 0.8
					}
				})

				const popup = new maplibregl.Popup({
					closeButton: true,
					closeOnClick: true,
					offset: 20,
					className: 'custom-popup'
				})

				this.map.on('click', 'geoPoints-layer', (e)=>{
					const coordinates = (e.features![0].geometry as any).coordinates.slice();
					const description = e.features![0].properties!['description'];
					const image = e.features![0].properties!['image'];
					const avenue = e.features![0].properties!['avenue'];
					const quartier = e.features![0].properties!['quartier'];
					const commune = e.features![0].properties!['commune'];
					const ville = e.features![0].properties!['ville'];
					const status = e.features![0].properties!['status'];
					const id = e.features![0].properties!['id']

					popup.setLngLat(coordinates)
						.setHTML(
							`
							<div
								class="*:text-clr-text bg-white flex flex-col relative gap-1.5">
								<div
									class="flex items-center justify-center h-24 w-full relative">
									<img src="${image}" class="w-full h-full rounded-lg border border-clr-accent/50 object-center my-2" alt="Point Image" />
								</div>
								<div class="pt-4 gap-2 flex flex-col relative">
									<span class="absolute top-0 right-2 text-clr-accent text-xs font-mono font-semibold">Cityfix</span>
									<div>
										<span class="text-xs text-clr-accent font-mono font-semibold">Description:</span>
										<p class="text-xs line-clamp-5">${description}</p>
									</div>
									<div> 
										<span class="text-xs text-clr-accent font-mono font-semibold">Coordonées :</span>
										<p class="text-xs">${avenue}, ${quartier}, ${commune}, ${ville}</p>
									</div>
									<div>
										<span class="text-clr-accent font-mono text-xs font-semibold">Status:</span>
										<span class="text-xs">${status}</span>
										<i class="bi bi-eye text-clr-accent cursor-pointer absolute right-0" id="details"></i>
									</div>
								</div>
							</div>
							`
						)
						.addTo(this.map);

				})
			}


		})
	}

}
