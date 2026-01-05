import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, throwError } from "rxjs";
import { catchError, map, tap} from "rxjs/operators";
import { IProfilePost } from "../interfaces/geoLocation.interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ProfilePostService {

    private readonly PROFILE_POST_API_URL = environment.profilePostApi

    constructor(
        private http: HttpClient
    ){}

    getSelfPost(){
        return this.http.get<IProfilePost[]>(this.PROFILE_POST_API_URL).pipe(
            tap(data => console.log('Profile post ok')),
            catchError(this.handleError)
        )
    }

    getProfilePostId(id: Number): Observable<IProfilePost>{
        return this.http.get<IProfilePost>(`${this.PROFILE_POST_API_URL}/${id}`)
    }

    private handleError(error: HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
            // La connexion internet du client rencontre un probleme
            console.error('An error occurred:', error.error.message);
        }else{
            // le backend retourne un status non succes
            // the response body may contain clues as to what went wrong
            console.error(
                `Backend returned code ${error.status}` +
                `Body was : ${error.error}`
            );
        }
        // Return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.'
        )
    }
}