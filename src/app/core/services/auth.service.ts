import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";

interface LoginResponse{
    token: string;
    type?: string;
}

interface RegisterRequest{
    username: string;
    email: string;
    password: string;
    role?: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private readonly tokenKey = 'cityfix_token'
    private readonly roleKey = 'cityfix_role'
    private apiPrefix = environment.apiUrl

    private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasValidToken())
    public isLoggedIn$ = this._isLoggedIn$.asObservable()

    private _role$ = new BehaviorSubject<string | null>(this.extractRoleFromToken())
    public role$ = this._role$.asObservable()

    constructor(
        private http: HttpClient,
        private router: Router
    ){}

    login(username: string, password: string): Observable<LoginResponse>{
        const url = `${this.apiPrefix}/login`
        return this.http.post<LoginResponse>(url, {username, password})
            .pipe(
                tap(resp => {
                    if(resp?.token){
                        this.saveToken(resp.token)
                        this._isLoggedIn$.next(true)
                        this._role$.next(this.extractRoleFromToken())
                    }
                })
            )
    }

    afficheToken(): string | null {
        return this.getToken()
    }

    isAdmin():boolean {
        return this.hasRole('ADMIN')
    }

    register(payload: RegisterRequest): Observable<any>{
        const url = `${this.apiPrefix}/register`
        return this.http.post(url, payload)
    }

    logout(): void{
        localStorage.removeItem(this.tokenKey)
        localStorage.removeItem(this.roleKey)
        this._isLoggedIn$.next(false)
        this._role$.next(null)

        this.router.navigateByUrl('/login')
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey,)
    }

    saveToken(token: string): void{
        localStorage.setItem(this.tokenKey, token)

        const role = this.extractRoleFromToken(token)

        if(role){
            localStorage.setItem(this.roleKey, role)
        }else{
            localStorage.removeItem(this.roleKey)
        }
    }

    // -----------------------------------------
    // decryptage du token
    // ----------------------------------------
    private urlBase64Decode(str: string): string {
        str = str.replace(/-/g, '+').replace(/_/g, '/')

        while(str.length % 4){
            str += '='
        }
        try {
            return atob(str)
        }catch {
            return ''
        }
    }

    private decodeJwtPayload(token?:string): any | null {
        const t = token ?? this.getToken()

        if(!t) return null

        const parts = t.split('.')
        if(parts.length !== 3) return null

        try{
            const payload = this.urlBase64Decode(parts[1])
            return JSON.parse(payload)
        } catch {
            return null
        }
    }

    // extraction du role et username
    extractRoleFromToken(token?: string): string | null {
        const payload = this.decodeJwtPayload(token)
        if(!payload) return null

        if(payload.role) return payload.role;
        if(Array.isArray(payload.roles) && payload.roles.length) return payload.roles[0]
        if(payload.authorities && Array.isArray(payload.authorities)) return payload.authorities[0]

        return null
    }

    getUsernameFromToken(token?: string): string | null {
        const payload = this.decodeJwtPayload(token)

        return (payload && payload.sub) ? payload.sub : (payload && payload.username ? payload.username : null)
    }

    getEmailFromToken(token?:string): string | null {
        const payload = this.decodeJwtPayload(token)

        return (payload && payload.aud) ? payload.aud : ( payload && payload.aud ? payload.email.aud : null )
    }

    isTokenExpired(token?: string): boolean {
        const payload = this.decodeJwtPayload(token)

        if(!payload || !payload.exp){
            this.logout()
            return true
        }
        
        const nowSec = Math.floor(Date.now() / 1000)
        return payload.exp < nowSec
    }

    hasValidToken(): boolean{
        const t = this.getToken()

        return !!t && !this.isTokenExpired(t)
    }

    isLoggedIn(): boolean{
        return this.hasValidToken()
    }

    getRole(): string | null {
        const r = this._role$.getValue()
        if(r) return r

        const stored = localStorage.getItem(this.roleKey)
        if(stored){
            this._role$.next(stored)
            return stored
        }

        const payloadRole = this.extractRoleFromToken()
        if(payloadRole){
            this._role$.next(payloadRole)
            return payloadRole
        }
        return null
    }

    hasRole(expected: string): boolean {
        const role = this.getRole()
        if(!role) return false

        const normalized = role.startsWith('ROLE_') ? role.replace('ROLE_', ''): role
        const check = expected.startsWith('ROLE_') ? expected.replace('ROLE_', '') : expected
        return normalized === check
    }


}