import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserFormData, FormSubmissionData } from '../../models/form.models';

@Component({
  selector: 'app-multi-user-form',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  template: `
    <div class="container">
      <h1>Multi-user Form</h1>
      
      <div class="users-container">
        <app-user-form
          *ngFor="let userId of userIds"
          [userId]="userId"
          (formChange)="onUserFormChange($event)">
        </app-user-form>
      </div>

      <div class="submit-container">
        <button (click)="onSubmit()" [disabled]="!isAnyFormFilled()">
          Submit All Forms
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    h1 {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 2rem;
    }

    .users-container {
      margin-bottom: 2rem;
    }

    .submit-container {
      text-align: center;
    }

    button {
      background-color: #4CAF50;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1.1rem;
    }

    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `]
})
export class MultiUserFormComponent {
  userIds = [1, 2, 3, 4, 5];
  userForms: { [key: number]: UserFormData } = {};

  onUserFormChange(formData: UserFormData) {
    this.userForms[formData.userId] = formData;
  }

  isAnyFormFilled(): boolean {
    return Object.values(this.userForms).some(form => 
      form.selectedOption !== '' || 
      Object.values(form.selectedSubOptions).some(value => value)
    );
  }

  onSubmit() {
    const submissionData: FormSubmissionData = {
      users: Object.values(this.userForms)
    };
    
    console.log('All forms submitted:', submissionData);
    // Here you would typically send the data to a backend service
  }
}