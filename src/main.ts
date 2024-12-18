import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { MultiUserFormComponent } from './app/components/multi-user-form/multi-user-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MultiUserFormComponent],
  template: `<app-multi-user-form></app-multi-user-form>`
})
export class App {}

bootstrapApplication(App);