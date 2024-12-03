import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { GlobalService } from './global.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private userSubject = new BehaviorSubject<any>(null);

  constructor( public globalService: GlobalService, private auth:Auth ) { }

  async registerUser(email: string, password:string){
    return await createUserWithEmailAndPassword(this.auth, email, password)
  }

  async loginUser(email: string, password: string){
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password)
    const user = userCredential.user

    this.userSubject.next(user)

   return await signInWithEmailAndPassword(this.auth, email, password)
  }

  async resetPassword(email: string){
    return await sendPasswordResetEmail(this.auth, email)
  }

  getCurrentUser() {
    const user = this.auth.currentUser;
    return user;
  }

  async signOut(){
    await signOut(this.auth);
    this.userSubject.next(null);
  }

  get currentUser$() {
    return this.userSubject.asObservable();
  }
  
}
