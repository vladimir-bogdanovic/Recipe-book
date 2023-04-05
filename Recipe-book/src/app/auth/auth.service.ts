import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";


export interface AuthResponseData {
    kind: string;
    idToken	: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExparationTimer: any;

    constructor(private http: HttpClient, private router: Router){}

    signup(email:string, password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABdScoIX4RHDEzy0XkQ0lTd59hhy0AVDY',
            {
            email: email,
            password: password,
            returnSecureToken: true
            } 
        ).pipe(catchError(this.handelError),
        tap(resData =>{
            this.handleAuthentivation(resData.email ,resData.localId, resData.idToken, +resData.expiresIn)
        })
        );
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABdScoIX4RHDEzy0XkQ0lTd59hhy0AVDY',
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handelError),
        tap(resData =>{
            this.handleAuthentivation(resData.email ,resData.localId, resData.idToken, +resData.expiresIn)
        })
        );
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExparationTimer){
            clearTimeout(this.tokenExparationTimer)
        }
        this.tokenExparationTimer = null
    }

    autoLogin(){
       const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationTime: string
       } = JSON.parse(localStorage.getItem('userData'));
       if(!userData){
         return;
       }
       
       const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationTime)
       );

       if(loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationTime).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration)
       }
    }

    autoLogout(expirationDuration : number){
        console.log(expirationDuration);
        this.tokenExparationTimer= setTimeout(() => {
            this.logout()
        }, expirationDuration)
    }

    private handleAuthentivation(email: string, userId: string, token: string, expiresIn: number){
            const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
            const userrr = new User(
                email,
                userId,
                token,
                expirationDate);
                this.user.next(userrr);
            this.autoLogout(expiresIn * 1000)    
            localStorage.setItem('userData', JSON.stringify(userrr));
        
    }

    private handelError(errorRes : HttpErrorResponse){
        let errorMessage = 'An unknown error occured!';
        if( !errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch(errorRes.error.error.message ){
            case 'EMAIL_EXISTS':
                errorMessage = 'this mail exist already'
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'this email does not exist'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'incorrect password'
                break;
        }
        return throwError(errorMessage)
    }

}