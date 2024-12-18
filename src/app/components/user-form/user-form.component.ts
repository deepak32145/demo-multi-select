import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Option, UserFormData } from '../../models/form.models';
import { formOptions } from '../../data/form-options.data';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="user-form">
      <h3>User {{ userId }}</h3>
      <form [formGroup]="form">
        <div class="radio-group">
          <div *ngFor="let option of options" class="option-container">
            <div class="radio-option">
              <input type="radio" 
                     [id]="'user' + userId + '_' + option.value"
                     [value]="option.value"
                     formControlName="selectedOption">
              <label [for]="'user' + userId + '_' + option.value">{{ option.label }}</label>
            </div>
            
            <div class="sub-options" *ngIf="form.get('selectedOption')?.value === option.value">
              <div *ngFor="let subOption of option.subOptions" class="checkbox-option">
                <input type="checkbox"
                       [id]="'user' + userId + '_' + subOption.value"
                       [formControlName]="subOption.value">
                <label [for]="'user' + userId + '_' + subOption.value">{{ subOption.label }}</label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .user-form {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 1.5rem;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: #2c3e50;
    }

    .radio-group {
      margin: 1rem 0;
    }

    .option-container {
      margin-bottom: 1rem;
    }

    .radio-option {
      margin-bottom: 0.5rem;
    }

    .sub-options {
      margin-left: 2rem;
      padding: 0.5rem 0;
    }

    .checkbox-option {
      margin: 0.5rem 0;
    }

    input[type="radio"],
    input[type="checkbox"] {
      margin-right: 0.5rem;
    }
  `]
})
export class UserFormComponent {
  @Input() userId!: number;
  @Output() formChange = new EventEmitter<UserFormData>();

  form: FormGroup;
  options = formOptions;

  constructor(private formService: FormService) {
    this.form = this.formService.createUserForm();
    
    this.form.valueChanges.subscribe(() => {
      this.emitFormData();
    });

    // Reset checkboxes when radio selection changes
    this.form.get('selectedOption')?.valueChanges.subscribe(() => {
      this.options.forEach(option => {
        option.subOptions.forEach(subOption => {
          this.form.get(subOption.value)?.setValue(false, { emitEvent: false });
        });
      });
      this.emitFormData();
    });
  }

  private emitFormData() {
    const formData = this.formService.extractUserFormData(this.userId, this.form);
    this.formChange.emit(formData);
  }
}