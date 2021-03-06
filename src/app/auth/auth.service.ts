import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{

    constructor(private http: HttpClient){}
    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxqU6EpPB52LirX_3NaHBUS72_3_l3L9o',
            {
                email: email,
                password: password,
                returnSecurityToken: true
            }
        ).pipe(
            catchError(errorRes=>{
                let errorMessage = 'An error occurred!';
                if (!errorRes.error || !errorRes.error.error){
                    return throwError(errorMessage);
                }
                switch(errorRes.error.error.message){
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email exist already!';
                }
                return throwError(errorMessage);
            })
        );
    }

    login(email: string, password: string){
        return this.http
        .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxqU6EpPB52LirX_3NaHBUS72_3_l3L9o',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(errorRes=>{
                let errorMessage = 'An error occurred!';
                if (!errorRes.error || !errorRes.error.error){
                    return throwError(errorMessage);
                }
                switch(errorRes.error.error.message){
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email exist already!';
                }
                return throwError(errorMessage);
            })
        )
    }
}