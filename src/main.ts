import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

if(!navigator.geolocation) {
  throw new Error('Navigator do not support the geolocation');
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
