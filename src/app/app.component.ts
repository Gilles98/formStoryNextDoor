import { Component } from '@angular/core';
import {FirebaseApp} from '@angular/fire/app';
import {AngularFireAnalytics} from '@angular/fire/compat/analytics';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(firebaseApp: FirebaseApp, public analytics: AngularFireAnalytics) {
    analytics.logEvent('user has used our app');
  }
}
