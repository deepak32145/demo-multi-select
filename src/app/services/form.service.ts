import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Option, UserFormData, FormSubmissionData } from '../models/form.models';
import { formOptions } from '../data/form-options.data';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private fb: FormBuilder) {}

  createUserForm(): FormGroup {
    const formControls: any = {
      selectedOption: ['']
    };

    // Add checkbox controls for all sub-options
    formOptions.forEach(option => {
      option.subOptions.forEach(subOption => {
        formControls[subOption.value] = [false];
      });
    });

    return this.fb.group(formControls);
  }

  extractUserFormData(userId: number, form: FormGroup): UserFormData {
    const selectedSubOptions: { [key: string]: boolean } = {};
    
    formOptions.forEach(option => {
      option.subOptions.forEach(subOption => {
        selectedSubOptions[subOption.value] = form.get(subOption.value)?.value || false;
      });
    });

    return {
      userId,
      selectedOption: form.get('selectedOption')?.value || '',
      selectedSubOptions
    };
  }
}