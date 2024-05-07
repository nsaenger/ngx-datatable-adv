import {ApplicationConfig, LOCALE_ID} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {registerLocaleData} from "@angular/common";
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe, 'de');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: LOCALE_ID,
      useValue: 'de-DE'
    }
  ]
};
