import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'cityfix-kin',
		loadComponent: () => import('./pages/cityfix/cityfix.page').then( m => m.CityfixPage),
		children: [
			{
				path: 'home',
				loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
			},
			{
				path: 'map',
				loadComponent: () => import('./pages/map/map.page').then( m => m.MapPage)
			},
			{
				path: 'profile',
				loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage),
				// children: [
				// 	{
				// 		path: 'settings',
				// 		loadComponent: ()=> import('./shared/components/settings/settings.page').then(m=> m.SettingsPage)
				// 	},
				// ]
			},
			{
				path: 'publish',
				loadComponent: () => import('./pages/publish/publish.page').then( m => m.PublishPage)
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: '/cityfix-kin/home'
			}
		]
	},

	// auth paths ==============================================
	{
		path: 'loanding',
		loadComponent: () => import('./pages/loanding/loanding.page').then( m => m.LoandingPage)
	},
	{
		path: 'register',
		loadComponent: () => import('./auth/register/register.page').then( m => m.RegisterPage)
	},
	{
		path: 'login',
		loadComponent: () => import('./auth/login/login.page').then( m => m.LoginPage)
	},

	// map geoLocation paths =====================================
	{
	  path: 'geo-details/:id',
	  loadComponent: () => import('./pages/geo-details/geo-details.page').then( m => m.GeoDetailsPage)
	},

	// profile paths ==============================================
	{
		path: 'cityfix-kin/profile/settings',
		loadComponent: ()=> import('./shared/components/settings/settings.page').then(m=> m.SettingsPage)
	},
	{
	  path: 'cityfix-kin/profile/map/:id',
	  loadComponent: () => import('./shared/components/profile-post-map/profile-post-map.page').then( m => m.ProfilePostMapPage)
	},


	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/cityfix-kin/home'
	},
	{
		path: '**',
		loadComponent: () => import('./pages/not-found/not-found.page').then(m => m.NotFoundPage)
	},
];
