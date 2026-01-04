import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, throwError } from "rxjs";
import { catchError, map, tap} from "rxjs/operators";
import { IGeoLocation } from "../interfaces/geoLocation.interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class GeoLocationService {

    private readonly GEOLOCATION_API_URL = environment.geoLocationApi

    constructor(
        private http: HttpClient
    ){}

    // getPoints(){
    //     return this.http.get<IGeoLocation[]>(this.GEOLOCATION_API_URL)
    // }
    getPoints(){
        return this.http.get<IGeoLocation[]>(this.GEOLOCATION_API_URL).pipe(
            tap(data => console.log('Les points géolocalisés reçus', data)),
            catchError(this.handleError)
        )
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