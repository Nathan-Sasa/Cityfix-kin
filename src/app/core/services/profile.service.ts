import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IBio, IProfile } from "../interfaces/interfaces.interface";

@Injectable({
    providedIn: 'root'
})

export class ProfileService {


    constructor(
        private http: HttpClient
    ){ }

    private readonly apiPrefix = environment.profileApi



    // getProfile(): Observable<IProfile[]>{
    //     return this.http.get<IProfile[]>(`${this.apiPrefix}/moi`)
    // }
    getProfile(){
        return this.http.get<IProfile>(`${this.apiPrefix}/moi`).pipe(
            tap(data => console.log("Profile ok : "))
        )
    }

    getBio(){
        return this.http.get<IBio>(`${this.apiPrefix}/moi/bio`).pipe(
            tap(data => console.log("Bio ok", data))
        )
    }

    updateBio(id: number, bio: Partial<IBio>): Observable<IBio>{
        return this.http.patch<IBio>(`${this.apiPrefix}/moi/bio/update/${id}`, bio)
    }

}