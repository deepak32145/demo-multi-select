export interface Option {
  value: string;
  label: string;
  subOptions: SubOption[];
}

export interface SubOption {
  value: string;
  label: string;
}

export interface UserFormData {
  userId: number;
  selectedOption: string;
  selectedSubOptions: { [key: string]: boolean };
}

export interface FormSubmissionData {
  users: UserFormData[];
}