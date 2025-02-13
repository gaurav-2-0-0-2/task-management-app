import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormlyModule } from "@ngx-formly/core";
import { FormlyNgZorroAntdModule } from "@ngx-formly/ng-zorro-antd"; 

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    provideNzI18n(en_US),
    importProvidersFrom(ReactiveFormsModule),
    importProvidersFrom(FormlyModule),
    importProvidersFrom(FormlyNgZorroAntdModule),
    provideAnimationsAsync(),
  ]
};
