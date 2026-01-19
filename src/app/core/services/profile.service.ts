import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IBio, IProfile } from "../interfaces/interfaces.interface";

@Injectable({
    providedIn: 'root'
})

export class ProfileService {

    private profileData:IProfile = <IProfile>{}
    private bioData:IBio = <IBio>{}

    constructor(
        private http: HttpClient
    ){ }

    private readonly apiPrefix = environment.profileApi

    getProfile(){
        return this.http.get<IProfile>(`${this.apiPrefix}/moi`).pipe(
            tap(data => this.profileData = data)
        )
    }

    getBio(){
        return this.http.get<IBio>(`${this.apiPrefix}/moi/bio`).pipe(
            tap(data => this.bioData = data)
        )
    }

    updateBio(id: number, bio: Partial<IBio>): Observable<IBio>{
        return this.http.patch<IBio>(`${this.apiPrefix}/moi/bio/update/${id}`, bio)
    }

    uploadAvatar(file: File): Observable<IProfile>{
        const formData = new FormData();
        formData.append('image', file);
        return this.http.patch<IProfile>(`${this.apiPrefix}/moi/avatar/upload`, formData)
    }
    deleteAvatar() {
        return this.http.delete<IProfile>(`${this.apiPrefix}/moi/avatar/delete`)
    }
}