import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ThemeService{

    private dark$ = new BehaviorSubject<boolean>(false)
    readonly isDark$ = this.dark$.asObservable()

    // isDark = false

    constructor( ){

        const saved = localStorage.getItem('theme')
        const isDark = saved === 'dark'

        this.dark$.next(isDark);
        document.body.classList.toggle('dark', isDark)

        // const saveTheme = localStorage.getItem('theme')
        // if (saveTheme === 'dark') {
        //     this.setDark(true)
        // }
    }

    toggle(){
        this.setDark(!this.dark$.value)
    }

    setDark(dark: boolean){
        this.dark$.next(dark)
        document.body.classList.toggle('dark', dark)
        localStorage.setItem('theme', dark ? 'dark' : 'light')
    }

    get current(): boolean{
        return this.dark$.value
    }

    // toggle(){
    //     this.isDark = !this.isDark
    //     document.body.classList.toggle('dark', this.isDark)
    // }

    // setDark(dark: boolean){
    //     this.isDark = dark
    //     document.body.classList.toggle('dark', dark);
    //     localStorage.setItem('theme', dark ? 'dark' : 'light')
    // }
}