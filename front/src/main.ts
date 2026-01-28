import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';

import { App } from './app/app';
import { routes } from './app/app.routes';

import { tokenInterceptor } from './app/interceptors/token.interceptor';
import { AuthState } from './app/store/auth/auth.state';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),

    importProvidersFrom(
      NgxsModule.forRoot([AuthState]),

      NgxsStoragePluginModule.forRoot({
        keys: ['auth'],         
        storage: StorageOption.SessionStorage 
      })
    )
  ]
});
