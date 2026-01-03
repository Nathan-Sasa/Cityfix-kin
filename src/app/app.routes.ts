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
				path: 'settings',
				loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
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
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/cityfix-kin/home'
	},
	{
		path: '**',
		loadComponent: () => import('./pages/not-found/not-found.page').then(m => m.NotFoundPage)
	}
];
