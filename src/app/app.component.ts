import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 // showingProgressIndicator = true;
  title = 'AngularCurd';
  // constructor(private _routes: Router) {
  //   this._routes.events.subscribe((event: Event) => {
  //     if (event instanceof NavigationStart) {
  //       this.showingProgressIndicator = true;
  //     }
  //     if (event instanceof NavigationEnd) {
  //       this.showingProgressIndicator = false;
  //     }
  //   });
    
  // }
}
