import { CanActivateFn, Router } from "@angular/router";
import { inject } from '@angular/core'
import { AuthService } from "../services/auth.service";
import { NavController } from "@ionic/angular";

export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router)
    const navCtrl = inject(NavController)

    if (!auth.hasValidToken() || !auth.isLoggedIn()) {
        console.log("tokenValid : ",auth.hasValidToken(), 'loggedIn: ', auth.isLoggedIn())
        router.navigateByUrl('/landing')
        return false

    }

    return true
    // return auth.hasValidToken() || auth.isLoggedIn()
    //     ? true
    //     : true
}