import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardHeader,IonCardSubtitle, IonCardTitle, IonCardContent,  IonContent, IonHeader, IonTitle, IonToolbar, IonAvatar, IonImg, IonButton, IonIcon, IonRefresher, IonRefresherContent, RefresherCustomEvent, IonBadge } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { PostService } from 'src/app/core/services/postService.service';
import { IPost, IUser } from 'src/app/core/interfaces/interfaces.interface';
import { addIcons } from 'ionicons';
import { ellipsisVerticalCircle, mapSharp } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
	standalone: true,
	imports: [
		IonContent,
		IonCard,
		IonCardHeader,
		IonCardSubtitle,
		IonCardTitle,
		IonCardContent,
		IonAvatar,
		IonImg,
		IonButton,
		IonIcon,
		IonRefresher,
		IonRefresherContent,
		IonBadge,

		CommonModule,
		FormsModule,
		RouterModule,
		HeaderComponent
	]
})
export class HomePage implements OnInit {

	feed = signal<IPost[]>([])
	page = 0
	last = false

	home = signal(
		{
			title: 'Cityfix',
			page: 'home',
			logo: 'assets/images/site/logo/Cityfix_logo/Cityfix_logo.webp'
		}
	)

	constructor(
		private postService: PostService
	) { 
		addIcons({ellipsisVerticalCircle, mapSharp});
	}

	ngOnInit() {
		// this.loadFeed()
	}

	ionViewDidEnter(){
		this.loadFeed()
	}

	handleRefresh(event: RefresherCustomEvent) {
		setTimeout(() => {
			this.loadFeed()
			event.target.complete();
		}, 2000);
  }

	loadFeed(){
		if(this.last) return

		this.postService.getFeed(this.page).subscribe({
			next: (res) => {
				this.feed.update(p => [...p, ...res.content])

				// this.feedUser.update(u => {
				// 	const users = res.content.map(c => c.user)
				// 	return {...u, ...users}
				// })
				this.last = res.last
				this.page ++

				console.log("feed ok : ", res)
			}
		})
	}

	getStatusClass(status: string): string{
		switch(status){
			case 'SIGNALE':
				return 'signale';
			case 'ENCOURS':
				return 'encours';
			case 'RESOLU':
				return 'resolu';
			default:
				return 'bg-gray-500 text-white';
		}
	}
}
