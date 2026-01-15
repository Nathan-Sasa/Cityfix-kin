import { HttpInterceptorFn } from "@angular/common/http"
import { inject } from "@angular/core"
import { AuthService } from "../services/auth.service"

export const jwtInterceptor: HttpInterceptorFn = (req, next) =>{

    const auth = inject(AuthService)
    const token = auth.getToken()

    const ignoreUrl = [
        '/api/v1/login',
        '/api/v1/register'
    ]

    if(!token || ignoreUrl.some(url => req.url.includes(url))){
        return next(req)
    }

    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })

    function afficheHeader(){
        return "Header Authorization ajouté : " + authReq.headers.get('Authorization')
    }

    return next(authReq)
}