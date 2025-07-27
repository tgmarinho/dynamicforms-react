export type FieldType = 'TEXT' | 'EMAIL' | 'NUMBER' | 'SELECT' | 'CHECKBOX' | 'RADIO' | 'DATE' | 'TEXTAREA' | 'FILE';

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  order: number;
  placeholder?: string;
  description?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface Form {
  id: string;
  name: string;
  description?: string;
  fields: FormField[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FieldValue {
  fieldId: string;
  value: string | string[];
}

export interface FormSubmission {
  id: string;
  formId: string;
  fieldValues: FieldValue[];
  submittedAt: Date;
  submitterName?: string;
  submitterEmail?: string;
}

export interface FormBuilderState {
  form: Form;
  activeFieldId?: string;
  draggedFieldId?: string;
}