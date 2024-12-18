import { Option } from '../models/form.models';

export const formOptions: Option[] = [
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