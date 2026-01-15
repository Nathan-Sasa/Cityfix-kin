import { CanActivateFn, Router } from "@angular/router";
import { inject } from '@angular/core'
import { AuthService } from "../services/auth.service";
import { NavController } from "@ionic/angular";

export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router)
    const navCtrl = inject(NavController)

    if (!auth.hasValidToken() || !auth.isLoggedIn()) {
        // router.navigate(['/login'])
        console.log("tokenValid : ",auth.hasValidToken(), 'loggedIn: ', auth.isLoggedIn())
        // router.parseUrl('/landing')
        router.navigateByUrl('/landing')
        return false

    }

    return true
    // return auth.hasValidToken() || auth.isLoggedIn()
    //     ? true
    //     : true
}