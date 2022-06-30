import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.activeRoute = event.url;
      }
    });
  }

  public activeRoute: string;

  ngOnInit(): void {}

  public getToAboutPage(): void {
    this.router.navigateByUrl('/about');
  }

  public showAboutButton(): boolean {
    return this.activeRoute !== '/about';
  }
}
