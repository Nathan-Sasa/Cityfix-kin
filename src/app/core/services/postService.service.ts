import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPage, IPost, IUser } from '../interfaces/interfaces.interface';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    private readonly feedApi = environment.homeFeedApi

    constructor(
        private http: HttpClient
    ) { }

    // getAllPosts(page: number = 0, size: number = 10): Observable<IPage<IPost>> {
    //     return this.http.get<IPage<IPost>>(
    //         `${this.feedApi}/feed?page=${page}&size=${size}`
    //     )
    // }
    getFeed(page = 0, size =10){
        return this.http.get<IPage<IPost>>(`${this.feedApi}/feed?page=${page}&size=${size}`)
    }
    // getFeed(page = 0, size =10){
    //     return this.http.get<IPage<IPost<IUser>>>(`${this.feedApi}/feed?page=${page}&size=${size}`)
    // }

    // getPostById(id: number): Observable<IPost> {
    //     return this.http.get<IPost>(`${this.apiPrefix}/posts/${id}`)
    // }
}