import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

	// auth paths (route libre) ==============================================
	{
		path: 'landing',
		loadComponent: () => import('./pages/landing/landing.page').then( m => m.LandingPage)
	},
	{
		path: 'register',
		loadComponent: () => import('./auth/register/register.page').then( m => m.RegisterPage)
	},
	{
		path: 'login',
		loadComponent: () => import('./auth/login/login.page').then( m => m.LoginPage)
	},

	// ========================================================
	// route protegée ==============================================

	{
		path: 'cityfix-kin',
		loadComponent: () => import('./pages/cityfix/cityfix.page').then( m => m.CityfixPage),
		children: [
			{
				path: 'home',
				loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage),
				canActivate: [authGuard]
			},
			{
				path: 'map',
				loadComponent: () => import('./pages/map/map.page').then( m => m.MapPage),
				canActivate: [authGuard]
			},
			{
				path: 'profile',
				loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage),
				canActivate: [authGuard]
			},
			{
				path: 'publish',
				loadComponent: () => import('./pages/publish/publish.page').then( m => m.PublishPage),
				canActivate: [authGuard]
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: '/cityfix-kin/home'
			}
		]
	},

	// map geoLocation paths =====================================
	{
	  path: 'geo-details/:id',
	  loadComponent: () => import('./pages/geo-details/geo-details.page').then( m => m.GeoDetailsPage),
	  canActivate: [authGuard]
	},

	// profile paths ==============================================
	{
		path: 'cityfix-kin/profile/settings',
		loadComponent: ()=> import('./shared/components/settings/settings.page').then(m=> m.SettingsPage),
		canActivate: [authGuard]
	},
	{
		path: 'cityfix-kin/profile/map/:id',
		loadComponent: () => import('./shared/components/profile-post-map/profile-post-map.page').then( m => m.ProfilePostMapPage),
		canActivate: [authGuard]
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
