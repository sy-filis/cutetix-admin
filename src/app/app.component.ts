import { Component, isDevMode } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    private titleService: Title
  ) { }
  ngOnInit(): void {
    if (isDevMode()) {
      this.titleService.setTitle(`DEV ${this.titleService.getTitle()}`)
    }
  }
}
