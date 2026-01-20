import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    private readonly apiPrefix = environment

    constructor(
        private http: HttpClient
    ) { }

    // getAllPosts(): Observable<IPost[]> {
    //     return this.http.get<IPost[]>(`${this.apiPrefix}/posts`)
    // }

    // getPostById(id: number): Observable<IPost> {
    //     return this.http.get<IPost>(`${this.apiPrefix}/posts/${id}`)
    // }
}