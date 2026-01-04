import { AfterViewInit, Component, OnInit, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { GeoLocationService } from 'src/app/core/services/geoLocation.service';
import maplibregl from 'maplibre-gl'
import { FeatureCollection, Point } from 'geojson';
import { Router } from '@angular/router';


@Component({
	selector: 'app-map',
	templateUrl: './map.page.html',
	styleUrls: ['./map.page.scss'],
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
export class MapPage implements OnInit {

	map =  signal({
		title: 'Cityfix',
		page: 'map'
	})

	@ViewChild('mapContainer', {static: false})
	mapContainer!: ElementRef<HTMLDivElement>
	
	maps! : maplibregl.Map;

	constructor(
		private geoLocationService: GeoLocationService,
		private router: Router
	) { }

	ngOnInit() {
	}

	ionViewDidEnter(){
		this.initMap()
	}

	// ngAfterViewInit(): void {
	// }
	
	initMap(){
		this.maps = new maplibregl.Map({
			container: this.mapContainer.nativeElement,
			style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
			center: [15.2663, -4.4419], // les coordonées de kinshasa
			zoom: 8
		})

		this.maps.addControl(new maplibregl.NavigationControl());

		this.maps.on('load', ()=>{
			this.loadPoints();
		})

		setTimeout(() => {
			this.maps.resize
		}, 200)
	}

	loadPoints(){
		this.geoLocationService.getPoints().subscribe(points => {
			const geoJson: FeatureCollection<Point> = {
				type: 'FeatureCollection',
				features: points.map(p => ({
					type: 'Feature',
					properties: {
						id: p.LocId,
						description: p.Desc,
						image: p.Img,
						avenue: p.Av,
						quartier: p.Qtr,
						commune: p.Cne,
						ville: p.Vll,
						status: p.stt
					},
					geometry: {
						type: 'Point',
						coordinates: [p.Lng, p.Lat]
					}
				}))
			}

			if(!this.maps.getSource('geoPoints')){
				this.maps.addSource('geoPoints', {
					type: 'geojson',
					data: geoJson
				});

				this.maps.addLayer({
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
				});

				const popup = new maplibregl.Popup({
					closeButton: true,
					closeOnClick: true,
					offset: 20,
					className: 'custom-popup'
				})

				this.maps.on('click', 'geoPoints-layer', (e) => {
					// this.maps.getCanvas().style.cursor = 'pointer'
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
								class="max-w-xs bg-white flex flex-col relative gap-1.5">
								<div
									class="flex items-center justify-center h-40 w-full relative">
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
						.addTo(this.maps);

					setTimeout(()=> {
						const btn = document.getElementById('details')
						if(btn){
							btn.onclick = () =>{
								this.router.navigate(['/geo-details', id])
							}
						}
					})
				})

				this.maps.on('mouseleave', 'geoPoints-layer', () => {
					this.maps.getCanvas().style.cursor = '';
					// popup.remove();
				})
			}
			// mise à jour suivante des points
			else{
				(this.maps.getSource('geoPoints') as maplibregl.GeoJSONSource)
					.setData(geoJson);
			}
		})
	}

}
