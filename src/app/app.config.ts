import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'simple-crm-f55f1',
          appId: '1:150536119640:web:7f8dd45b61731f50f9f12d',
          storageBucket: 'simple-crm-f55f1.appspot.com',
          apiKey: 'AIzaSyC9aRL7xH4KgNisqh--z4JjCXE3Hj8rem4',
          authDomain: 'simple-crm-f55f1.firebaseapp.com',
          messagingSenderId: '150536119640',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
