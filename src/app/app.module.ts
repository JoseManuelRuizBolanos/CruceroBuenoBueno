import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { Capacitor } from '@capacitor/core';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, indexedDBLocalPersistence, initializeAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
    imports: [BrowserModule, FormsModule, AppRoutingModule, IonicModule.forRoot({}), 
    ],
    providers: [
      provideHttpClient(),
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => {
        if (Capacitor.isNativePlatform()) {
          return initializeAuth(getApp(), {
            persistence: indexedDBLocalPersistence
          });
        } else {
          return getAuth();
        }
      }),
      //getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
  })
  export class AppModule {}