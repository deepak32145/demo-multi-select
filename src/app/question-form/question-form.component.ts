import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <form [formGroup]="questionForm" (ngSubmit)="onSubmit()">
        <h2>Question Form</h2>
        
        <div class="radio-group">
          <p>Select your preferred option:</p>
          
          <div *ngFor="let option of options; let i = index" class="option-container">
            <div class="radio-option">
              <input type="radio" 
                     [id]="'option' + i"
                     [value]="option.value"
                     formControlName="selectedOption">
              <label [for]="'option' + i">{{ option.label }}</label>
            </div>
            
            <div class="sub-options" *ngIf="questionForm.get('selectedOption')?.value === option.value">
              <div *ngFor="let subOption of option.subOptions" class="checkbox-option">
                <input type="checkbox"
                       [id]="subOption.value"
                       [formControlName]="subOption.value">
                <label [for]="subOption.value">{{ subOption.label }}</label>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" [disabled]="!questionForm.valid">Submit</button>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .radio-group {
      margin: 1.5rem 0;
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

    button {
      background-color: #4CAF50;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `]
})
export class QuestionFormComponent implements OnInit {
  questionForm: FormGroup;

  options = [
    {
      value: 'option1',
      label: 'Option 1',
      subOptions: [
        { value: 'sub1_1', label: 'Sub-option 1.1' },
        { value: 'sub1_2', label: 'Sub-option 1.2' },
        { value: 'sub1_3', label: 'Sub-option 1.3' }
      ]
    },
    {
      value: 'option2',
      label: 'Option 2',
      subOptions: [
        { value: 'sub2_1', label: 'Sub-option 2.1' },
        { value: 'sub2_2', label: 'Sub-option 2.2' },
        { value: 'sub2_3', label: 'Sub-option 2.3' }
      ]
    },
    {
      value: 'option3',
      label: 'Option 3',
      subOptions: [
        { value: 'sub3_1', label: 'Sub-option 3.1' },
        { value: 'sub3_2', label: 'Sub-option 3.2' },
        { value: 'sub3_3', label: 'Sub-option 3.3' }
      ]
    }
  ];

  constructor(private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      selectedOption: [''],
      // Initialize all checkbox controls
      sub1_1: [false],
      sub1_2: [false],
      sub1_3: [false],
      sub2_1: [false],
      sub2_2: [false],
      sub2_3: [false],
      sub3_1: [false],
      sub3_2: [false],
      sub3_3: [false]
    });
  }

  ngOnInit() {
    // Reset checkboxes when radio selection changes
    this.questionForm.get('selectedOption')?.valueChanges.subscribe(() => {
      this.options.forEach(option => {
        option.subOptions.forEach(subOption => {
          this.questionForm.get(subOption.value)?.setValue(false);
        });
      });
    });
  }

  onSubmit() {
    if (this.questionForm.valid) {
      console.log('Form submitted:', this.questionForm.value);
    }
  }
}