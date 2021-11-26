import { Component, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styles: [
    `
    :host {
    display: block;
    }

    .content-wrapper > *:first-child {
        display: block;
    }

    `
  ]
})
export class UserLayoutComponent implements OnInit {
  @HostBinding('class') class = 'wrapper';
  public sidebarMenuOpened = true;

  constructor (private renderer: Renderer2, private appService: AppService) { }

  ngOnInit() {
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'login-page'
    );
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'register-page'
    );
  }

  toggleMenuSidebar() {
    if (this.sidebarMenuOpened) {
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'sidebar-open'
      );
      this.renderer.addClass(
        document.querySelector('app-root'),
        'sidebar-collapse'
      );
      this.sidebarMenuOpened = false;
    } else {
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'sidebar-collapse'
      );
      this.renderer.addClass(
        document.querySelector('app-root'),
        'sidebar-open'
      );
      this.sidebarMenuOpened = true;
    }
  }

}
